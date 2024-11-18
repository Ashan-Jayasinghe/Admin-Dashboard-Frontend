import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import "./AnalyticsDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement, // Register ArcElement here
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalAds: 0,
    totalFertilizerAds: 0,
    totalAgrochemicalAds: 0,
    totalMachineryAds: 0,
    totalPlantingMaterialAds: 0,
    growthData: [],
    topUsers: [],
    topAds: [],
  });
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading before fetching

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make all the API calls in parallel using Promise.all
        const [
          totalUsersResponse,
          totalAdsResponse,
          totalFertilizerAdsResponse,
          totalAgrochemicalAdsResponse,
          totalMachineryAdsResponse,
          totalPlantingMaterialAdsResponse,
          growthDataResponse,
          topUsersResponse,
          topAdsResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5001/api/analytics/total-users", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/total-ads", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/fertilizer-ads", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/agrochemical-ads", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/machinery-ads", {
            headers,
          }),
          axios.get(
            "http://localhost:5001/api/analytics/planting-material-ads",
            { headers }
          ),
          axios.get("http://localhost:5001/api/analytics/growth-data", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/top-users", {
            headers,
          }),
          axios.get("http://localhost:5001/api/analytics/top-ads", { headers }),
        ]);

        setData({
          totalUsers: totalUsersResponse.data.totalUsers,
          totalAds: totalAdsResponse.data.totalAds,
          totalFertilizerAds:
            totalFertilizerAdsResponse.data.totalFertilizerAds,
          totalAgrochemicalAds:
            totalAgrochemicalAdsResponse.data.totalAgrochemicalAds,
          totalMachineryAds: totalMachineryAdsResponse.data.totalMachineryAds,
          totalPlantingMaterialAds:
            totalPlantingMaterialAdsResponse.data.totalPlantingMaterialAds,
          growthData: growthDataResponse.data.growthData,
          topUsers: topUsersResponse.data.topUsers,
          topAds: topAdsResponse.data.topAds,
        });

        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Error fetching data, please try again later.");
        setLoading(false); // Stop loading if error occurs
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Loading, error, and data rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Growth Data Chart (Line Chart)
  const growthDataChart = {
    labels: data.growthData.map((item) => item.label),
    datasets: [
      {
        label: "User Growth Over Time",
        data: data.growthData.map((item) => item.count),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  // Top Ads Chart (Bar Chart)
  const topAdsChart = {
    labels: data.topAds.map((item) => item.title),
    datasets: [
      {
        label: "Top Ads by Views",
        data: data.topAds.map((item) => item.views),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Top Users Chart (Bar Chart)
  const topUsersChart = {
    labels: data.topUsers.map((item) => item.name),
    datasets: [
      {
        label: "Top Users by Ads Posted",
        data: data.topUsers.map((item) => item.total_ads),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Ads Category Distribution (Pie Chart)
  const adsCategoryChart = {
    labels: [
      "Fertilizer Ads",
      "Agrochemical Ads",
      "Machinery Ads",
      "Planting Material Ads",
    ],
    datasets: [
      {
        label: "Ad Categories",
        data: [
          data.totalFertilizerAds,
          data.totalAgrochemicalAds,
          data.totalMachineryAds,
          data.totalPlantingMaterialAds,
        ],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p className="subtext">Here you can view agro-chemical advertisements.</p>

      <div className="stats-container">
        <div className="card">
          <h4>Total Ads</h4>
          <p>{data.totalAds}</p>
        </div>
        <div className="card">
          <h4>Fertilizer Ads</h4>
          <p>{data.totalFertilizerAds}</p>
        </div>
        <div className="card">
          <h4>Agrochemical Ads</h4>
          <p>{data.totalAgrochemicalAds}</p>
        </div>
        <div className="card">
          <h4>Machinery Ads</h4>
          <p>{data.totalMachineryAds}</p>
        </div>
        <div className="card">
          <h4>Planting Material Ads</h4>
          <p>{data.totalPlantingMaterialAds}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>User Growth (Line Chart)</h3>
          <Line data={growthDataChart} />
          <p className="TU-p">Total Registered Users: {data.totalUsers}</p>
        </div>

        <div className="chart-container">
          <h3>Top 5 Ads by Views (Bar Chart)</h3>
          <Bar data={topAdsChart} />
        </div>

        <div className="chart-container">
          <h3>Top 5 Users by Ads Posted (Bar Chart)</h3>
          <Bar data={topUsersChart} />
        </div>

        <div className="chart-container">
          <h3>Ads Category Distribution (Pie Chart)</h3>
          <Pie data={adsCategoryChart} />\
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
