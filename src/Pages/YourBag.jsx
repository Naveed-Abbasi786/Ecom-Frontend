import React, { useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
export default function ShopingCart() {
  const [progress, setProgress] = React.useState(100);
  const [buffer, setBuffer] = React.useState(10);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/50",
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/50",
      price: 150,
      quantity: 1,
    },
  ]);

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



  const handleQuantityChange = (id, type) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                type === "increase"
                  ? product.quantity + 1
                  : product.quantity - 1,
            }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <>
      <Header />
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
          <Icon icon="proicons:info" className="ml-3 text-white text-white" />
          <p className="text-white text-[14px] font-Poppins font-normal leading-[24px]">
            Someone has placed an order on one of the items you have in the
            cart. We'll keep it for you for
            <span className="text-white font-bold"> 0:00 </span> min utes.
          </p>
        </div>

        <div className="w-[85%] h-[110vh] ml-[5%] mt-8 flex">
          <div className="w-[70%] h-[100%]">
            <div>
              <table className="w-[98%]  text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 text-[#999999] border-b ">
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
                  {products.map((product) => (
                    <tr key={product.id} className="bg-white border-b">
                      <td className="px-6 mr-20 py-4 flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 leading-[20px] mr-4 rounded"
                        />
                        <span className=" text-[16px] text-[#333333] font-Poppins">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#212529] font-Poppins text-[14px] font-light">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-[70%] border items-center flex justify-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(product.id, "decrease")
                            }
                            className="px-3 py-2 text-[24px]  rounded-l-md hover:bg-gray-300 transition duration-200"
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
                              handleQuantityChange(product.id, "increase")
                            }
                            className="px-3 py-2 rounded-r-md hover:bg-gray-300 transition duration-200"
                          >
                            <Icon icon="line-md:plus" className="text-[20px]" />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[#5EC1A1] text-[16px] leading-[29.76px] font-Poppins">
                        {product.price * product.quantity}
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <textarea
                name=""
                id=""
                className="outline-none resize-none border px-4 py-2 transition duration-500 border-2 focus:border-[#5EC1A1] "
                placeholder="Special Instructions for Seller"
                cols={100}
                rows={6}
              ></textarea>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Your Code here"
                  className="outline-none border py-1 px-2 border-2 focus:border-[#5EC1A1]  w-full sm:w-auto"
                />
                <button className="bg-[#5EC1A1] text-white mt-2 sm:mt-0 sm:ml-2 px-4 py-1">
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="w-[30%] h-[100vh] bg-[#F9F9F9] border-2 border-dotted ">
            <h2 className="w-[80%] mx-auto  font-Poppins text-[#333333] font-Poppins leading-[17px]  py-5 font-bold border-b-2">
              Cart Total
            </h2>
            <div className="w-[80%] mx-auto ">
                <h2 className=" text-[#333333] font-Poppins leading-[17px]  py-5 font-bold border-b-2 flex justify-between 
             leading font-Poppins">
              <span className="text-gray-600">
              Subtotal: 
              </span>
            <span className="text-[16px] text-[#111111] font-Poppins font-bold">$929.00</span>
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
     <h4 className="px-4 font-Poppins text-gray-600 text-[16px]">Standard</h4>
  </div>
     <h6 className="font-Poppins text-gray-600 text-[16px]">$15.70</h6>
</div>
<div className="flex flex-col">
  <h5 className="text-[16px] font-Poppins text-[#212529] mt-4">
    Estimate for Your Country
  </h5>
  <h6 className="text-[14px] text-[#212529] -leading-[28px] font-Poppins">
    71500, Pakistan
  </h6>
  <span className="text-[14px] font-Poppins underline text-gray-600 mt-2 hover:text-[#5EC1A1] cursor-pointer">Change address</span>
</div>

<hr  className="border-[2px] mt-4"/>
  <div className="flex justify-between mt-5">
    <h2 className="text-[16px] font-Poppins text-[#5EC1A1]">Total</h2>
    <h5 className="text-[16px] font-Poppins text-[#5EC1A1]">$944.70</h5>
  </div>
  <p className="leading-[26px]  text-[14px] italic	 font-Poppins font-light mt-4 text-gray-600">Taxes and Shipping calculated at checkout</p>
  <Box sx={{ width: '100%', marginTop: '5%' }}>
  <LinearProgress
    variant="buffer"
    value={progress}
    valueBuffer={buffer}
    sx={{
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#5DBF9F', // Color for the progress
      },
      '& .MuiLinearProgress-barBuffer': {
        backgroundColor: 'orange', // Color for the buffer
      },
      backgroundColor: 'lightgray', // Color for the track
    }}
  />
</Box>

<p className="leading-[26px]  text-[14px]  font-Poppins font-light mt-4 text-gray-600">Congratulations! You've got free shipping!</p>
<div className="mt-2 gap-2 flex">
            <input type="checkbox" name="" id="" className="cursor-pointer" />
            <span className="text-[#666666] font-Poppins text-[14px]">
              I accept the <span className="text-blue-500 cursor-pointer hover:text-blue-400 hover:underline">Terms</span> /{" "}
              <span className="text-blue-500 cursor-pointer hover:text-blue-400 hover:underline">Privacy Policy.</span>
            </span>
          </div>
          <button className="w-full mt-2 bg-[#5EC1A1] hover:bg-[#6fc7ab] text-white px-2 py-2">Process To checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
