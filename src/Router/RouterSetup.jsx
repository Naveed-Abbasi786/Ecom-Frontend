import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "../Pages/HomePage";
import ProductDetail from "../Pages/ProductDetail";
import ForgetPasswrod from "../Pages/ForgetPasswrod";
import Resetpassword from "../Pages/ResetPassword";
import Dashboarad from "../Dashboard/dashboarad";
import DashboardLayout from "../Dashboard/dashboradLayout";
import AddProducts from "../Dashboard/DashboradPages/AddProducts";
import YourBag from "../Pages/YourBag";
import UserdashboradLayout from '../UserDashboard/UserDashbordLayout';
import CheckOut from "../Pages/CheckOut";
import PrivateRoute from './PrivateRoute';
import BlogListing from "../Pages/BlogListing";
import BlogDetails from "../Pages/BlogDetails";
import '../App.css'
const API_URL = "http://192.168.100.106:4000/api/auth";

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      setLoggedIn(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedIn(true);
      setUser(response.data);
    } catch (error) {
      setLoggedIn(false);
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div className="w-full h-screen bg-sky-100 flex justify-center items-center">
<div className="loader">
  <div className="justify-content-center jimu-primary-loading"></div>
</div>
  </div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/UserdashboradLayout" element={<PrivateRoute element={<UserdashboradLayout />} />} />
        <Route path="/dashboard/*" element={<PrivateRoute element={<DashboardLayout />} />} />
        <Route path="/dashboarad" element={<Dashboarad />} />
        <Route path="/dashboard/AddProducts" element={<AddProducts />} />
        <Route path="/forget-passwrod" element={<ForgetPasswrod />} />
        <Route path="/your-cart" element={<YourBag />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/blog-listing" element={<BlogListing />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
