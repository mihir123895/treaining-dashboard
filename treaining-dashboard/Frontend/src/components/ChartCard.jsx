import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "../styles/ChartCard.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartCard = ({ data }) => {
  if (!data || data.length === 0) return null;

  const isTrainee = !Array.isArray(data);

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Modules",
        data: isTrainee
          ? [data.completed, data.pending]
          : [
              data.filter((m) => m.isCompleted).length,
              data.filter((m) => !m.isCompleted).length,
            ],
        backgroundColor: ["#28a745", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const barData = !isTrainee
    ? {
        labels: data.map((d) => d.assignedTo.username),
        datasets: [
          {
            label: "Completed Modules",
            backgroundColor: "#28a745",
            data: data.map((d) => (d.isCompleted ? 1 : 0)),
          },
        ],
      }
    : null;

  return (
    <div className="chart-card">
      <div className="chart-wrapper">
        <Pie data={pieData} />
      </div>
      {barData && (
        <div className="chart-wrapper">
          <Bar data={barData} />
        </div>
      )}
    </div>
  );
};

export default ChartCard;
