import React, { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/Context";
import toast, { Toaster } from "react-hot-toast";
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Wishlist = () => {
  const { wishlistProducts,userId, fetchWishlistProducts,addToWishlist } = useContext(CartContext);

  const handleDelete = async () => {
    try {
      addToWishlist(wishlistProducts,userId)
    } 
    catch (error) {
      
      toast.error(error)
    }
    finally{
      fetchWishlistProducts()
    }
  };

  // useEffect(() => {
  //   if (wishlistProducts.length > 0) {
  //     setLoading(false);
  //   }
  // }, [wishlistProducts]);

  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full h-[30vh] bg-[#F6F6F6] flex justify-center items-center">
        <div>
          <h1 className="font-Poppins text-[#333333] text-[40px] leading-[44px] tracking-[1]">
            Wishlist
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
          <Link to="/wishlist"> Wishlist</Link>
        </span>
        <Icon
          icon="iconamoon:arrow-right-2-thin"
          className="text-[20px] font-Poppins text-[#222] cursor-pointer"
        />
      </div>

      <div className="w-[90%] ml-[5%] mb-10 mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 border-b">
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
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-[14px] leading-[21px] font-Poppins"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlistProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 text-lg py-10"
                >
                  No products available in the wishlist.
                </td>
              </tr>
            ) : (
              wishlistProducts.map((product) => (
                <tr key={product.id} className="bg-white border-b">
                  <td className="px-6 py-4 flex items-center">
                    <img
                      src={`http://192.168.100.155:4000${product.imageUrls[0]}`}
                      alt={product.name}
                      className="w-12 h-12 leading-[20px] mr-4 rounded"
                    />
                    <span className="text-[16px] text-[#333333] font-Poppins">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#212529] font-Poppins text-[14px] font-light">
                    ${product.discountedPrice}
                  </td>
                  <td className="px-6 py-4 text-[#5EC1A1] text-[16px] leading-[29.76px] font-Poppins">
                    {product.quantity > 1 ? "Available" : "Out of Stock"}
                  </td>
                  <td
                    className="px-6 py-4 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(product.id)}
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

      <Footer />
    </>
  );
};

export default Wishlist;
