import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import 'swiper/swiper-bundle.min.css';
import logo1 from "../assets/img/logo1.png";
import logo2 from "../assets/img/logo2.png";
import logo3 from "../assets/img/logo3.png";
import logo4 from "../assets/img/logo4.png";
import logo5 from "../assets/img/logo5.png";
import logo6 from "../assets/img/logo6.png";
import logo7 from "../assets/img/logo7.png";
import logo8 from "../assets/img/logo8.png";
import logo9 from "../assets/img/logo9.png";
import logo10 from "../assets/img/logo10.png";

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
];

export default function SlideLogos() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="w-full lg:flex hidden justify-center items-center  h-[20vh] mt-5 relative">
      <div className="w-[80%] flex justify-center">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          loop={true}
          autoplay={{
            disableOnInteraction: false,
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <img src={logo} alt={`Logo ${index + 1}`} className="h-16" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-5 z-10">
        <button
          onClick={handlePrev}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        >
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-5 z-10">
        <button
          onClick={handleNext}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
