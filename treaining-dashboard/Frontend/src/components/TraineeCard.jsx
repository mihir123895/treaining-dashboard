import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TraineeCard.css";

const TraineeCard = () => {
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    const fetchTrainees = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/trainees`,
        { withCredentials: true }
      );
      setTrainees(res.data);
    };
    fetchTrainees();
  }, []);

  return (
    <div className="trainee-list">
      {trainees.map((t) => (
        <div className="trainee-card" key={t._id}>
          <strong>{t.username}</strong>
          <span>{t.email}</span>
        </div>
      ))}
    </div>
  );
};

export default TraineeCard;
