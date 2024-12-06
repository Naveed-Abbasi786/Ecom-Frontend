import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const PrivateRoute = ({ element, role }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
        setUserRole(response.data.role); // Assuming the API response contains the `role`
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-sky-100 flex justify-center items-center">
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      </div>
    );
  }

  // Redirect based on user role
  if (isAuthenticated) {
    if (userRole === "user" && role === "user") {
      return element;
    } else if (userRole === "admin" && role === "admin") {
      return element;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
