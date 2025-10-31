"use client"
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LiveAnalytics() {
  const [chartData, setChartData] = useState({
    labels: ["10s", "20s", "30s"],
    datasets: [
      {
        label: "Live Views",
        data: [50, 75, 120],
        borderColor: "#4CAF50",
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newViews = Math.floor(Math.random() * 200);
        return {
          labels: [...prevData.labels.slice(1), `${prevData.labels.length * 10}s`],
          datasets: [{ ...prevData.datasets[0], data: [...prevData.datasets[0].data.slice(1), newViews] }],
        };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container m-auto p-6 ">
      <h2 className="text-2xl font-bold">📊 Live Viewers</h2>
      <Line data={chartData} />
    </div>
  );
}