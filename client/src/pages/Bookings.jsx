import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingForm, setBookingId } from "../features/booking/bookingSlice";
import { createBookingApi } from "../service/bookingApi";
import toast from "react-hot-toast";
import "./BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProvider, bookingForm, amount } = useSelector(
    (state) => state.booking
  );

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [userCoords, setUserCoords] = useState(null);

  const handleChange = (e) => {
    dispatch(
      setBookingForm({
        [e.target.name]: e.target.value,
      })
    );
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await res.json();

      dispatch(
        setBookingForm({
          address: data.display_name || "",
        })
      );
    } catch (error) {
      console.error("Address fetch error:", error);
      setLocationError("Unable to fetch address");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported in this browser");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setUserCoords({ lat, lng });
          await getAddressFromCoordinates(lat, lng);
          toast.success("Location fetched successfully");
        } catch (error) {
          console.error("Location process error:", error);
          setLocationError("Failed to process location");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Location permission denied or unavailable");
        setLocationLoading(false);
      }
    );
  };

  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const pricing = useMemo(() => {
    const fallbackBaseAmount = Number(amount) || 0;
    const providerBasePrice =
      Number(selectedProvider?.basePrice) > 0
        ? Number(selectedProvider.basePrice)
        : fallbackBaseAmount;

    const ratePerKm =
      Number(selectedProvider?.ratePerKm) > 0
        ? Number(selectedProvider.ratePerKm)
        : 20;

    const platformFee = 19;

    let distanceKm = 0;
    let distanceCharge = 0;
    let hasProviderCoords = false;

    const providerLat = selectedProvider?.location?.coordinates?.[1];
    const providerLng = selectedProvider?.location?.coordinates?.[0];

    if (
      userCoords &&
      providerLat !== undefined &&
      providerLat !== null &&
      providerLng !== undefined &&
      providerLng !== null
    ) {
      hasProviderCoords = true;

      distanceKm = calculateDistanceKm(
        userCoords.lat,
        userCoords.lng,
        providerLat,
        providerLng
      );

      if (distanceKm <= 2) {
        distanceCharge = 20;
      } else {
        distanceCharge = 20 + Math.ceil(distanceKm - 2) * ratePerKm;
      }
    }

    const totalAmount = providerBasePrice + distanceCharge + platformFee;

    return {
      providerBasePrice,
      ratePerKm,
      distanceKm,
      distanceCharge,
      platformFee,
      totalAmount,
      hasProviderCoords,
    };
  }, [amount, selectedProvider, userCoords]);


  const handleProceedPayment = async () => {
  if (!selectedProvider) {
    toast.error("Provider not selected");
    return;
  }

  if (
    !bookingForm.bookingDate ||
    !bookingForm.bookingTime ||
    !bookingForm.address
  ) {
    toast.error("Please complete all booking details");
    return;
  }

  if (!userCoords) {
    toast.error("Please fetch your location");
    return;
  }

  try {
   
    const bookingDateTime = new Date(
      `${bookingForm.bookingDate}T${bookingForm.bookingTime}`
    );

    const payload = {
  providerId: selectedProvider._id,
  providerName: selectedProvider.name,
  serviceName: selectedProvider.service,

  bookingDateTime,

  address: bookingForm.address,
  notes: bookingForm.notes,

  amount: pricing.totalAmount,

  pricing: {
    basePrice: pricing.providerBasePrice,
    distanceKm: pricing.distanceKm,
    distanceCharge: pricing.distanceCharge,
    platformFee: pricing.platformFee,
    totalAmount: pricing.totalAmount,
  },


  providerLocation:
  selectedProvider?.location?.coordinates
    ? {
        lat: selectedProvider.location.coordinates[1],
        lng: selectedProvider.location.coordinates[0],
      }
    : undefined,
    

// providerLocation: {
//   lat: 12.3070,
//   lng: 75.0903,
// },
  userLocation: {
    lat: userCoords.lat,
    lng: userCoords.lng,
  },
};
console.log("Provider:", selectedProvider);
console.log("Location:", selectedProvider?.location);
    const token = localStorage.getItem("token");

    const res = await createBookingApi(payload, token);

    const bookingId = res.data.booking._id;

    dispatch(setBookingId(bookingId));
    navigate(`/payment/${bookingId}`);

  } catch (error) {
    console.error("Booking creation failed:", error);
    toast.error("Booking creation failed");
  }
};


  if (!selectedProvider) {
    return (
      <div className="booking-empty-wrap">
        <div className="booking-empty-card">
          <h2>No provider selected</h2>
          <p>Please choose a provider first to continue your booking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-bg booking-bg-1"></div>
      <div className="booking-bg booking-bg-2"></div>
      <div className="booking-bg booking-bg-3"></div>

      <div className="booking-container">
        <div className="booking-topbar">
          <div>
            <span className="booking-chip">Service Booking</span>
            <h1 className="booking-title">Complete Your Booking</h1>
            <p className="booking-desc">
              Book your service in a premium, smooth and professional flow.
            </p>
          </div>
        </div>

        <div className="booking-layout">
          <div className="booking-left glass-card animate-up">
            <div className="provider-banner">
              <div className="provider-left">
                <div className="provider-image-wrap">
                  <img
                    src={
                      selectedProvider.profileImage ||
                      "https://via.placeholder.com/120"
                    }
                    alt={selectedProvider.name}
                    className="provider-image"
                  />
                  <span className="online-badge"></span>
                </div>

                <div className="provider-info">
                  <h2>{selectedProvider.name}</h2>
                  <p>{selectedProvider.serviceType}</p>

                  <div className="provider-pills">
                    <span>Verified</span>
                    <span>Trusted</span>
                    <span>Quick Response</span>
                  </div>
                </div>
              </div>

              <div className="provider-rate-box">
                <small>Base Service Rate</small>
                <strong>₹{pricing.providerBasePrice}</strong>
              </div>
            </div>

            <div className="divider"></div>

            <div className="form-block">
              <h3>Booking Information</h3>

              <div className="booking-form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingForm.bookingDate}
                    onChange={handleChange}
                    className="booking-input"
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="bookingTime"
                    value={bookingForm.bookingTime}
                    onChange={handleChange}
                    className="booking-input"
                  />
                </div>
              </div>

              <div className="location-section">
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={locationLoading}
                  className="location-btn"
                >
                  {locationLoading ? "Fetching Location..." : "Use Current Location"}
                </button>

                {locationLoading && (
                  <p className="status-text info">Getting your live location...</p>
                )}

                {locationError && (
                  <p className="status-text error">{locationError}</p>
                )}
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={bookingForm.address}
                  readOnly
                  rows="4"
                  placeholder="Click 'Use Current Location' to fetch address"
                  className="booking-input booking-textarea readonly-textarea"
                />
              </div>

              <div className="form-group">
                <label>Extra Notes</label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Mention any special instructions"
                  className="booking-input booking-textarea"
                />
              </div>
            </div>
          </div>

          <div className="booking-right glass-card animate-up-delay">
            <div className="summary-head">
              <h3>Booking Summary</h3>
              <p>Live pricing based on provider and distance</p>
            </div>

            <div className="summary-card-list">
              <div className="summary-item">
                <span>Service</span>
                <strong>{selectedProvider.serviceType}</strong>
              </div>

              <div className="summary-item">
                <span>Provider</span>
                <strong>{selectedProvider.name}</strong>
              </div>

              <div className="summary-item">
                <span>Base Rate</span>
                <strong>₹{pricing.providerBasePrice}</strong>
              </div>

              <div className="summary-item">
                <span>Rate Per Km</span>
                <strong>₹{pricing.ratePerKm}</strong>
              </div>

              <div className="summary-item">
                <span>Distance</span>
                <strong>
                  {pricing.hasProviderCoords && userCoords
                    ? `${pricing.distanceKm.toFixed(2)} km`
                    : "Unavailable"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Distance Charge</span>
                <strong>₹{pricing.distanceCharge}</strong>
              </div>

              <div className="summary-item">
                <span>Platform Fee</span>
                <strong>₹{pricing.platformFee}</strong>
              </div>
            </div>

            {!pricing.hasProviderCoords && (
              <div className="summary-warning">
                Provider coordinates are missing. Add
                <code> selectedProvider.location.lat </code>
                and
                <code> selectedProvider.location.lng </code>
                for exact distance-based pricing.
              </div>
            )}

            <div className="total-box">
              <span>Total Payable</span>
              <h2>₹{pricing.totalAmount}</h2>
            </div>

            <button onClick={handleProceedPayment} className="pay-btn">
              Proceed to Payment
            </button>

            <div className="trust-box">
              <span>Secure booking • Live pricing • Better UX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;