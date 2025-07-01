import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CreateModule.css";
import { toast } from "react-toastify";

const CreateModulePage = () => {
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });
  const [trainees, setTrainees] = useState([]);

  const fetchTrainees = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/trainees`, {
      withCredentials: true,
    });

    console.log(res.data)
    setTrainees(res.data);
  };

  useEffect(() => {
    fetchTrainees();

  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post( 
        `${import.meta.env.VITE_API_BASE_URL}/api/modules/create`,
        form,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setForm({ title: "", description: "", assignedTo: "" });
    } catch (err) {
      toast.error("Error assigning module",err);
    }
  };

  return (
    <div className="create-module">
      <h2>Assign Training Module</h2>
      <form onSubmit={handleSubmit} className="module-form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Module Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Module Description"
          required
        ></textarea>
        <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required>
          <option value="">Assign to Trainee</option>
          {trainees.map((t) => (
            <option key={t._id} value={t._id}>
              {t.username}
            </option>
          ))}
        </select>
        <button type="submit">Create Module</button>
      </form>
    </div>
  );
};

export default CreateModulePage;
