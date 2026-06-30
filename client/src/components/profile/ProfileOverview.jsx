import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { getUserProfileApi, uploadAvatarApi } from "../../service/userApi";
import toast from "react-hot-toast";
import {
  FaCamera, FaEnvelope, FaPhone, FaCalendar, FaShieldAlt, FaTrash
} from "react-icons/fa";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

/* Skeleton for overview */
const OverviewSkeleton = () => (
  <div className="overview-hero">
    <div className="skeleton skeleton-circle" style={{ width: 110, height: 110, flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div className="skeleton skeleton-title" style={{ width: "60%", marginBottom: 10 }} />
      <div className="skeleton skeleton-text" style={{ width: "40%", marginBottom: 16 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8 }} />
        ))}
      </div>
    </div>
  </div>
);

const ProfileOverview = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchProfile = useCallback(async () => {
    if (!authUser?._id) return;
    try {
      const res = await getUserProfileApi(authUser._id);
      setProfile(res.data.user);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [authUser?._id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Please use JPG, PNG, or WebP.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await uploadAvatarApi(authUser._id, formData);
      const updatedUser = res.data.user;
      setProfile(updatedUser);

      // Update Redux store so navbar reflects change
      dispatch(loginSuccess({ user: updatedUser, token: localStorage.getItem("token") }));
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to upload picture. Please try again.");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    // Clear preview — actual removal would need a separate endpoint
    setImagePreview(null);
    toast.success("Preview cleared");
  };

  const displayImage = imagePreview || profile?.profileImage;
  const initials = profile?.fullName
    ? profile.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="profile-card">
        <OverviewSkeleton />
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="overview-hero">
        {/* Avatar */}
        <div className="overview-avatar-wrap">
          {displayImage ? (
            <img src={displayImage} alt={profile?.fullName} className="overview-avatar" />
          ) : (
            <div className="overview-avatar-placeholder">{initials}</div>
          )}

          <label
            className="avatar-upload-label"
            htmlFor="avatar-input"
            title="Upload new photo"
          >
            {uploading ? "⏳" : <FaCamera size={12} />}
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>

        {/* Info */}
        <div className="overview-info">
          <h1 className="overview-name">{profile?.fullName || "—"}</h1>
          <p className="overview-email">{profile?.email}</p>

          <div className="overview-meta-grid">
            <div className="overview-meta-item">
              <FaPhone className="meta-icon" />
              <div className="meta-content">
                <div className="meta-label">Phone</div>
                <div className="meta-value">{profile?.phoneNumber || "Not set"}</div>
              </div>
            </div>

            <div className="overview-meta-item">
              <FaEnvelope className="meta-icon" />
              <div className="meta-content">
                <div className="meta-label">Email</div>
                <div className="meta-value" style={{ fontSize: 12 }}>{profile?.email}</div>
              </div>
            </div>

            <div className="overview-meta-item">
              <FaCalendar className="meta-icon" />
              <div className="meta-content">
                <div className="meta-label">Member Since</div>
                <div className="meta-value">{formatDate(profile?.createdAt)}</div>
              </div>
            </div>

            <div className="overview-meta-item">
              <FaShieldAlt className="meta-icon" />
              <div className="meta-content">
                <div className="meta-label">Account Status</div>
                <span className={`status-badge ${profile?.role}`}>
                  ● {profile?.role === "provider" ? "Provider" : "Finder"}
                </span>
              </div>
            </div>
          </div>

          {imagePreview && (
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <button
                className="btn btn-outline btn-icon"
                onClick={handleRemoveAvatar}
                title="Remove preview"
              >
                <FaTrash size={12} />
              </button>
              <span style={{ fontSize: 12, color: "var(--text-muted)", alignSelf: "center" }}>
                Preview — upload complete
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;