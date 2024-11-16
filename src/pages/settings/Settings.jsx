import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Settings.css";
import defaultProfilePic from "../../assets/image.png";

const Settings = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    image_url: "", // For profile picture
    created_at: "",
    updated_at: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // Use a ref to store the `id` value
  const idRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view your settings.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5001/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        if (response.data.status === "success") {
          setUserData(response.data.user);
          setUpdatedUserData({
            username: response.data.user.username,
            email: response.data.user.email,
          });

          // Store the id in the ref
          idRef.current = response.data.user.id;
        } else {
          setError("Failed to fetch user data.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
    if (!profilePictureFile) {
      alert("Please select a profile picture to upload.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profilePicture", profilePictureFile);

      const response = await axios.put(
        "http://localhost:5001/api/auth/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setUserData({
          ...userData,
          image_url: response.data.image_url, // Update with the new image URL
        });
        alert("Profile picture updated successfully!");
        setProfilePictureFile(null);
      } else {
        setError("Failed to update profile picture.");
      }
    } catch (err) {
      setError("Failed to update profile picture.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5001/api/auth/profile",
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData({
        ...userData,
        username: updatedUserData.username,
        email: updatedUserData.email,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5001/api/auth/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError(null);
    } catch (err) {
      setPasswordError("Failed to update password.");
    }
  };

  const handleDeactivateAccount = async (e) => {
    e.preventDefault();

    const password = prompt(
      "Please confirm your password to deactivate your account"
    );

    if (!password) return;

    try {
      const token = localStorage.getItem("token");

      // Check if the token exists before sending the request
      if (!token) {
        setError("Token is missing. Please log in again.");
        return;
      }

      // Send the request with the password in the body and Authorization header in the headers
      const response = await axios.put(
        `http://localhost:5001/api/auth/account/${idRef.current}`,
        { password }, // Send password directly in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as the Authorization header
          },
        }
      );

      if (response.status === 200) {
        // Deactivate the account and log out by removing the token from localStorage
        localStorage.removeItem("token");

        alert("Account deactivated successfully!");
        // Optionally, redirect user to the login or home page
        // window.location.href = '/login';  // Uncomment if needed
      }
    } catch (err) {
      setError("Failed to deactivate account. Please try again.");
      console.error(err); // Log the error for debugging
    }
  };
  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="settings-container">
      <h1>Profile Settings</h1>
      <p className="p-heading">
        Here you can view and update your profile Information.
      </p>
      <div className="profile-info">
        <div className="profile-picture-container">
          {userData.image_url ? (
            <img src={userData.image_url} alt="Profile" />
          ) : (
            <img src={defaultProfilePic} alt="Default Profile" />
          )}
        </div>
        <h2>Profile Information</h2>
        <div className="form-group-prof-info">
          {/* Profile Information */}
          <div className="form-group">
            <label>Username:</label>
            <p>{userData.username}</p>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <p>{userData.email}</p>
          </div>
          <div className="form-group">
            <label>Role:</label>
            <p>{userData.role}</p>
          </div>
          <div className="form-group">
            <label>Created At:</label>
            <p>{new Date(userData.created_at).toLocaleString()}</p>
          </div>
          <div className="form-group">
            <label>Updated At:</label>
            <p>{new Date(userData.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Update Profile Picture */}
      <form onSubmit={handleUpdateProfilePicture}>
        <h2>Update Profile Picture</h2>
        <div className="form-group">
          <label>New Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button type="submit">Update Profile Picture</button>
      </form>

      {/* Update Profile */}
      <form onSubmit={handleUpdateProfile}>
        <h2>Update Profile</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={updatedUserData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {/* Change Password */}
      <form onSubmit={handleUpdatePassword}>
        <h2>Change Password</h2>
        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        {passwordError && <div className="error">{passwordError}</div>}
        <button type="submit">Change Password</button>
      </form>

      {/* Deactivate Account */}
      <button className="deactivate-btn" onClick={handleDeactivateAccount}>
        Deactivate Account
      </button>
    </div>
  );
};

export default Settings;
