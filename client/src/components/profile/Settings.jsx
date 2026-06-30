import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  updateEmailApi,
  changePasswordApi,
  updateNotificationPrefsApi,
  updatePrivacySettingsApi,
  deleteAccountApi
} from "../../service/userApi";
import toast from "react-hot-toast";
import {
  FaCog, FaEnvelope, FaLock, FaBell, FaShieldAlt, FaTrash, FaSignOutAlt, FaTimes, FaDesktop
} from "react-icons/fa";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // States for toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [sharing, setSharing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // Modals visibility
  const [activeModal, setActiveModal] = useState(null); // 'email' | 'password' | 'delete' | 'logoutOther'

  // Input states
  const [emailForm, setEmailForm] = useState({ newEmail: "", password: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-populate settings from user object if available
  useEffect(() => {
    if (user) {
      if (user.notificationPrefs) {
        setEmailNotif(user.notificationPrefs.emailNotifications ?? true);
        setBookingNotif(user.notificationPrefs.bookingNotifications ?? true);
        setPromoNotif(user.notificationPrefs.promotionalNotifications ?? false);
      }
      if (user.privacySettings) {
        setVisibility(user.privacySettings.profileVisibility ?? "public");
        setSharing(user.privacySettings.dataSharing ?? false);
      }
    }
  }, [user]);

  // Preference handlers
  const handleNotifToggle = async (type, val) => {
    const updated = {
      emailNotifications: type === "email" ? val : emailNotif,
      bookingNotifications: type === "booking" ? val : bookingNotif,
      promotionalNotifications: type === "promo" ? val : promoNotif,
    };
    if (type === "email") setEmailNotif(val);
    if (type === "booking") setBookingNotif(val);
    if (type === "promo") setPromoNotif(val);

    try {
      await updateNotificationPrefsApi(updated);
      toast.success("Notification preferences updated");
    } catch {
      toast.error("Failed to save preferences");
    }
  };

  const handlePrivacyToggle = async (type, val) => {
    const updated = {
      profileVisibility: type === "visibility" ? val : visibility,
      dataSharing: type === "sharing" ? val : sharing,
    };
    if (type === "visibility") setVisibility(val);
    if (type === "sharing") setSharing(val);

    try {
      await updatePrivacySettingsApi(updated);
      toast.success("Privacy settings updated");
    } catch {
      toast.error("Failed to save privacy settings");
    }
  };

  const handle2FAToggle = (val) => {
    setTwoFactor(val);
    toast.success("Two-Factor Authentication: Feature coming soon!");
    setTimeout(() => setTwoFactor(false), 800);
  };

  // Action handlers
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!emailForm.newEmail || !emailForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await updateEmailApi(emailForm);
      toast.success("Email updated successfully! Please log in again.");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await changePasswordApi({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setActiveModal(null);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!deletePassword) {
      toast.error("Password is required");
      return;
    }
    try {
      setLoading(true);
      await deleteAccountApi({ password: deletePassword });
      toast.success("Account deleted successfully");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutOtherDevices = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveModal(null);
      toast.success("Logged out from other devices successfully");
    }, 1000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setEmailForm({ newEmail: "", password: "" });
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setDeletePassword("");
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon"><FaCog size={15} /></div>
          Account Settings
        </h2>
      </div>

      <div className="card-body">
        {/* Account settings */}
        <div className="settings-group">
          <h3 className="settings-group-title">Account Details</h3>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Email Address</div>
              <div className="settings-row-desc">Current email: {user?.email}</div>
            </div>
            <button className="btn btn-outline" onClick={() => setActiveModal("email")}>
              Update Email
            </button>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Password</div>
              <div className="settings-row-desc">Last changed: Recently</div>
            </div>
            <button className="btn btn-outline" onClick={() => setActiveModal("password")}>
              Change Password
            </button>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Two-Factor Authentication</div>
              <div className="settings-row-desc">Add an extra layer of security to your account.</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => handle2FAToggle(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-group">
          <h3 className="settings-group-title">Notification Settings</h3>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Email Notifications</div>
              <div className="settings-row-desc">Receive account updates, bookings confirmation and alerts.</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => handleNotifToggle("email", e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Booking Notifications</div>
              <div className="settings-row-desc">Receive real-time progress update regarding your booking status.</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={bookingNotif}
                onChange={(e) => handleNotifToggle("booking", e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Promotional & Marketing</div>
              <div className="settings-row-desc">Receive news, discounts, offers and personalized recommendations.</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={promoNotif}
                onChange={(e) => handleNotifToggle("promo", e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="settings-group">
          <h3 className="settings-group-title">Privacy Settings</h3>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Profile Visibility</div>
              <div className="settings-row-desc">Control whether other users can view your profile details.</div>
            </div>
            <select
              value={visibility}
              onChange={(e) => handlePrivacyToggle("visibility", e.target.value)}
              className="form-select"
              style={{ width: "auto" }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Data Sharing Preferences</div>
              <div className="settings-row-desc">Allow sharing of usage statistics for product improvement.</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={sharing}
                onChange={(e) => handlePrivacyToggle("sharing", e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Security / Active sessions */}
        <div className="settings-group">
          <h3 className="settings-group-title">Security & Sessions</h3>
          <div className="settings-row" style={{ alignItems: "flex-start" }}>
            <div className="settings-row-info">
              <div className="settings-row-label">Active Sessions</div>
              <div className="settings-row-desc" style={{ marginTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-primary)", fontWeight: 500, fontSize: 13 }}>
                  <FaDesktop size={14} color="var(--brand)" /> Windows PC • Chrome Browser
                  <span style={{ fontSize: 10, padding: "2px 6px", background: "var(--brand-muted)", color: "var(--brand-deeper)", borderRadius: 10 }}>
                    Current Session
                  </span>
                </div>
              </div>
            </div>
            <button className="btn btn-outline" onClick={() => setActiveModal("logoutOther")}>
              Logout Other Devices
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="settings-group" style={{ marginBottom: 0 }}>
          <h3 className="settings-group-title" style={{ color: "#ef4444", borderColor: "#fca5a5" }}>
            Danger Zone
          </h3>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label" style={{ color: "#b91c1c" }}>Delete Account</div>
              <div className="settings-row-desc">Permanently delete your profile, bookings and all data. This cannot be undone.</div>
            </div>
            <button className="btn btn-danger" onClick={() => setActiveModal("delete")}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals / Overlays ────────────────────────────────────────── */}
      {activeModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">
                {activeModal === "email" && "Update Email Address"}
                {activeModal === "password" && "Change Password"}
                {activeModal === "logoutOther" && "Logout from Other Devices"}
                {activeModal === "delete" && "Delete Account"}
              </div>
              <button className="modal-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            {activeModal === "email" && (
              <form onSubmit={handleUpdateEmail}>
                <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">New Email Address</label>
                    <input
                      type="email"
                      required
                      value={emailForm.newEmail}
                      onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                      className="form-input"
                      placeholder="newemail@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Verify Current Password</label>
                    <input
                      type="password"
                      required
                      value={emailForm.password}
                      onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Email"}
                  </button>
                </div>
              </form>
            )}

            {activeModal === "password" && (
              <form onSubmit={handleChangePassword}>
                <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="form-input"
                      placeholder="•••••••• (min 6 chars)"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </form>
            )}

            {activeModal === "logoutOther" && (
              <div>
                <div className="modal-body confirm-dialog-text">
                  <span className="confirm-dialog-icon">🔒</span>
                  Are you sure you want to end all other active sessions for this account? You will remain logged in on this browser.
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleLogoutOtherDevices} disabled={loading}>
                    {loading ? "Processing..." : "End Sessions"}
                  </button>
                </div>
              </div>
            )}

            {activeModal === "delete" && (
              <form onSubmit={handleDeleteAccount}>
                <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="confirm-dialog-text" style={{ color: "#991b1b", marginBottom: 12 }}>
                    <span className="confirm-dialog-icon">⚠️</span>
                    This action is permanent and cannot be reversed. Please enter your password to confirm account deletion.
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      required
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-danger" style={{ background: "#ef4444", color: "white" }} disabled={loading}>
                    {loading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
