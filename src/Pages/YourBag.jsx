import React, { useCallback, useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Footer from "../Components/Footer";
import Products from "../Components/Products";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
export default function ShopingCart() {
  const [progress, setProgress] = React.useState(100);
  const [buffer, setBuffer] = React.useState(10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [cartTotal, setCartTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const navigate = useNavigate();

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  const CheckOut = () => {
    navigate("/check-out");
  };

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setIsLoggedIn(true);

      if (response.data._id) {
        setLoading(true);
        const cartResponse = await axios.post(`${API_URL}/api/cart/getcart`, {
          userId: response.data._id,
        });
        setCartItems(cartResponse.data.cart.items);
        setCartTotal(cartResponse.data.cartTotal);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

 
  const handleDelete = async (id) => {
    const cartItemdelete = {
      productId: id,
      userId: user._id,
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/remove`,
        cartItemdelete
      );

      fetchUserData();
      toast.success("You successfully delete");
    } catch (error) {
      alert(error);
    }
  };

  const updateCart = async (productId, newQuantity) => {
    try {
      if (!isLoggedIn) {
        alert("Please login");
        return;
      }

      const cartItem = {
        productId,
        userId: user._id,
        quantity: newQuantity,
      };

      const response = await axios.post(
        `${API_URL}/api/cart/updatecart`,
        cartItem
      );
      console.log("Cart Item Updated Successfully:", response.data);
      setCartItems(response.data.cart.items);
      // if (response.data.success) {
      //   setCartItems((prevCart) =>
      //     prevCart.map((item) =>
      //       item._id === productId ? { ...item, quantity: newQuantity } : item
      //     )
      //   );
      // }
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    updateCart(id, newQuantity);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      updateCart(id, newQuantity);
    } else {
      alert("Quantity cannot be less than 1.");
    }
  };
  useEffect(() => {
      fetchUserData();    
  }, []);
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[100%]">
        <Header />
      </div>
      <div>
        <div className="w-full h-[30vh] bg-[#F6F6F6] flex justify-center items-center">
          <div>
            <h1 className="font-Poppins text-[#333333] text-[40px] leading-[44px] tracking-[1]">
              Shopping Cart
            </h1>
            <h4 className="font-Poppins text-[#5EC1A1] text-center text-[20px] -tracking-[1]">
              Shop
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4 ml-[5%]">
          <span className="text-[14px] font-Poppins cursor-pointer text-[#6b6b6b] hover:text-[#222] hover:underline">
            <Link to="/">Home</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
          <span className="text-[14px] font-Poppins text-[#222] cursor-pointer hover:text-[#6b6b6b] hover:underline">
            <Link to="/ShoppingCart">Your Shopping Cart</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
        </div>

        <div className="bg-[#5EC1A1] ml-[5%] mt-6 w-[85%] py-3 flex items-center gap-4">
          <Icon icon="proicons:info" className="ml-3  text-white" />
          <p className="text-white text-[14px] font-Poppins font-normal leading-[24px]">
            Someone has placed an order on one of the items you have in the
            cart. We'll keep it for you for
            <span className="text-white font-bold"> 0:00 </span> min utes.
          </p>
        </div>

        <div className="w-[85%] h-[full] ml-[5%] mt-8 flex lg:flex-row flex-col">
          <div className="lg:w-[70%] w-[100%] h-[100%]">
            <div className="w-[90%]  overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs  text-[#999999] border-b ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
                    >
                      Dicount Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10">
                        <div className="flex justify-center">
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  ) : cartItems?.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-gray-500 text-lg py-10"
                      >
                        No products available in the cart.
                      </td>
                    </tr>
                  ) : (
                    cartItems?.map((product) => (
                      <tr key={product.id} className="bg-white border-b">
                        <td className="px-6 mr-20 py-4 flex items-center">
                          <img
                            src={`${API_URL}${product.product.imageUrls[0]}`}
                            alt={product.name}
                            className="w-12 h-12 leading-[20px] mr-4 rounded"
                          />
                          <span className="text-[16px] text-[#333333] font-Poppins">
                            {product.product.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#212529] font-Poppins text-[14px] font-light">
                          {product.product.discountedPrice?.toFixed(0)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-[70%] border items-center px-4 flex justify-center">
                            <button
                              onClick={() =>
                                decrementQuantity(
                                  product.product?._id,
                                  product?.quantity
                                )
                              }
                              className="px-3 py-2 text-[24px] rounded-l-md hover:bg-gray-300 transition duration-200"
                            >
                              <Icon
                                icon="line-md:minus"
                                className="text-[20px]"
                              />
                            </button>

                            <span className="px-4 text-lg">
                              {product.quantity}
                            </span>

                            <button
                              onClick={() =>
                                incrementQuantity(
                                  product.product?._id,
                                  product?.quantity
                                )
                              }
                              className="px-4 py-2 rounded-r-md hover:bg-gray-300 transition duration-200"
                            >
                              <Icon
                                icon="line-md:plus"
                                className="text-[20px]"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#5EC1A1] text-[16px] leading-[29.76px] font-Poppins">
                          {product.totalPrice?.toFixed(0)}
                        </td>
                        <td
                          className="px-6 py-4 text-red-500 cursor-pointer"
                          onClick={() => handleDelete(product.product?._id)}
                        >
                          <Icon
                            icon="mdi:close"
                            className="text-[16px] leading-[29.76px] font-Poppins"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <textarea
                name=""
                id=""
                className="w-[98%] outline-none resize-none border px-4 py-2 transition duration-500 border-2 focus:border-[#5EC1A1] "
                placeholder="Special Instructions for Seller"
                rows={6}
              ></textarea>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Your Code here"
                  className="outline-none  py-1 px-2 border-2 focus:border-[#5EC1A1]  w-full sm:w-auto"
                />
                <button className="bg-[#5EC1A1] text-white mt-2 sm:mt-0 sm:ml-2 px-4 py-1">
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-[30%] w-[100%] h-full bg-[#F9F9F9] border-2 border-dotted  lg:mt-0 mt-6">
            <h2 className="w-[80%] mx-auto   text-[#333333] font-Poppins leading-[17px]  py-5 font-bold border-b-2">
              Cart Total
            </h2>
            <div className="w-[80%] mx-auto ">
              <h2
                className=" text-[#333333]  leading-[17px]  py-5 font-bold border-b-2 flex justify-between 
             leading font-Poppins"
              >
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-[16px] text-[#111111] font-Poppins font-bold">
                  {cartTotal}
                </span>
              </h2>
              <h3 className="text-[#212529] py-5 font-Poppins text-[16px]">
                Shipping
              </h3>
              <div className="flex justify-between">
                <div className="flex">
                  <input
                    type="radio"
                    checked
                    className="bg-green-900 border-green-500"
                  />
                  <h4 className="px-4 font-Poppins text-gray-600 text-[16px]">
                    Standard
                  </h4>
                </div>
                <h6 className="font-Poppins text-gray-600 text-[16px]">
                  $15.70
                </h6>
              </div>
              <div className="flex flex-col">
                <h5 className="text-[16px] font-Poppins text-[#212529] mt-4">
                  Estimate for Your Country
                </h5>
                <h6 className="text-[14px] text-[#212529] -leading-[28px] font-Poppins">
                  71500, Pakistan
                </h6>
                <span className="text-[14px] font-Poppins underline text-gray-600 mt-2 hover:text-[#5EC1A1] cursor-pointer">
                  Change address
                </span>
              </div>

              <hr className="border-[2px] mt-4" />
              <div className="flex justify-between mt-5">
                <h2 className="text-[16px] font-Poppins text-[#5EC1A1]">
                  Total
                </h2>
                <h5 className="text-[16px] font-Poppins text-[#5EC1A1]">
                  {cartTotal}
                </h5>
              </div>
              <p className="leading-[26px]  text-[14px] italic	 font-Poppins font-light mt-4 text-gray-600">
                Taxes and Shipping calculated at checkout
              </p>
              <Box sx={{ width: "100%", marginTop: "5%" }}>
                <LinearProgress
                  variant="buffer"
                  value={progress}
                  valueBuffer={buffer}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#5DBF9F", // Color for the progress
                    },
                    "& .MuiLinearProgress-barBuffer": {
                      backgroundColor: "orange", // Color for the buffer
                    },
                    backgroundColor: "lightgray", // Color for the track
                  }}
                />
              </Box>

              <p className="leading-[26px]  text-[14px]  font-Poppins font-light mt-4 text-gray-600">
                Congratulations! You've got free shipping!
              </p>
              <div className="mt-2 gap-2 flex">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="cursor-pointer"
                />
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
              <button
                onClick={CheckOut}
                className="w-full mb-6 mt-4  bg-[#5EC1A1] hover:bg-[#6fc7ab] text-white px-2 py-2"
              >
                Process To checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Products />
      <div className="mt-24">
        <Footer />
      </div>
    </>
  );
}
