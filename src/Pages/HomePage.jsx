import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import HeroSection from "./HeroSecton";
import SlideLogos from "../Components/SlideLogos";
import Category1 from "../assets/img/category-1.png";
import Category2 from "../assets/img/category-2.png";
import Category3 from "../assets/img/category-3.png";
import Category4 from "../assets/img/category-4.png";
import separator from "../assets/img/separator.png";
import News1 from "../assets/img/news-1.jpg";
import News2 from "../assets/img/news-2.jpg";
import News3 from "../assets/img/news-3.jpg";
import { Icon } from "@iconify/react";
import "../App.css";
import Footer from "../Components/Footer";

import { useNavigate } from "react-router-dom";
import Products from "../Components/Products";
import CollectionProducts from "../Components/CollectionProducts";
import MainNavbar from "../Components/Header/MainNavbar";
import MiniNavbar from "../Components/Header/MiniNavbar";
import Navbar from "../Components/Header/Navbar";
import { CartContext } from "../Context/Context";
import { CircularProgress } from "@mui/material";

export default function HomePage({ productData }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { categories, categoryLoading } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const category = [
    { CategoryPic: Category1, Title: "Women Collections" },
    { CategoryPic: Category2, Title: "Kids Collections" },
    { CategoryPic: Category3, Title: "Summer Collections" },
    { CategoryPic: Category4, Title: "Gents Collections" },
  ];

  const NewsData = [
    {
      NewsImg: News1,
      Date: "May 05,2020",
      Title: "Why is a ticket to lagos so expensive?",
      By: "Admidn",
      CommentCount: "03",
      Discription:
        "Tempor incididunt labore dolore magna aliqua. enim minim veniam quis nostrud exercitation laboris.",
    },
    {
      NewsImg: News2,
      Date: "Aug 14,2020",
      Title: "But i must explain to you how all this mistaken idea.",
      By: "User",
      CommentCount: "03",
      Discription:
        "Tempor incididunt labore dolore magna aliqua. enim minim veniam quis nostrud exercitation laboris.",
    },
    {
      NewsImg: News3,
      Date: "Jan 12,1920",
      Title: "The Biebers Just Switched Up Their Couple Style",
      By: "Admidn",
      CommentCount: "03",
      Discription:
        "Tempor incididunt labore dolore magna aliqua. enim minim veniam quis nostrud exercitation laboris.",
    },
  ];
  const CustomerSupport = [
    {
      Title: "Free Shipping",
      Dis: "Free shipping on oder over $100",
      Icon: "hugeicons:truck",
    },
    {
      Title: "Secure Payment",
      Dis: "We ensure secure payment with PEV",
      Icon: "ri:secure-payment-line",
    },
    {
      Title: "Support 24/7",
      Dis: "Contact us 24 hours a day, 7 days a week",
      Icon: "material-symbols:support-agent",
    },
    {
      Title: "30 Days Return",
      Dis: "Simply return it within 30 days",
      Icon: "icon-park-outline:return",
    },
  ];
  const ProductDetails = (postdata) => {
    navigate("/ProductDetail");
    productData(postdata);
  };
  return (
    <div>
      <MiniNavbar />
      <MainNavbar />
      <Navbar />
      {/* <Header /> */}
      <HeroSection />
      <SlideLogos />
      {/* TopCategories */}
      <div className="w-full h-full  mt-4 ">
        <h1 className="text-center text-[#222222] text-[40px] font-semibold font-Josefi">
          Top Category
        </h1>
        <p className="text-center font-Poppins text-[##222222] text-[15px]">
          Follow the most popular trends and get exclusive items from castro
          shop
        </p>
        <div className="flex justify-center mt-5">
          <img src={separator} alt="" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {categoryLoading ? (
            <CircularProgress />
          ) : (
            categories.map((val, idx) => (
              <div
                key={idx}
                className="lg:w-[20%] md:w-[30%] flex flex-col justify-center"
              >
                <div className="w-full h-full cursor-pointer rounded-full relative group overflow-hidden">
                  <img
                    src={`http://192.168.100.155:4000${val.image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-[#5EC1A1] opacity-0 rounded-full duration-300 ease-in group-hover:opacity-50 scale-[0] group-hover:scale-100"></span>
                </div>
                <span className="text-center text-[#222222] hover:text-[#5EC1A1] cursor-pointer mt-2 text-[18px] font-Josefi">
                  {val.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top Collection */}

      <CollectionProducts />

      {/*Season Sale  */}

      <div className="h-[122vh] overflowhidden relative">
        <div className="w-full h-[80vh] flex relative top-0 justify-center items-end background-Sale mt-8">
          <div className="h-[110%] w-[80%] sm:h-[100%] md:h-[85%] lg:h-[80%]  absolute top-1/2 transform -translate-y-1/2 lg:mt-60 md:mt-[30%] mt-[50%] shadow-lg bg-white">
            <div className="lg:w-[70%] w-[100%] flex flex-col flex-wrap mx-auto mt-12">
              <h1 className="font-Josefi  text-center font-semibold text-[#222222] lg:leading-[60px] md:leading-[55px] leading-[40px] lg:text-[50px] md:text-[45px] px-2 text-[34px]">
                End of Season Clearance Sale upto 50%
              </h1>
              <p className="font-Poppins text-[#222222] lg:mt-0 mt-5 leading-[24px] text-center font-bold lg:text-[18px] md:text-[15px] text-[15px] px-2">
                Welcome to the new range of shaving products from master barber.
                We have over three decades of experience in the male grooming
                industry
              </p>
              <div className="flex justify-center mt-7">
                <button className="btn blk font-Poppins">
                  <span className="spn bl"></span>Shop Now
                  <Icon
                    icon="tabler:arrow-up-right"
                    className="text-[28px] transition duration-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="w-full h-full  lg:mt-0 mt-24">
        <h1 className="text-center text-[#222222] text-[40px] font-semibold font-Josefi">
          Castro News
        </h1>
        <p className="text-center font-Poppins text-[#222222] mt-2  text-[15px]">
          Excepteur sint occaecat cupidatat non proident sunt
        </p>
        <div className="flex flex-wrap  justify-center mt-10">
          <img src={separator} alt="" />
        </div>
        <div className="w-full flex flex-wrap justify-center gap-6 h-full mt-8">
          {/* Card */}
          {NewsData.map((val, idx) => (
            <div
              key={idx}
              className="lg:w-[27%] md:w-[45%] w-[90%] h-[85%] lg:h-[85%] md:h-[100%]  bg-white border"
            >
              <div className="w-full h-[45%] border cursor-pointer relative group">
                <img
                  src={val.NewsImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-[#5EC1A1] opacity-0 duration-300 ease-in group-hover:opacity-50 group-hover:scale-100"></span>
              </div>
              <div className="flex items-center px-4 gap-2">
                <span className="font-bold font-PoppinsBold text-[#222222] text-[30px]">
                  -
                </span>
                <span className="font-Poppins text-[#222222] text-[15px]">
                  {val.Date}
                </span>
              </div>
              <h2 className="font-Josefi text-[24px] cursor-pointer px-4 leading-[28px] font-semibold text-[#222222] hover:text-[#5EC1A1]">
                {val.Title}
              </h2>
              <div className="flex gap-2 px-4 py-2">
                <span className="text-[15px] font-Poppins text-[#848484]">
                  by {val.By}
                </span>
                <span className="text-[15px] font-Poppins text-[#848484]">
                  |
                </span>
                <span className="text-[15px] font-Poppins text-[#848484]">
                  {val.CommentCount} Comments
                </span>
              </div>
              <p className="font-Poppins text-[15px] px-4 leading-[26px] text-[#848484]">
                {val.Discription}.
              </p>

              <div
                className="flex gap-2 items-center px-4 py-6 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="text-[#222222] font-Poppins text-[15px]">
                  Read More
                </span>
                {isHovered ? (
                  <Icon
                    icon="lineicons:arrow-right"
                    className="text-[22px] transition duration-300"
                  />
                ) : (
                  <Icon
                    icon="ph:arrow-up-right"
                    className="text-[22px] transition duration-300"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Products */}
      <Products className="mt-5" />

      {/* CustomerSupport */}

      <div className="w-full h-[40vh] mt-40 md:mt-24  lg:mt-16 flex items-center justify-center">
        <div className="w-[80%] md:w-[85%] lg:h-[80%] border-b-2 border-t flex items-center lg:gap-2 gap-8 flex-wrap lg:flex-nowrap">
          {CustomerSupport.map((val, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[48%] md:w-[30%] flex gap-1 items-start mb-4"
            >
              <span>
                <Icon
                  icon={val.Icon}
                  className="text-[40px] md:text-[50px] lg:text-[60px]"
                />
              </span>
              <div className="px-2 md:px-4">
                <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-Josefi leading-[28px] md:leading-[30px] lg:leading-[32px]">
                  {val.Title}
                </h3>
                <p className="font-Poppins text-[#848484] text-[14px] md:text-[15px] lg:text-[16px] leading-[22px] md:leading-[24px] lg:leading-[26px]">
                  {val.Dis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-[45%]  md:mt-[14%] sm:mt-[90%] lg:mt-12">
        <Footer />
      </div>
    </div>
  );
}
