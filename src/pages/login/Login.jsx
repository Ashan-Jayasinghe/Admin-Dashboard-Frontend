import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Login.css"; // Import the Login.css file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login", // Update this with your backend URL
        {
          email,
          password,
        }
      );

      if (response.data.status === "success") {
        // Save token in local storage (or use cookies if preferred)
        localStorage.setItem("token", response.data.token);

        // Show success toast notification
        toast.success("Login successful!");

        setTimeout(() => {
          // Navigate to dashboard or homepage
          window.location.href = "/home";
        }, 1500);
      } else {
        setError(response.data.message);
        toast.error(response.data.message); // Show error toast notification
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials and try again.");
      toast.error("Login failed. Please check your credentials."); // Show error toast notification
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
