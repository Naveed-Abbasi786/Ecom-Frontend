import React, { useCallback, useContext, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Icon } from "@iconify/react";
import { Checkbox, Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import { CartContext } from "../Context/Context";
import Products from "./Products";
import Empty from "../assets/img/empty-cart.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BorderLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e0e0e0",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#5EC1A1",
  },
});

export default function CartSidebar({ isOpen, closeSidebar, product }) {
  const [progress, setProgress] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [enabled, setEnabled] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);
  const [msgOpen, setMsgOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [couponCodeOpen, setCouponCodeOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const {
    incrementQuantity,
    fetchloading,
    decrementQuantity,
    cartItems,
    handleDelete,
  } = useContext(CartContext);

  const handleSectionToggle = (sectionSetter) => {
    setInfoOpen(false);
    setMsgOpen(false);
    setShippingOpen(false);
    setCouponCodeOpen(false);
    sectionSetter(true);
  };

  //   try {
  //     if (!isLoggedIn) {
  //       alert("Please login");
  //       return;
  //     }

  //     const cartItem = {
  //       productId,
  //       userId: user._id,
  //       quantity: newQuantity,
  //     };

  //     const response = await axios.post(
  //       `http://192.168.100.106:4000/api/cart/updatecart`,
  //       cartItem
  //     );
  //     fetchUserData();
  //     if (response.data.success) {
  //       setCartItems((prevCart) =>
  //         prevCart.map((item) =>
  //           item._id === productId ? { ...item, quantity: newQuantity } : item
  //         )
  //       );
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const incrementQuantity = (id, currentQuantity) => {
  //   const newQuantity = currentQuantity + 1;

  //   setCartItems((prevCart) =>
  //     prevCart.map((item) =>
  //       item._id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );

  //   updateCart(id, newQuantity);
  // };

  // const decrementQuantity = (id, currentQuantity) => {
  //   if (currentQuantity > 1) {
  //     const newQuantity = currentQuantity - 1;

  //     setCartItems((prevCart) =>
  //       prevCart.map((item) =>
  //         item._id === id ? { ...item, quantity: newQuantity } : item
  //       )
  //     );

  //     updateCart(id, newQuantity);
  //   } else {
  //     alert("Quantity cannot be less than 1.");
  //   }
  // };

  const countries = [
    { value: "Pakistan", label: "Pakistan", postalCode: "100", price: 100 },
    { value: "India", label: "India", postalCode: "110", price: 120 },
    { value: "USA", label: "USA", postalCode: "90210", price: 120 },
    { value: "UK", label: "UK", postalCode: "SW1A 1AA", price: 120 },
  ];

  const handleCountryChange = (country) => {
    const selected = countries.find((c) => c.value === country);
    setSelectedCountry(selected.value);
  };
  const navigate = useNavigate();
  const YourBag = () => {
    navigate("/your-cart");
  };
  const CheckOut = () => {
    navigate("/check-out");
  };

  // const handleProductDetails = (productId) => {
  //   navigate(`/product-detail/${productId}`);
  //   };
  return (
    <>
      <ToastContainer />
      <div
        className={`fixed top-0 right-0 lg:w-[25%] md:w-[50%]  w-[100%] h-screen  overflow-y-auto outline-none bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SimpleBar onClick={closeSidebar} style={{ maxHeight: "100%" }}>
          <div className="flex w-[100%] py-4 pver  overflow-y-auto outline-none items-center justify-center">
            <button
              onClick={closeSidebar}
              className="text-gray-600 cursor-pointer mr-6"
            >
              <Icon
                icon="akar-icons:cross"
                className="text-1xl cursor-pointer"
              />
            </button>
            <h3 className="text-center mr-10 text-[#333333] font-Poppins text-[16px]">
              You have{" "}
              <span className="text-black font-Poppins font-bold text-[16px]">
                ({quantity} item{quantity > 1 ? "s" : ""})
              </span>{" "}
              in your bag
            </h3>
          </div>
          <hr />
          <div className="w-[90%] mx-auto mt-4">
            <BorderLinearProgress variant="determinate" value={progress} />
            <h4 className="text-[#666666] font-Poppins text-[12px] text-center py-1">
              Spend $2,000.99 to receive free shipping
            </h4>
          </div>
          <hr className="mt-2" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-[43vh] overflow-y-auto"
          >
            {fetchloading ? (
              <div>Loading...</div>
            ) : cartItems?.length === 0 ? (
              <div className="w-full h-full flex mx-auto justify-center items-center">
                <img src={Empty} alt="" className="w-[150px] h-[150px]" />
              </div>
            ) : (
              cartItems?.map((product, index) => (
                <div
                  key={index}
                  className="w-full cursor-pointer border h-[18vh] flex items-center mb-2"
                >
                  <div
                    //  onClick={() => handleProductDetails(product._id,event)}
                    className="ml-2 w-[30%] h-[60%] border"
                  >
                    <img
                      src={`${API_URL}${product?.product?.imageUrls[0]}`}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[100%] px-3">
                    <h5 className="text-[16px] text-[#333333]">
                      {product?.product?.name}
                    </h5>
                    <p className="text-[16px] text-[#333333]">
                      ${product?.product?.price}
                    </p>
                  </div>
                  <div className="w-full sm:w-[30%] mr-2 mt-5">
                    <div className="p-2">
                      <div className="w-full text-center">
                        {product.quantity}
                      </div>
                      <div className="flex justify-center mt-2">
                        <span className="px-2 border text-center cursor-pointer">
                          <Icon
                            icon="line-md:minus"
                            className="text-lg text-[#666666]"
                            onClick={() =>
                              decrementQuantity(
                                product.product?._id,
                                product?.quantity
                              )
                            }
                          />
                        </span>
                        <span className="px-2 border text-center cursor-pointer">
                          <Icon
                            icon="line-md:plus"
                            onClick={() =>
                              incrementQuantity(
                                product.product?._id,
                                product?.quantity
                              )
                            }
                            className="text-lg text-[#666666]"
                          />
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-[#333333] hover:text-[#5EC1A1] hover:underline font-Poppins text-[13px] px-4 -mt-2 cursor-pointer"
                      onClick={() => handleDelete(product.product?._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="w-full bg-gray-100 justify-center flex overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`border-t border-r px-8 py-2 group cursor-pointer ${
                infoOpen ? "border-none text-[#5EC1A1]" : "hover:text-[#5EC1A1]"
              }`}
              onClick={() => handleSectionToggle(setInfoOpen)}
            >
              <Icon
                icon="ic:outline-info"
                className={`text-[19px] ${infoOpen ? "text-[#5EC1A1]" : "text-[#333333]"}`}
              />
            </span>
            <span
              className={`border px-8 py-2 group cursor-pointer ${
                msgOpen ? "border-none text-[#5EC1A1]" : "hover:text-[#5EC1A1]"
              }`}
              onClick={() => handleSectionToggle(setMsgOpen)}
            >
              <Icon
                icon="tabler:message"
                className={`text-[19px] ${msgOpen ? "text-[#5EC1A1]" : "text-[#333333]"}`}
              />
            </span>
            <span
              className={`border px-8 py-2 group cursor-pointer ${
                shippingOpen
                  ? "border-none text-[#5EC1A1]"
                  : "hover:text-[#5EC1A1]"
              }`}
              onClick={() => handleSectionToggle(setShippingOpen)}
            >
              <Icon
                icon="mingcute:truck-line"
                className={`text-[19px] ${shippingOpen ? "text-[#5EC1A1]" : "text-[#333333]"}`}
              />
            </span>
            <span
              className={`border px-8 py-2 group cursor-pointer ${
                couponCodeOpen
                  ? "border-none text-[#5EC1A1]"
                  : "hover:text-[#5EC1A1]"
              }`}
              onClick={() => handleSectionToggle(setCouponCodeOpen)}
            >
              <Icon
                icon="fluent:tag-16-regular"
                className={`text-[19px] ${couponCodeOpen ? "text-[#5EC1A1]" : "text-[#333333]"}`}
              />
            </span>
          </div>

          {infoOpen && (
            <div
              className={`w-full   transform transition-transform duration-10000 ease-in ${
                infoOpen
                  ? "translate-y-0 bottom-0"
                  : "translate-y-full bottom-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Info Content */}
              <div className="flex justify-between items-center w-full mt-4">
                <h3 className="text-[#555555] ml-4">Subtotal:</h3>
                <h4 className="text-[#222] font-Poppins text-right mr-4">
                  $853.00
                </h4>
              </div>
              <h4 className="font-Poppins text-[#666666] text-[14px] ml-4 py-3">
                Taxes calculated at checkout
              </h4>
              <div className="px-4 gap-2 flex">
                <input type="checkbox" name="" id="" />
                <span className="text-[#666666] font-Poppins text-[14px]">
                  I accept the{" "}
                  <span className="text-blue-500 cursor-pointer hover:text-blue-400 hover:underline">
                    Terms
                  </span>{" "}
                  /{" "}
                  <span className="text-blue-500 cursor-pointer hover:text-blue-400 hover:underline">
                    Privacy Policy.
                  </span>
                </span>
              </div>
              <div className="flex h-[7vh] gap-2 justify-center ml-2 mt-4">
                <button
                  onClick={YourBag}
                  className="w-[150px] h-[40px] duration-500 bg-[#5EC1A1] hover:bg-transparent hover:text-[#5EC1A1] text-white duration-300 transition ease-in-out hover:border-2 border-[#5EC1A1] outline-none"
                >
                  Your Bag
                </button>
                <button
                  onClick={CheckOut}
                  className="w-[150px] h-[40px] bg-transparent text-[#5EC1A1] border-2 border-[#5EC1A1] hover:text-white hover:bg-[#5EC1A1] duration-300 transition ease-in-out outline-none"
                >
                  Your Check Out
                </button>
              </div>
            </div>
          )}

          {msgOpen && (
            <div
              className={`w-full   transform transition-transform duration-10000 ease-in ${
                msgOpen ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex flex-col  justify-center items-center">
                <p className="text-[#666666] text-[14px] font-Poppins text-center py-4">
                  Special instructions for seller
                </p>
                <textarea
                  className="w-[90%] border-2  resize-none outline-none py-2 px-2 text-[#666666] font-Poppins"
                  cols="40"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-[#5EC1A1] px-12 py-1 text-white resize-none text-[15px] outline-none hover:bg-[#5bb396] tracking-widest">
                  Submit
                </button>
              </div>
            </div>
          )}

          {shippingOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`transition-transform transform ${shippingOpen ? "translate-y-0" : "translate-y-full"} duration-500 ease-out`}
            >
              <div className="w-[90%] relative ml-5 mt-4">
                <Listbox value={selectedCountry} onChange={handleCountryChange}>
                  <Listbox.Button className="w-full appearance-none outline-none border-gray-100 border-[2px] py-1 font-Poppins text-[15px] px-2 bg-transparent text-[#666666] flex justify-between items-center">
                    {
                      countries.find(
                        (country) => country.value === selectedCountry
                      ).label
                    }
                    <ChevronDownIcon className="h-5 w-5 fill-[#666666]" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute bottom-full mb-2 w-full bg-white border border-[#666666] rounded shadow-lg z-10">
                    {countries.map((country) => (
                      <Listbox.Option
                        key={country.value}
                        value={country.value}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${
                            active
                              ? "bg-gray-200 text-[#222]"
                              : "text-[#666666]"
                          }`
                        }
                      >
                        {country.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>

                <div className="mt-4">
                  <label className="block text-[#666666] text-sm mb-1">
                    Postal Code
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="text"
                      className="w-full border-gray-200 border-[2px] p-2 rounded outline-none text-[#333333]"
                      placeholder="Enter postal code"
                    />
                    <button className="bg-[#5EC1A1] py-2 px-4 text-white">
                      Calculate
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[#333333] text-lg font-semibold">
                    Price: $320
                  </p>
                </div>
              </div>
            </div>
          )}
          {couponCodeOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`transition-transform transform ${couponCodeOpen ? "translate-y-0" : "translate-y-full"} px-4 duration-500 ease-out`}
            >
              <p className="text-[#666666] font-Poppins py-4 ">
                Coupon discount
              </p>
              <input
                type="text"
                placeholder="Your Code here"
                className="w-full border-2  text-[#666666]  py-1 px-2 outline-none"
              />
              <p className="text-[#666666] font-Poppins text-[13px] py-2">
                Coupon code calculated at checkout
                <button className="w-full bg-[#5EC1A1] text-[14px] tracking-widest	  py-2 text-center  text-white resize-none mt-2 outline-none hover:bg-[#5bb396]">
                  Submit
                </button>
              </p>
            </div>
          )}
        </SimpleBar>
      </div>
    </>
  );
}
