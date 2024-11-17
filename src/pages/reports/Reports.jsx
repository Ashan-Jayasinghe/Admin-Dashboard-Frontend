import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css"; // Import the CSS file

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reports", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
          },
        });
        setReports(response.data.data); // Adjust based on your API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p className="loading">Loading reports...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const handleViewAd = (adId) => {
    // Navigate to the ad's detailed view page or open it in a new tab
    window.location.href = `/advertisements/${adId}`; // Adjust URL based on your routing
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <p>Here you can view planting materials advertisements.</p> 

      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Reason</th>
            <th>Comments</th>
            <th>Reported Advertisement Title</th>
            <th>Category</th>
            <th>Reported On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.reason}</td>
                <td>{report.comments || "No comments"}</td>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td>{new Date(report.created_at).toLocaleString()}</td>
                <td>{report.status}</td>
                <td>
                  <button
                    className={`status-btn ${report.status === "pending" ? "pending" : "reviewed"}`}
                  >
                    {report.status === "pending"
                      ? "Mark as Reviewed"
                      : "Reviewed"}
                  </button>
                  <button
                    className="view-ad-btn"
                    onClick={() => handleViewAd(report.advertisement_id)}
                  >
                    View Ad
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-reports">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
