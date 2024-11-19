import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Users.css"; // Import the external CSS file
import defaultProfilePic from "../../assets/image.png";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(
          "http://localhost:5001/api/users/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const viewAds = (userId) => {
    navigate(`/users/${userId}/ads`);
  };

  const deactivateUser = async () => {
    if (!deactivationReason.trim()) {
      alert("Please provide a reason for deactivation.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.put(
        `http://localhost:5001/api/users/deactivate/${selectedUserId}`,
        { reason: deactivationReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User deactivated successfully.");
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId ? { ...user, is_active: 0 } : user
        )
      );
      setShowModal(false); // Close modal after deactivation
      setDeactivationReason(""); // Reset reason
    } catch (err) {
      alert(err.response?.data?.message || "Failed to deactivate user.");
    }
  };

  const reactivateUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.put(
        `http://localhost:5001/api/users/activate/${userId}`,
        { reason: "test" }, // Update with the appropriate reason
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User reactivated successfully.");
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, is_active: 1 } : user
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reactivate user.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully.");
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="users-container">
      <h1>Users Page</h1>
      <p>Here you can manage users.</p>
      <div className="cards-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="card-header">
              {user.image_url ? (
                <img
                  className="user-avatar"
                  src={`http://localhost/Govi-Nena-Home-Garden-Advertisement-Module-Backend/${user.image_url}`}
                  alt={`${user.name}'s avatar`}
                />
              ) : (
                <img
                  className="user-avatar"
                  src={defaultProfilePic}
                  alt="Default avatar"
                />
              )}
            </div>

            <div className="card-body">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>Status: {user.is_active ? "Active" : "Inactive"}</p>
              <p>Ads Count: {user.advertisement_count}</p>
            </div>
            <div className="card-footer">
              <button onClick={() => viewAds(user.id)} className="btn view-ads">
                View Ads
              </button>
              {user.is_active ? (
                <button
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowModal(true);
                  }}
                  className="btn deactivate"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => reactivateUser(user.id)}
                  className="btn reactivate"
                >
                  Reactivate
                </button>
              )}
              <button
                onClick={() =>
                  window.confirm("Are you sure to delete this user?") &&
                  deleteUser(user.id)
                }
                className="btn delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for deactivation reason */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Deactivate User</h2>
            <textarea
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              placeholder="Enter reason for deactivation"
              rows="4"
            ></textarea>
            <div className="modal-actions">
              <button onClick={deactivateUser} className="btn confirm-btn">
                Confirm Deactivation
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeactivationReason(""); // Clear reason when closed
                }}
                className="btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
