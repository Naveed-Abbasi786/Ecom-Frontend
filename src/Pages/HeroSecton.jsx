import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import BannerImg1 from "../assets/img/banner-image-1.png";
import BannerImg2 from "../assets/img/banner-image-2.png";
import BannerImg3 from "../assets/img/banner-image-3.png";
import { Icon } from "@iconify/react";
import "../App.css";
export default function HeroSection() {
  const slides = [
    {
      img: BannerImg1,
      tit: "Up to",
      title: "Discount",
      dicount: "50%",
      subtitle: "Summer Lookbook - 2020",
      description: "New Modern Stylish Fashionable Men's Wear jeans Shirt",
    },
    {
      img: BannerImg2,
      tit: "Up to",
      title: "Exclusive Off",
      dicount: "20%",
      subtitle: "Winter Collection - 2021",
      description: "Warm and Stylish Jackets for the season",
    },
    {
      img: BannerImg3,
      tit: "Up to",
      title: "New Arrivals",
      dicount: "30%",
      subtitle: "Autumn Collection",
      description: "Trendy and Comfortable Outfits for Fall",
    },
  ];

  const titleRef = useRef([]);
  const subtitleRef = useRef([]);
  const descRef = useRef([]);
  const imgRef = useRef([]);
  const titRef = useRef([]);
  const discountRef = useRef([]);
  const btn = useRef([]);

  const handleSlideChange = (swiper) => {
    gsap.to(
      [
        titleRef.current[swiper.previousIndex],
        subtitleRef.current[swiper.previousIndex],
        descRef.current[swiper.previousIndex],
        imgRef.current[swiper.previousIndex],
        titRef.current[swiper.previousIndex],
        discountRef.current[swiper.previousIndex],
        btn.current[swiper.previousIndex],
      ],
      { y: 0, opacity: 2, duration: 1 }
    );

    gsap.fromTo(
      titRef.current[swiper.activeIndex],
      { y: -250, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      titleRef.current[swiper.activeIndex],
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      subtitleRef.current[swiper.activeIndex],
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      discountRef.current[swiper.activeIndex],
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      descRef.current[swiper.activeIndex],
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      btn.current[swiper.activeIndex],
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      imgRef.current[swiper.activeIndex],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  };

  useEffect(() => {
    handleSlideChange({ activeIndex: 0, previousIndex: 0 });
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      onSlideChangeTransitionStart={handleSlideChange}
      className="w-full lg:h-screen  bg-[#EDF0F5]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className={`w-full h-full flex flex-row items-center bg-[#EDF0F5]`}
          >
            <div className="lg:w-[44%] w-full z-50 p-4">
              <div className="w-full lg:ml-24 md:ml-12">
                <div className="w-full flex  flex-col flex-wrap">
                  <h1
                    ref={(el) => (titRef.current[index] = el)}
                    className="font-Josefi lg:text-[60px]  text-[#222222] leading-[75px] font-bold mb-2"
                  >
                    {slide.tit}
                  </h1>
                  <h1
                    ref={(el) => (titleRef.current[index] = el)}
                    className="font-Josefi text-[60px] text-[#222222] leading-[75px] font-bold mb-2"
                  >
                    <span
                      ref={(el) => (discountRef.current[index] = el)}
                      className="text-[#5EC1A1]"
                    >
                      {slide.dicount}
                    </span>
                    {slide.title}
                  </h1>
                  <h3
                    ref={(el) => (subtitleRef.current[index] = el)}
                    className="text-[20px] font-Josefi mb-2"
                  >
                    {slide.subtitle}
                  </h3>
                  <p
                    ref={(el) => (descRef.current[index] = el)}
                    className="w-[96%] font-Poppins text-[16px] text-[#222222] mt-3 mb-4"
                  >
                    {slide.description}
                  </p>
                </div>
                <button 
                  ref={(el) => (btn.current[index] = el)}
                className='btn font-Poppins'><span className='spn'></span>Explore Now<Icon
        icon="tabler:arrow-up-right"
        className="text-[28px] transition duration-200"
      /></button>         {/* <button
  ref={(el) => (btn.current[index] = el)}
  className="relative border-2 border-[#222222] text-[#222222] mt-8 flex items-center gap-2 transition duration-200 font-Poppins py-4 px-6 hover:bg-[#222222] hover:text-white"
>
  <span className="hover:text-white">Explore Now</span>
  <Icon
    icon="tabler:arrow-up-right"
    className="text-[28px] transition duration-200"
  />
  <span className="absolute inset-0 bg-[#3eff37] transition-all duration-500 ease-in-out transform origin-left scale-x-0 hover:scale-x-100"></span>
</button> */}

              </div>
            </div>
            <div className="lg:w-[60%] z-10 w-[100%] h-full lg:flex  md:flex hidden items-center justify-center">
              <div className="h-[100%]">
                <img
                  ref={(el) => (imgRef.current[index] = el)}
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
