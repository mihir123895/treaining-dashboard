import React, { useEffect, useState } from "react";
import axios from "axios";
import ModuleCard from "../../components/ModuleCard";
import ChartCard from "../../components/ChartCard";
import Spinner from "../../components/Spinner";
import ErrorFallback from "../../components/ErrorFallback";
import "../../styles/Dashboard.css";

const TraineeDashboard = () => {
  const [modules, setModules] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [modRes, statRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/modules/my-modules`, {
          withCredentials: true,
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/my-progress`, {
          withCredentials: true,
        }),
      ]);
      setModules(modRes.data);
      setStats(statRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="dashboard">
      <h2>My Modules</h2>
      <div className="dashboard-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod._id} data={mod} showComplete />
        ))}
      </div>

      <h3>Progress Overview</h3>
      <ChartCard data={stats} />
    </div>
  );
};

export default TraineeDashboard;
