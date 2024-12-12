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
import UserdashboradLayout from "../UserDashboard/UserDashbordLayout";
import CheckOut from "../Pages/CheckOut";
import PrivateRoute from "./PrivateRoute";
import BlogListing from "../Pages/BlogListing";
import BlogDetails from "../Pages/BlogDetails";
import Wishlest from "../Pages/Wishlest";
import ShopList from "../Pages/ShopList";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import AddBlog from "../Dashboard/DashboradPages/AddBlog";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/UserdashboradLayout"
          element={
            <PrivateRoute element={<UserdashboradLayout />} role="user" />
          }
        />
        {/* <Route
          path="/dashboard/*"
          element={<PrivateRoute element={<DashboardLayout />} role="admin" />}
        /> */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/dashboard/AddProducts" element={<AddProducts />} />
        <Route path="/forget-passwrod" element={<ForgetPasswrod />} />
        <Route path="/your-cart" element={<YourBag />} />
        <Route path="/wishlist" element={<Wishlest />} />
        <Route path="/shop-list" element={<ShopList />} />
        <Route path="/shop-list/:id" element={<ShopList />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/blog-listing" element={<BlogListing />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
