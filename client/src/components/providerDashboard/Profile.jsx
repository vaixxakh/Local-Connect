import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyProfile, saveProfile } from "../../service/providerService";

const districts = [
  "Kasaragod",
  "Kannur",
  "Kozhikode",
  "Malappuram",
  "Wayanad",
  "Thrissur",
  "Ernakulam",
  "Palakkad",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Pathanamthitta",
  "Kollam",
  "Thiruvananthapuram",
];

const serviceOptions = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Cleaner",
  "AC Technician",
  "Mechanic",
  "Teacher",
  "Web&App development",
  "Driver",
  "IT",
  "Lawyer",
  "Accountant",
  "Nurse",
  "Designer"
  
];

const workingDayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Profile = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    skills: "",
    experience: "",
    basePrice: "",
    visitCharge: "",
    pricingType: "fixed",
    district: "",
    city: "",
    area: "",
    pincode: "",
    workingDays: [],
    workingTime: "",
    emergencyAvailable: false,
    bio: "",
    idNumber: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [workImages, setWorkImages] = useState([]);

  const [preview, setPreview] = useState({
    profileImage: "",
    selfieImage: "",
    idProof: "",
    workImages: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getMyProfile();

        if (res.data) {
          const data = res.data;

          setForm({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            service: data.service || "",
            skills: data.skills?.join(", ") || "",
            experience: data.experience || "",
            basePrice: data.basePrice || "",
            visitCharge: data.visitCharge || "",
            pricingType: data.pricingType || "fixed",
            district: data.district || "",
            city: data.city || "",
            area: data.area || "",
            pincode: data.pincode || "",
            workingDays: data.workingDays || [],
            workingTime: data.workingTime || "",
            emergencyAvailable: data.emergencyAvailable || false,
            bio: data.bio || "",
            idNumber: data.idNumber || "",
          });

          setPreview({
            profileImage: data.profileImage || "",
            selfieImage: data.selfieImage || "",
            idProof: data.idProof || "",
            workImages: data.workImages || [],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWorkingDays = (day) => {
    setForm((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleSingleImage = (e, setter, previewKey) => {
    const file = e.target.files[0];
    if (!file) return;

    setter(file);
    setPreview((prev) => ({
      ...prev,
      [previewKey]: URL.createObjectURL(file),
    }));
  };

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    setWorkImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => ({
      ...prev,
      workImages: previews,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "skills") {
          formData.append(
            "skills",
            JSON.stringify(
              form.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          );
        } else if (key === "workingDays") {
          formData.append("workingDays", JSON.stringify(form.workingDays));
        } else {
          formData.append(key, form[key]);
        }
      });

      if (profileImage) formData.append("profileImage", profileImage);
      if (selfieImage) formData.append("selfieImage", selfieImage);
      if (idProof) formData.append("idProof", idProof);

      workImages.forEach((img) => {
        formData.append("workImages", img);
      });

      await saveProfile(formData);

      toast.success("Profile saved successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto px-3 py-6">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-800">Provider Profile</h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8">
          <section>
            <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Select
                label="Service"
                name="service"
                value={form.service}
                onChange={handleChange}
                options={serviceOptions}
              />
              <Input
                label="Skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Wiring, Repair, Installation"
              />
              <Input
                label="Experience (years)"
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Pricing Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                label="Base Price"
                name="basePrice"
                type="number"
                value={form.basePrice}
                onChange={handleChange}
              />
              <Input
                label="Visit Charge"
                name="visitCharge"
                type="number"
                value={form.visitCharge}
                onChange={handleChange}
              />
              <Select
                label="Pricing Type"
                name="pricingType"
                value={form.pricingType}
                onChange={handleChange}
                options={["fixed", "hourly"]}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Location</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="District"
                name="district"
                value={form.district}
                onChange={handleChange}
                options={districts}
              />
              <Input label="City" name="city" value={form.city} onChange={handleChange} />
              <Input label="Area" name="area" value={form.area} onChange={handleChange} />
              <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Availability</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Working Days</p>
                <div className="flex flex-wrap gap-2">
                  {workingDayOptions.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleWorkingDays(day)}
                      className={`rounded-lg border px-4 py-2 text-sm ${
                        form.workingDays.includes(day)
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Working Time"
                name="workingTime"
                value={form.workingTime}
                onChange={handleChange}
                placeholder="9:00 AM - 6:00 PM"
              />

              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="emergencyAvailable"
                  checked={form.emergencyAvailable}
                  onChange={handleChange}
                />
                Emergency Service Available
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Verification</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="ID Number"
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
              />

              <FileInput
                label="Profile Image"
                onChange={(e) => handleSingleImage(e, setProfileImage, "profileImage")}
                preview={preview.profileImage}
              />

              <FileInput
                label="Selfie Image"
                onChange={(e) => handleSingleImage(e, setSelfieImage, "selfieImage")}
                preview={preview.selfieImage}
              />

              <FileInput
                label="Upload ID Proof"
                onChange={(e) => handleSingleImage(e, setIdProof, "idProof")}
                preview={preview.idProof}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Work Images</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleImages}
              className="block w-full rounded-lg border border-gray-300 p-3"
            />

            {preview.workImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {preview.workImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`work-${index}`}
                    className="h-24 w-full rounded-lg object-cover border"
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Write about your service experience..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
    >
      <option value="">Select</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

const FileInput = ({ label, onChange, preview }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="block w-full rounded-xl border border-gray-300 p-3"
    />
    {preview && (
      <img
        src={preview}
        alt={label}
        className="mt-3 h-24 w-24 rounded-lg object-cover border"
      />
    )}
  </div>
);

export default Profile;