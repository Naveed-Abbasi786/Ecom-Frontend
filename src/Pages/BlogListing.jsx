import React from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Blog from "../assets/img/news-1.jpg";
import Footer from "../Components/Footer";
import PageHeader from "../Components/PageHeader";
export default function BlogListing() {
  const BlogData = [
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
    {
      by: "by Hồng Lưu Xuân",
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
      dis: "Sed pretium, ligula sollicitudin eget blandit nunc tortor eu nibh. laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.igula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti viverra, tort...",
      profilePic: Blog,
    },
  ];
  const Guides = [
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
    {
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      profilePic: Blog,
    },
  ];

  const navigate=useNavigate()
  const BlogDetail=()=>{
  navigate('/blog-details')
  }
  return (
    <>
      <Header />
      <PageHeader 
      title="Blog Listing" 
      subtitle="Blog" 
      breadcrumbs={[
        { label: 'Home', link: '/' },
        { label: 'Blog Listing', link: '/blog-listing' },
      ]}
    />

      <div className="w-[90%] h-full flex ml-[5%] mt-4 border-t border-1">
        <div className="lg:w-[75%] w-full mt-10 h-full mb-10 space-y-8 ">
          {BlogData.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row md:flex-row  w-full min-h-[50vh] space-y-6 lg:space-y-0"
            >
              {/* Image Section */}
              <div 
              onClick={BlogDetail} className="lg:w-[40%]  cursor-pointer  md:w-[40%] w-full">
                <img
                  src={val.profilePic}
                  alt="blogPix"
                  className="w-full  h-full object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Content Section */}
              <div className="lg:w-[60%] md:w-[60%] w-full mt-4 lg:py-8 py-0 lg:mt-0  px-4">
                {/* Author and Date */}
                <div className="flex gap-2 mb-2">
                  <p className="text-gray-500 text-sm lg:text-base font-Poppins">
                    {val.by}
                  </p>
                  <span className="text-gray-500 text-sm lg:text-base font-Poppins">
                    |
                  </span>
                  <p className="text-gray-500 text-sm lg:text-base font-Poppins">
                    {val.date}
                  </p>
                </div>

                {/* Heading */}
                <h3  onClick={BlogDetail}  className="text-gray-800 cursor-pointer hover:text-[#5EC1A1] text-lg lg:text-2xl font-bold leading-6 lg:leading-8">
                  {val.heading}
                </h3>

                {/* Subheading */}
                <p className="text-gray-600 text-sm lg:text-base mt-2">
                  {val.subHeading}
                </p>

                {/* Description */}
                <p className="text-gray-800 text-sm lg:text-base leading-6 mt-3">
                  {val.dis}
                </p>

                {/* Continue Reading Section */}
                <div  onClick={BlogDetail} className="flex items-center mt-4 cursor-pointer group transition-all duration-300 ease-in-out hover:underline hover:underline-offset-4 hover:decoration-gray-800">
                  <p className="text-green-500 group-hover:text-gray-800 text-sm lg:text-base transition-all duration-300">
                    Continue Reading
                  </p>
                  <Icon
                    icon="si:arrow-right-fill"
                    className="ml-2 text-lg text-green-500 group-hover:text-gray-800 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[25%] lg:block hidden mt-10">
          <div className="border flex items-center gap-2 px-3 py-2 focus-within:border-[#5EC1A1] focus-within:shadow-lg focus-within:ring focus-within:ring-[#5EC1A1] rounded-md transition-all duration-300">
            <input
              type="text"
              placeholder="Search"
              className="outline-none border-none flex-grow text-sm placeholder-gray-400"
            />
            <Icon icon="line-md:search" className="text-gray-400 text-[24px]" />
          </div>

          <div className="mt-4">
            <h1 className="text-[#222] font-Poppins text-[22px]">Guides</h1>

            <div className="">
              {Guides.map((val, idx) => {
                return (
                  <div key={idx} className="flex h-[14vh] mt-4">
                    <div className="w-[30%]">
                      <img
                        src={val.profilePic}
                        alt="blog"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[70%] m-2">
                      <p className="text-[#cccccc] text-[12px] font-Poppins">
                        {val.date}
                      </p>
                      <h6 className="text-[#222] font-Poppins text-[15px]">
                        {val.heading}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
