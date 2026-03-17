import { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../../service/providerService";

const Profile = ({ onClose }) => {

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    service: "",
    skills: "",
    experience: "",
    description: "",
    basePrice: "",
    city: "",
    profileImage: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await getMyProfile();

      if (res.data) {
        setForm({
          ...res.data,
          skills: res.data.skills?.join(", ") || ""
        });
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const formattedData = {
      ...form,
      skills: form.skills.split(",").map(s => s.trim())
    };

    await saveProfile(formattedData);

    alert("Profile Updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-3">

      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative space-y-3">

        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">Provider Profile</h2>

        <input name="fullName" value={form.fullName} onChange={handleChange} className="input" placeholder="Full Name" />

        <input name="phone" value={form.phone} onChange={handleChange} className="input" placeholder="Phone" />

        <input name="service" value={form.service} onChange={handleChange} className="input" placeholder="Service (e.g. Electrician)" />

        <input name="skills" value={form.skills} onChange={handleChange} className="input" placeholder="Skills (comma separated)" />

        <input name="experience" value={form.experience} onChange={handleChange} className="input" placeholder="Experience (years)" />

        <textarea name="description" value={form.description} onChange={handleChange} className="input" placeholder="Description"></textarea>

        <input name="basePrice" value={form.basePrice} onChange={handleChange} className="input" placeholder="Base Price" />

        <input name="city" value={form.city} onChange={handleChange} className="input" placeholder="City" />

        <input name="profileImage" value={form.profileImage} onChange={handleChange} className="input" placeholder="Profile Image URL" />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 w-full"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
};

export default Profile;