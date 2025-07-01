import React, { useEffect, useState } from "react";
import axios from "axios";
import ModuleCard from "../../components/ModuleCard";
import Spinner from "../../components/Spinner";
import ErrorFallback from "../../components/ErrorFallback";
import { toast } from "react-toastify";

const MyModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchModules = async () => {
    try {
      setError(false);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/modules/my-modules`,
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
    fetchModules();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorFallback onRetry={fetchModules} />;

  return (
    <div className="dashboard">
      <h2>My Assigned Modules</h2>
      <div className="dashboard-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod._id} data={mod} showComplete />
        ))}
      </div>
    </div>
  );
};

export default MyModulesPage;
