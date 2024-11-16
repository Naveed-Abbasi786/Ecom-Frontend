import React, { useContext } from "react";
import Product1 from "../assets/img/Product1.jpg";
import Product2 from "../assets/img/Product2.jpg";
import Product3 from "../assets/img/Product3.jpg";
import Product4 from "../assets/img/Product4.jpg";
import Product5 from "../assets/img/Product5.jpg";
import Product6 from "../assets/img/Product6.jpg";
import Product7 from "../assets/img/Product7.jpg";
import Product8 from "../assets/img/Product8.jpg";
import separator from "../assets/img/separator.png";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/Context";

export default function Products() {

  const Products = [
    {
      id: 1,
      ProductImg: Product1,
      ProductImgHover: Product4,
      ProductName: "Cold Crewneck Sweater",
      ProductPrice: "70.30",
    },
    {
      id: 2,
      ProductImg: Product2,
      ProductImgHover: Product5,
      ProductName: "Multi-Way Ultra Crop Top",
      ProductPrice: "50.00",
      Status: "Hot",
    },
    {
      id: 3,
      ProductImg: Product3,
      ProductImgHover: Product7,
      ProductName: "Side-Tie Tank",
      ProductPrice: "40.00",
    },
    {
      id: 4,
      ProductImg: Product4,
      ProductImgHover: Product1,
      ProductName: "Must-Have Easy Tank",
      ProductPrice: "40.00",
    },
    {
      id: 5,
      ProductImg: Product5,
      ProductImgHover: Product2,
      ProductName: "Must-Have Easy Tank",
      ProductPrice: "40.00",
    },
    {
      id: 6,
      ProductImg: Product6,
      ProductImgHover: Product3,
      ProductName: "Must-Have Easy Tank",
      ProductPrice: "40.00",
    },
    {
      id: 7,
      ProductImg: Product7,
      ProductImgHover: Product2,
      ProductName: "Must-Have Easy Tank",
      ProductPrice: "40.00",
      Status: "New",
    },
    {
      id: 8,
      ProductImg: Product8,
      ProductImgHover: Product3,
      ProductName: "Must-Have Easy Tank",
      ProductPrice: "40.00",
    },
  ];

  const navigate = useNavigate();



  const ProductDetails = () => {
    navigate("/ProductDetail");
  };

  return (
    <div className="w-full mt-4">
      <h1 className="text-[30px] text-[#333333] font-Josefi text-center py-4">
        You May Also Like
      </h1>
      <div className="flex justify-center mt-5">
        <img src={separator} alt="" />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-[80%] mt-8 flex justify-center"
      >
        {Products.map((val, idx) => (
          <SwiperSlide key={idx} onClick={ProductDetails}>
            <div className="lg:w-[100%] md:w-[100%] h-[60vh] cursor-pointer flex flex-col">
              <div className="w-full relative h-[100%] bg-[#F1F3F5] group overflow-hidden">
                <div className="group relative w-full h-full">
                  <img
                    src={val.ProductImg}
                    alt="Product Image"
                    className="w-full h-full object-contain transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={val.ProductImgHover}
                    alt="Product Image"
                    className="w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
                  />
                </div>
                {val.Status && (
                  <div
                    className={`${
                      val.Status === "Hot" ? "bg-[#E73C2F]" : "bg-[#5EC1A1]"
                    } absolute z-50 status top-[2%] right-[3%]`}
                  >
                    {val.Status}
                  </div>
                )}
                <div className="absolute bottom-0 w-full flex justify-center gap-2 items-center text-white py-2 opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span>
                    <Icon
                      icon="mdi-light:heart"
                      className="bg-gray-900 lg:text-[36px] text-[30px] hover:bg-[#5EC1A1] transition duration-300 py-2 cursor-pointer"
                    />
                  </span>
                  <span
                    className="lg:text-[13px] md:text-sm text-[12px] sm:text-[15px] text-center font-semibold bg-[#3e3e3c] hover:bg-[#5EC1A1] transition duration-300 text-nowrap sm:py-0 py-2 px-6 sm:px-8 md:py-2 lg:py-2 cursor-pointer"
                  >
                    Add to Cart
                  </span>
                  <span>
                    <Icon
                      icon="line-md:search"
                      className="bg-gray-900 lg:text-[36px] text-[30px] hover:bg-[#5EC1A1] transition duration-300 py-2 cursor-pointer"
                    />
                  </span>
                </div>
              </div>
              <div className="h-[15%] mt-2">
                <span className="block text-[16px] font-Poppins text-[#222222] font-semibold">
                  {val.ProductName}
                </span>
                <span className="block text-[16px] font-Poppins text-gray-700 font-semibold">
                  ${val.ProductPrice}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
