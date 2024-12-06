import React, { useContext } from "react";
import post1 from "../assets/img/post-1.png";
import post2 from "../assets/img/post-2.png";
import post3 from "../assets/img/post-3.png";
import post4 from "../assets/img/post-4.png";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function BlogSlides() {
  const BlogPost = [
    {
      postImg: post1,
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
    },
    {
      postImg: post2,
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
    },
    {
      postImg: post3,
      date: "Sep 17, 2019",
      heading: "Cras ornare tristique elit.",
      subHeading: "in Blog Grid 2 Columns",
    },
    {
        postImg: post1,
        date: "Sep 17, 2019",
        heading: "Cras ornare tristique elit.",
        subHeading: "in Blog Grid 2 Columns",
      },
      {
        postImg: post2,
        date: "Sep 17, 2019",
        heading: "Cras ornare tristique elit.",
        subHeading: "in Blog Grid 2 Columns",
      },
      {
        postImg: post3,
        date: "Sep 17, 2019",
        heading: "Cras ornare tristique elit.",
        subHeading: "in Blog Grid 2 Columns",
      },
  ];

  const navigate = useNavigate();

  const ProductDetails = () => {
    navigate("/ProductDetail");
  };

  return (
    <div className="w-full h-full ">
        <h1 className="text-[25px] text-gray-800">Guide</h1>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-[100%] h-h-full  flex"
      >
        {BlogPost.map((val, idx) => (
          <SwiperSlide key={idx} onClick={ProductDetails}>
            <div className="lg:w-[100%] md:w-[100%] h-full cursor-pointer flex flex-col">
              <div className="w-full relative h-[100%] bg-[#F1F3F5] group overflow-hidden">
                <div className="lg:w-[44vw] lg:h-[30vh] w-full h-full">
                  <img
                    src={val.postImg}
                    alt="Product Image"
                    className="w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                </div>
              </div>
              <div className="h-[15%] mt-2">
              <span className="block text-[16px] font-Poppins text-gray-700 font-semibold">
                  ${val.date}
                </span>
                <span className="block text-[16px] font-Poppins text-[#222222] font-semibold">
                  {val.heading}
                </span>
                <span className="block text-[16px] font-Poppins text-gray-700 font-semibold">
                  ${val.subHeading}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
