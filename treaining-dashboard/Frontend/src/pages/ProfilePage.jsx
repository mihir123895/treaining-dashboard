import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [form, setForm] = useState({
    username: "",
    gender: "Not Selected",
    dob: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        withCredentials: true,
      });
      const { username, gender, dob, phone } = res.data;
      setForm({ username, gender, dob, phone });
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update-profile`, form, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:-</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:-</label>
          <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:-</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:-</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
            <option>Not Selected</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
