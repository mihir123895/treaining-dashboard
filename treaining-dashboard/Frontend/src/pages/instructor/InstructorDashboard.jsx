import React, { useEffect, useState } from "react";
import axios from "axios";
import ModuleCard from "../../components/ModuleCard";
import TraineeCard from "../../components/TraineeCard";
import ChartCard from "../../components/ChartCard";
import Spinner from "../../components/Spinner";
import ErrorFallback from "../../components/ErrorFallback";
import "../../styles/Dashboard.css";
import { toast } from "react-toastify";

const InstructorDashboard = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProgress = async () => {
    try {
      setError(false);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/modules/all-progress`,
        { withCredentials: true }
      );
      setProgress(res.data);
    } catch (err) {
      setError(true,err);
      toast.error(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorFallback onRetry={fetchProgress} />;

  return (
    <div className="dashboard">
      <h2>All Trainee Module Progress</h2>
      <div className="dashboard-grid">
        {progress.map((mod) => (
          <ModuleCard key={mod._id} data={mod} />
        ))}
      </div>

      <h3>Visual Stats</h3>
      <ChartCard data={progress} />

      <h3>Trainee List</h3>
      <TraineeCard />
    </div>
  );
};

export default InstructorDashboard;
