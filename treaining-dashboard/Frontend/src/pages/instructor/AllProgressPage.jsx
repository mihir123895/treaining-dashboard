import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import ErrorFallback from "../../components/ErrorFallback";
import ChartCard from "../../components/ChartCard";
import "../../styles/AllProgress.css";
import { toast } from "react-toastify";

const AllProgressPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProgressData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/modules/all-progress`,
        { withCredentials: true }
      );
      setModules(res.data);
    } catch (err) {
      setError(true);
      toast.error(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorFallback onRetry={fetchProgressData} />;

  return (
    <div className="all-progress-page">
      <h2>📈 Trainee Progress Overview</h2>
      <p>Total Modules: {modules.length}</p>

      <div className="all-progress-grid">
        {modules.map((mod) => (
          <div key={mod._id} className="progress-card">
            <h4>{mod.title}</h4>
            <p>
              Assigned To: <strong>{mod.assignedTo?.username}</strong>
            </p>
            <p>Status:{" "}
              <span className={mod.isCompleted ? "completed" : "pending"}>
                {mod.isCompleted ? "Completed ✅" : "Pending ⏳"}
              </span>
            </p>
          </div>
        ))}
      </div>

      <ChartCard data={modules} />
    </div>
  );
};

export default AllProgressPage;
