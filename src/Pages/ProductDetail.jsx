import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { Icon } from "@iconify/react";
import Product1 from "../assets/img/pro1.jpg";
import Product2 from "../assets/img/pro2.jpg";
import Product3 from "../assets/img/pro3.jpg";
import Product4 from "../assets/img/pro4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Listbox } from "@headlessui/react";
import { Menu, Rating } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileImg1 from "../assets/img/category-4.png";
import ProfileImg2 from "../assets/img/category-1.png";
import ProfileImg3 from "../assets/img/profile.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Products from "../Components/Products";
import {Link, useParams} from 'react-router-dom'
import { ChevronDownIcon } from "@heroicons/react/solid";
import Footer from "../Components/Footer";
import axios from "axios";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductDetail() {
  const ProductImages = [Product1, Product2, Product3, Product4];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [value, setValue] = React.useState(2);
  const [RetingVal, setRetingVal] = useState(4);
  const [val, setVal] = React.useState(0);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [ReviewRating, setReviewRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [product, setProduct] = useState([]);

  
  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.106:4000/api/cat/products/${id}`
        );
       setProduct(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);


  const swiperRef = useRef(null);

  const handleMouseMove = (e, idx) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    target.style.transformOrigin = `${x}% ${y}%`;
  };

  const statuses = [
    { value: "active", label: "Gray" },
    { value: "paused", label: "Green" },
    { value: "delayed", label: "Black" },
    { value: "canceled", label: "Red" },
  ];

  const Reviews = [
    {
      ProfileImg: ProfileImg1,
      ProfileName: "Eileen Alene",
      Date: "May 1, 2120",
      Discription:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim est laborum. Sed perspiciatis unde omnis natus error sit voluptatem accusa dolore mque laudant totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi arch tecto beatae vitae dicta.",
      Ratings: 4,
    },
    {
      ProfileImg: ProfileImg2,
      ProfileName: "Poema Leak",
      Date: "Aug 1, 2320",
      Discription:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim est laborum. Sed perspiciatis unde omnis natus error sit voluptatem accusa dolore mque laudant totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi arch tecto beatae vitae dicta.",
      Ratings: 2,
    },
    {
      ProfileImg: ProfileImg3,
      ProfileName: "Eelw Woke",
      Date: "Jan 1, 2920",
      Discription:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim est laborum. Sed perspiciatis unde omnis natus error sit voluptatem accusa dolore mque laudant totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi arch tecto beatae vitae dicta.",
      Ratings: 6,
    },
  ];

  const handleThumbnailClick = (idx) => {
    setSelectedImageIndex(idx);
    swiperRef.current?.slideTo(idx);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const validationSchema = Yup.object({
    reviewMsg: Yup.string()
      .min(10, "Review must be at least 10 characters")
      .required("Review is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  return (
    <div>
      <Header />

      <div className="w-full lg:flex md:flex hidden justify-between">
        <div className="flex items-center gap-1 ml-[5%]">
          <span className="text-[14px] font-Poppins cursor-pointer text-[#6b6b6b] hover:text-[#222] hover:underline">
           <Link to='/'>Home</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
          <span className="text-[14px] font-Poppins text-[#222] cursor-pointer hover:text-[#6b6b6b] hover:underline">
            <Link to='/ProductDetail'>Product Details</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
        </div>
        <div className="flex gap-4 mr-[4%]">
        <div className="flex items-center cursor-pointer">
        <Icon
            icon="iconamoon:arrow-left-2-thin"
            className="text-[20px] font-Poppins text-[#222]"
            />
          <span className="text-[14px] font-Poppins text-[#222] hover:text-[#6b6b6b] hover:underline">
            prev
          </span>
            </div>
            <div className="flex items-center cursor-pointer">
          <span className="text-[14px] font-Poppins text-[#222] hover:text-[#6b6b6b] hover:underline">
            Next
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222]"
            />
            </div>
        </div>
      </div>

      <div className="flex lg:mt-10 md:-[0%] mt-[10%]  lg:flex-row flex-col">

       { product && (
    <div className="lg:w-[50%] w-full h-full flex lg:flex-row flex-col-reverse">
      {/* Thumbnail Images Container */}
      <div className="lg:w-[30%] w-[100%] lg:mt-0 mt-10 mx-auto lg:mx-0">
        <div className="flex h-[100%] lg:flex-col flex-row gap-4 justify-center items-center lg:ml-4 px-0 overflow-x-auto lg:overflow-y-auto">
          {product.imageUrls?.map((imageUrl, idx) => (
            <span
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`w-[70px] lg:w-[60%] cursor-pointer h-[50px] lg:h-[100px] ${
                selectedImageIndex === idx ? "border-[2px] border-[#5EC1A1]" : "opacity-50"
              }`}
            >
              <img
                src={`http://192.168.100.106:4000${imageUrl}`}
                alt={`thumbnail-${idx}`}
                className={`w-full h-full object-cover ${
                  selectedImageIndex === idx ? "opacity-100" : "opacity-90"
                }`}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Main Image Container */}
      <div className="lg:w-[70%] w-[100%] mx-auto lg:mx-0 lg:ml-0 ml-2 h-[100%]">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {product.imageUrls?.map((imageUrl, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative overflow-hidden lg:w-full w-[80%] mx-auto h-full"
                onMouseMove={(e) => handleMouseMove(e, idx)}
                style={{ cursor: "zoom-in" }}
              >
                <img
                  src={`http://192.168.100.106:4000${imageUrl}`}
                  alt={`selected-${idx}`}
                  className={`w-full h-[70vh] object-cover transition-transform duration-300 ${
                    idx === 0 ? "lg:py-0 md:py-10 py-10" : "py-0"
                  }`}
                  style={{ transition: "transform 0.1s" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.7)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

  <div className="lg:w-[50%]  w-full h-full lg:-mt-2 md:mt-8 mt-10 px-4">
          <h1 className="text-[24px] font-Poppins text-[#222] font-semibold">
            {product.name}
          </h1>
          <div className="flex mt-3 gap-2 items-center">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <span className="text-[13px] font-Poppins text-[#6b6b6b]">
              (5 Reviews)
            </span>
          </div>
          <h3 className="text-[27px] font-Poppins text-[#222] py-8">${product.price}</h3>
          <p className="text-[14px] font-Poppins text-[#222] w-[90%]">
            {product.heading}
          </p>
          <div className="flex mt-6 gap-2">
            <span className="text-gray-400 font-Poppins py-1">Color :</span>
            <div className="relative lg:w-[17%] w-auto">
              <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                <Listbox.Button className="w-full appearance-none outline-none border-gray-100 border-[2px] py-1 font-Poppins text-[15px] px-2 bg-transparent text-[#666666] flex justify-between items-center">
                  {
                    statuses.find((status) => status.value === selectedStatus)
                      .label
                  }
                  <ChevronDownIcon className="h-5 w-5 fill-[#666666]" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 w-full bg-white border border-[#666666] rounded shadow-lg z-10">
                  {statuses.map((status) => (
                    <Listbox.Option
                      key={status.value}
                      value={status.value}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-gray-200 text-[#222]" : "text-[#666666]"
                        }`
                      }
                    >
                      {status.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>

          <div className="flex lg:flex-row  md:flex-row flex-col mt-8">
            <div className="lg:w-[150px] md:w-[150px] w-[200px]  h-[50px] flex items-center justify-between border rounded-md overflow-hidden">
              <button
                onClick={decrement}
                className="w-10 h-full flex items-center justify-center  hover:bg-gray-300"
              >
                <Icon icon="line-md:minus" className="text-xl text-[#666666]" />
              </button>

              <span className="flex-1 text-center text-[#666666]">
                {quantity}
              </span>

              <button
                onClick={increment}
                className="w-10 h-full flex items-center justify-center hover:bg-gray-300"
              >
                <Icon icon="line-md:plus" className="text-xl text-[#666666]" />
              </button>
            </div>

            <div className="lg:ml-8 md:ml-8 ml-0 lg:mt-0 md:mt-0 mt-5 lg:w-[42%] md:w-[42%] w-[90%] lg:py-0 md:py-0 py-2  bg-[#5EC1A1] flex items-center  gap-2 justify-center">
              <Icon
                icon="iconoir:add-to-cart"
                className="text-white text-[20px]"
              />
              <span className="text-white font-Poppins">Add to Cart</span>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 group cursor-pointer hover:text-[#5EC1A1]">
              <span>
                <Icon
                  icon="line-md:heart"
                  className="text-gray-400  group-hover:text-[#5EC1A1] -mt-1 text-[22px]"
                />
              </span>
              <span className="text-gray-400 font-Poppins text-[14px] group-hover:text-[#5EC1A1] hover:underline">
                Add to Wishlist
              </span>
            </div>

            <div className="flex items-center cursor-pointer gap-2 group hover:text-[#5EC1A1]">
              <span>
                {" "}
                <Icon
                  icon="teenyicons:git-compare-outline"
                  className="text-gray-400 group-hover:text-[#5EC1A1]  -mt-1 text-[17px]"
                />
              </span>
              <span className="text-gray-400 font-Poppins text-[14px] group-hover:text-[#5EC1A1] hover:underline py-1">
                Add to Wishlist
              </span>
            </div>
          </div>

          <hr className="mt-4 bg-gray-900" />

          <div className="flex mt-4 lg:flex-row md:flex-row flex-col gap-3 justify-between">
            <div className="flex gap-4">
              {" "}
              <span className="text-gray-400 font-Poppins text-[15px]">
                Categories :{" "}
              </span>{" "}
              <span className="text-gray-400 font-Poppins text-[15px]">
                Electronics
              </span>
            </div>

            <div className="flex gap-2 mr-4  items-center">
              <h6 className="text-gray-400 font-Poppins text-[15px]">
                Share On :{" "}
              </h6>
              <div className="flex items-center gap-4">
                <span className="rounded-full border border-gray-300 p-1 hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer flex items-center justify-center">
                  <Icon
                    icon="line-md:facebook"
                    className="text-[23px] text-gray-400"
                  />
                </span>
                <span className="rounded-full border border-gray-300 p-1 hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer flex items-center justify-center">
                  <Icon
                    icon="line-md:instagram"
                    className="text-[23px] text-gray-400"
                  />
                </span>
                <span className="rounded-full border border-gray-300 p-1 hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer flex items-center justify-center">
                  <Icon
                    icon="lineicons:vimeo"
                    className="text-[23px] text-gray-400"
                  />
                </span>
                <span className="rounded-full border border-gray-300 p-1 hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer flex items-center justify-center">
                  <Icon
                    icon="ri:google-line"
                    className="text-[23px] text-gray-400"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
{/* Reviews Section */}
      <div className="flex justify-center mt-12">
        <Box sx={{ width: "95%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}
          >
            <Tabs
  value={val}
  onChange={handleChange}
  sx={{
    overflowX: "auto", 
    "& .MuiTabs-flexContainer": { 
      overflowX: "auto",
    },
    "& .MuiTab-root": {
      color: "#666", 
      fontFamily: "Josefi, sans-serif",
      textTransform: "capitalize",
      fontSize: "17px",
      minWidth: "auto", 
      padding: "8px 16px", 
    },
    "& .Mui-selected": {
      color: "#222", 
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#222", 
    },
  }}
  aria-label="basic tabs example"
>
              <Tab label="Description" {...a11yProps(0)} />
              <Tab label="Additional Information" {...a11yProps(1)} />
              <Tab label="Reviews(1)" {...a11yProps(2)} />
            </Tabs>
          </Box>
          {/* Discription */}
          <CustomTabPanel value={val} index={0}>
            <h5 className="text-[#333333]  font-Josefi text-[20px] text-[#222]">
              Product discription
            </h5>
            <p className="text-[#848484] text-[16px] font-Josefi py-4 leading-[23px]">
              Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ulla mco laboris nisi ut aliquip ex ea
              commodo consequat. duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-[#848484] text-[16px] font-Josefi py-4 leading-[23px]">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesc iunt. neque porro quisquam est qui dolorem
              ipsum quia dolor sit amet consectetur adipisci velit, sed quia non
              numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </p>
            <p className="text-[#848484] text-[16px] font-Josefi py-4 leading-[23px]">
              Nemo enim ipsam voluptatem quia voluptas Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos 1qui ratione voluptatem sequi
              nesc iunt. neque porro quisquam est qui dolorem ipsum quia dolor
              sit amet consectetur adipisci velit, sed quia non numquam eius
              modi tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.Nemo enim ipsam voluptatem quia voluptas sit aspernatur
              aut odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesc iunt. neque porro quisquam est qui
              dolorem ipsum quia dolor sit amet consectetur adipisci velit, sed
              quia non numquam eius modi tempora incidunt ut labore et dolore
              magnam aliquam quaerat voluptatem.Nemo enim ipsam voluptatem quia
              voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur15 magni dolores eos qui ratione voluptatem sequi nesc
              iunt. neque porro quisquam est qui dolorem ipsum quia dolor sit
              amet consectetur adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesc
              iunt. neque porro quisquam est qui dolorem ipsum quia dolor sit
              amet consectetur adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <hr className="mt-5" />
          </CustomTabPanel>
          {/* ProductInfo */}
          <CustomTabPanel value={val} index={1}>
            <h5 className="text-[#333333] font-Josefi text-[20px]">
              Product Information
            </h5>

            <p className="text-[#848484] text-[16px] font-Josefi py-4 leading-[23px]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Aliquam
              porttitor mauris sit amet orci.
            </p>
            <div>
              <h1 className="text-[#333333] font-josefi text-[18px] mb-2">
                Fabric & Care
              </h1>
              <ol className="list-disc list-inside pl-4 leading-[29px]">
                <li className="text-[#848484] text-[15px]">
                  Faux suede fabric
                </li>
                <li className="text-[#848484] text-[15px]">
                  Gold tone metal hoop handles.
                </li>
                <li className="text-[#848484] text-[15px]">RI branding</li>
                <li className="text-[#848484] text-[15px]">
                  Snake print trim interior
                </li>
                <li className="text-[#848484] text-[15px]">
                  Adjustable cross body strap
                </li>
                <li className="text-[#848484] text-[15px]">
                  Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm
                </li>
              </ol>
              <hr className="mt-5" />
              <div className="mt-2">
                <span className="text-[#333333] text-[16px] font-Josefi">
                  Type :
                </span>{" "}
                <span className="text-[#848484] text-[15px] px-2">Laptop</span>
              </div>
              <div className="mt-2">
                <span className="text-[#333333] text-[16px] font-Josefi">
                  Vendor :
                </span>{" "}
                <span className="text-[#848484] text-[15px] px-2">Catrio</span>
              </div>
              <div className="mt-2">
                <span className="text-[#333333] text-[16px] font-Josefi">
                  Color :
                </span>{" "}
                <span className="text-[#848484] text-[15px] px-2">
                  Gray,Black,Red,Greeen
                </span>
              </div>
              <hr className="mt-5" />

            </div>
          </CustomTabPanel>
          {/* Reviws */}
          <CustomTabPanel value={val} index={2}>
            <h1 className="font-Poppins text-[#333333] text-[19px]">
              1 Review for Multi-Way Ultra Crop Top
            </h1>
            {Reviews.map((val, idx) => (
              <div key={idx} className="w-full mt-6 flex  ">
                <span className="w-[7%] h-[30%] border rounded-full">
                  <img
                    src={val.ProfileImg}
                    className="w-full h-full ronded-full object-cover"
                    alt=""
                  />
                </span>
                <div className="w-[80%] h-auto py-1 px-3">
                  <Rating name="read-only" value={val.Ratings} readOnly />
                  <div className="-mt-2 gap-4  flex items-center">
                    <span className="text-[#333333] font-Josefi text-[16px]">
                      {val.ProfileName}
                      <span className="text-[#848484] text-[26px] px-1 ml-2 ">
                        -
                      </span>{" "}
                      <span className="text-[#848484] text-[16px] text-center ">
                        {val.Date}
                      </span>
                    </span>
                  </div>
                  <p className="text-[#848484]  text-[15px] font-Josefi py-1 leading-[23px]">
                    {val.Discription}
                  </p>
                </div>
              </div>
            ))}

            <hr className="mt-4" />
            <div className="mt-8">
              <h1 className="font-Poppins text-[#333333] text-[19px]">
                Be First to Review For “Multi-Way Ultra Crop Top”
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[#33333] font-Josefi text-[18px]">
                  Your Rating{" "}
                </span>
                <Rating
                  name="simple-controlled"
                  value={ReviewRating}
                  onChange={(event, newValue) => {
                    setReviewRating(newValue);
                  }}
                />{" "}
              </div>
              <Formik
                initialValues={{
                  reviewMsg: "",
                  name: "",
                  email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("Form values:", values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="mt-4">
                    {/* Review Field */}
                    <div className="mb-4">
                      <label htmlFor="reviewMsg" className="text-[#848484]">
                        Your Review
                      </label>
                      <Field
                        as="textarea"
                        name="reviewMsg"
                        placeholder="Your Review"
                        className={`w-full border-2 mt-2 outline-none px-2 py-4 font-Josefi resize-none  text-[#848484] ${
                          touched.reviewMsg && errors.reviewMsg
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-500`}
                        cols="30"
                        rows="10"
                      />
                      <ErrorMessage
                        name="reviewMsg"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex gap-4 mt-4 justify-between">
                      {/* Name Field */}
                      <div className="w-[48%] flex flex-col">
                        <label htmlFor="name" className="text-[#848484]">
                          Your Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className={`border-2 mt-2 outline-none px-2 py-2 font-Josefi ${
                            touched.name && errors.name ? "border-red-500" : ""
                          } focus:border-blue-500`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="w-[48%] flex flex-col">
                        <label htmlFor="email" className="text-[#848484]">
                          Your Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className={`border-2 mt-2 outline-none px-2 py-2 font-Josefi ${
                            touched.email && errors.email
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-500`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex  mt-4 justify-center">
                    <button type="submit" className="btn blk font-Poppins ">
                      <span className="spn bl"></span>Submit Your Reviews
                      <Icon
                        icon="tabler:arrow-up-right"
                        className="text-[28px] transition duration-200"
                        />
                    </button>
                        </div>
                  </Form>
                )}
              </Formik>
              <hr className="mt-5" />
            </div>
          </CustomTabPanel>
        </Box>
      </div>
      
{/* Products */}
     <div>
    <Products/>
     </div>

     <div className="mt-24">
     <Footer/>
     </div>
    </div>
  );
}
