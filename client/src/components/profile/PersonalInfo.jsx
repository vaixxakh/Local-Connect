import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { getUserProfileApi, updateUserProfileApi } from "../../service/userApi";
import toast from "react-hot-toast";
import {
  FaEdit, FaSave, FaTimes, FaInfoCircle
} from "react-icons/fa";

const FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
  { name: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "+91 9876543210", required: true },
  { name: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "" },
  { name: "gender", label: "Gender", type: "select", options: [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ]},
  { name: "address", label: "Address", type: "text", placeholder: "123 Main St, Apt 4", full: true },
  { name: "city", label: "City", type: "text", placeholder: "Bengaluru" },
  { name: "state", label: "State", type: "text", placeholder: "Karnataka" },
  { name: "country", label: "Country", type: "text", placeholder: "India" },
  { name: "postalCode", label: "Postal Code", type: "text", placeholder: "560001" },
];

const EMPTY_FORM = {
  fullName: "", phoneNumber: "", dateOfBirth: "", gender: "",
  address: "", city: "", state: "", country: "", postalCode: "",
};

const InfoSkeleton = () => (
  <div className="card-body">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div className="skeleton" style={{ height: 12, width: "40%", borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 44, borderRadius: 8 }} />
        </div>
      ))}
    </div>
  </div>
);

const PersonalInfo = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState(EMPTY_FORM);
  const [original, setOriginal] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const loadProfile = useCallback(async () => {
    if (!authUser?._id) return;
    try {
      const res = await getUserProfileApi(authUser._id);
      const u = res.data.user;
      const data = {
        fullName: u.fullName || "",
        phoneNumber: u.phoneNumber || "",
        dateOfBirth: u.dateOfBirth || "",
        gender: u.gender || "",
        address: u.address || "",
        city: u.city || "",
        state: u.state || "",
        country: u.country || "",
        postalCode: u.postalCode || "",
      };
      setForm(data);
      setOriginal(data);
    } catch {
      toast.error("Failed to load personal info");
    } finally {
      setLoading(false);
    }
  }, [authUser?._id]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.phoneNumber.trim()) errs.phoneNumber = "Phone number is required";
    if (form.phoneNumber && !/^\+?[\d\s-]{7,15}$/.test(form.phoneNumber))
      errs.phoneNumber = "Invalid phone number";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setSaving(true);
      const res = await updateUserProfileApi(form);
      const updatedUser = res.data.user;
      setOriginal(form);
      setEditing(false);

      dispatch(loginSuccess({ user: { ...authUser, ...updatedUser }, token: localStorage.getItem("token") }));
      toast.success("Personal info saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(original);
    setEditing(false);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="profile-card">
        <div className="card-header">
          <div className="skeleton skeleton-title" style={{ width: 200, height: 22 }} />
        </div>
        <InfoSkeleton />
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon"><FaInfoCircle size={16} /></div>
          Personal Details
        </h2>
        {!editing ? (
          <button className="btn btn-outline" onClick={() => setEditing(true)}>
            <FaEdit size={13} /> Edit
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline" onClick={handleCancel} disabled={saving}>
              <FaTimes size={13} /> Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              <FaSave size={13} /> {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="form-grid">
          {FIELDS.map((field) => (
            <div
              key={field.name}
              className={`form-group ${field.full ? "full-width" : ""}`}
            >
              <label className="form-label">{field.label}</label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`form-select ${errors[field.name] ? "error-field" : ""}`}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`form-input ${errors[field.name] ? "error-field" : ""}`}
                />
              )}

              {errors[field.name] && (
                <span className="field-error">{errors[field.name]}</span>
              )}
            </div>
          ))}
        </div>

        {!editing && (
          <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-muted)" }}>
            Click <strong>Edit</strong> to update your personal information.
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;