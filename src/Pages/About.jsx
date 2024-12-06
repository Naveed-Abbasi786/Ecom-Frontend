import React, { useRef } from "react";
import PageHeader from "../Components/PageHeader";
import Header from "../Components/Header";
import SigNature from "../assets/img/signature.webp";
import AboutBanner from "../assets/img/Aboutusbanner.jpg";
import AboutPic from "../assets/img/About.jpg";
import Member1 from "../assets/img/member-1.jpg";
import Member2 from "../assets/img/member-2.jpg";
import Member3 from "../assets/img/member-3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import Footer from "../Components/Footer";
export default function About() {
  const cards = [
    {
      title: "Design Quality",
      dis: "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus liberoeu augue.",
      Icon: "hugeicons:web-design-02",
    },
    {
      title: "Professional Support",
      dis: "Praesent dapibus, neque id cursus faucibus tortor neque egestas augue, eu vulputate magna eros eu erat.",
      Icon: "bx:support",
    },
    {
      title: "Made With Love",
      dis: "Pellentesque a diam sit amet mi ullamcorper vehicula. Nullam quis massa sit amet nibh viverra malesuada.",
      Icon: "mdi:love",
    },
  ];

  const team = [
    {
      teamImg: Member1,
      name: "Samanta Grey",
      passion: "Founder & CEO",
      dis: "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
    },
    {
      teamImg: Member2,
      name: "Bruce Sutton",
      passion: "Sales & Marketing Manager",
      dis: "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
    },
    {
      teamImg: Member3,
      name: "Janet Joy",
      passion: "Product Manager",
      dis: "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
    },
  ];
  const testimonials = [
    {
      img: Member1,
      title:
        "Sed pretium, ligula sollicitudin viverra, tortor libero sodales lepretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nuncpretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunco, eget blandit nunc.",
      name: "Samanta Grey",
    },
    {
      img: Member2,
      title:
        "Sed pretium, ligula sollicitudin viverra, tortor libero sodales lepretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nuncpretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunco, eget blandit nunc.",
    },
    {
      img: Member3,
      title:
        "Sed Sed pretium, ligula sollicitudin viverra, tortor libero sodales lepretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nuncpretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunco, eget blandit nunc.",
    },
  ];

  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <Header />
      <PageHeader
        title="About Us"
        subtitle="About"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "About Us", link: "/about-us" },
        ]}
      />
      <div className="mt-4 mb-10">
        <div className="w-[90%] ml-[5%]">
          <h1 className="text-[#333333] font-Poppins text-[24px] text-center">
            Who We Are
          </h1>
          <p className="text-[#212529] mt-3 font-Poppins text-center w-[72%] mx-auto text-[14px] leading-[26px]">
            Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
            sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.
            Sed egestas, ante et vulputate volutpat, uctus metus libero eu
            augue. Morbi purus libero, faucibus adipiscing, commodo quis,
            gravida id, est. Sed lectus. Praesent elementum hendrerit tortor.
            Sed semper lorem at felis.
          </p>
          <img src={SigNature} alt="" className="mx-auto mt-8" />
          <img
            src={AboutBanner}
            alt=""
            className="w-[1000px] h-[500px] object-cover mx-auto mt-8"
          />

          <div className="grid lg:grid-cols-3 mt-12 md:grid-cols-2 grid-cols-1">
            {cards.map((val, idx) => (
              <div key={idx}>
                <Icon
                  icon={val.Icon}
                  width="32"
                  height="32"
                  className="text-center mx-auto  text-[#5EC1A1]"
                />
                <h3 className="text-[#999999] text-center font-Poppins py-2">
                  {val.title}
                </h3>
                <p className="text-[#999999] text-center w-[80%] font-Poppins mx-auto">
                  {val.dis}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full mb-10 mt-10 bg-[#f9f9f9]">
          <div className="w-[90%] h-full ml-[8%] grid lg:grid-cols-2 grid-cols-1 ">
            <div className="mt-4">
              <h2 className="text-[#333333] capitalize text-[24px] mt-8 font-Poppins font-bold">
                Who We are
              </h2>
              <p className="leading-[34px] text-[#5ec1a1]  mt-4 text-[16px] font-Poppins ">
                Pellentesque odio nisi, euismod pharetra a ultricies in diam.
                Sed arcu. Cras consequat
              </p>
              <p className="mt-4 leading-[26px] font-Poppins text-[#212529] text-[14px]">
                Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                sodales leo, eget blandit nunc tortor eu nibh. Suspendisse
                potenti. Sed egestas, ante et vulputate volutpat, uctus metus
                libero eu augue.
              </p>
              <button className="btn font-Poppins text-[15px] px-3 border-[#5ec1a1] text-[#5ec1a1] py-2 mt-10 -ml-0">
                <span className="spn"></span>View Our News
                <Icon
                  icon="tabler:arrow-up-right"
                  className="text-[20px]  transition duration-200"
                />
              </button>
            </div>
            <div className="p-8">
              <img src={AboutPic} alt="" />
            </div>
          </div>
        </div>

        <div className="w-[90%] mb-10 ml-[5%] mt-12">
          <h1 className="text-center text-[#333333] font-Poppins text-[25px]">
            Meet Our Team
          </h1>
          <div className="w-full overflow-hidden h-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="relative w-[376px] h-[500px] group overflow-hidden"
              >
                {/* Image */}
                <img
                  src={member.teamImg}
                  alt={member.name}
                  className="w-full h-full object-cover cursor-pointer transition duration-500 group-hover:scale-110 group-hover:opacity-50"
                />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-black/50 translate-y-full">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <h4 className="text-lg font-semibold">{member.passion}</h4>
                  <p className="text-sm mt-2 px-4 text-center">{member.dis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[60vh] mt-20 mb-10 bg-[#f9f9f9] relative">
          <h1 className="text-[#333333] font-Poppins text-center text-[24px] py-10">
            What Customer Say About Us
          </h1>
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="w-[80%] mx-auto text-center">
                  <div className="mx-auto w-[70px] h-[70px]">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-[#666666] font-Poppins text-[16px] mt-4">
                    {testimonial.title}
                  </p>
                  <h4 className="text-[#333333] font-Poppins text-[16px] mt-3">
                    {testimonial.name}
                  </h4>
                  <h6 className="text-[#666666] font-Poppins text-[16px]">
                    Customer
                  </h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-5 z-10">
            <button
              onClick={handlePrev}
              className="rounded-full p-2  hover:bg-gray-200 transition"
            >
              &#10094;
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-5 z-10">
            <button
              onClick={handleNext}
              className=" rounded-full p-2  hover:bg-gray-200 transition"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
