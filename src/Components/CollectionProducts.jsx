import React, { useContext, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import separator from "../assets/img/separator.png";
import { Icon } from "@iconify/react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../Context/Context";
import { Toaster } from "react-hot-toast";
export default function CollectionProducts() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [porductLoading, setProductloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addToCart, addToWishlist, user, token } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const navigate = useNavigate();

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    const productQuantity = 1;
    addToCart(product, user._id, productQuantity);
  };

  const fetchProducts = async (categoryId) => {
    setProductloading(true);
    setSelectedCategoryId(categoryId);
    try {
      const response = await axios.post(`${API_URL}api/cat/products/category`, {
        categoryId,
      });

      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );
      console.log(activeProducts);
      setProducts(activeProducts);
    } catch (error) {
      setProductloading(false);
      console.error("Error fetching products:", error);
    } finally {
      setProductloading(false);
    }
  };
  const updateProductInState = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };
  const handleAddToWhislist = (product, event) => {
    event.stopPropagation();

    const updatedProduct = { ...product };

    if (updatedProduct.likedBy?.includes(user._id)) {
      updatedProduct.likedBy = updatedProduct.likedBy.filter(
        (id) => id !== user._id
      );
    } else {
      updatedProduct.likedBy = [...(updatedProduct.likedBy || []), user._id];
    }

    updateProductInState(updatedProduct);

    addToWishlist(updatedProduct, user._id, isLoggedIn);
  };

  const filterValidCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}api/cat/categories`);
      const fetchedCategories = response?.data?.categories?.slice(0, 5);
      setCategories(fetchedCategories);

      if (fetchedCategories.length > 0) {
        const defaultCategoryId = fetchedCategories[0]._id;
        setSelectedTab(0);
        fetchProducts(defaultCategoryId);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      filterValidCategories();
    }
  }, []);

  const handleTabClick = (idx, categoryId) => {
    if (categoryId !== selectedCategoryId) {
      setSelectedTab(idx);
      fetchProducts(categoryId);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="h-full mt-20">
        <h1 className="text-center text-[#222222] text-[40px] font-semibold font-Josefi">
          Our Top Collection
        </h1>
        <p className="text-center font-Poppins text-[#222222] mt-2 text-[15px]">
          There are some products that we featured for you to choose your best
        </p>
        <div className="flex justify-center mt-10">
          <img src={separator} alt="Separator" />
        </div>

        <TabGroup className="w-full mt-10">
          <TabList className="w-full mx-auto flex lg:gap-4 gap-2 overflow-x-auto justify-center">
            {loading ? (
              <h1>Loading...</h1>
            ) : categories.length > 0 ? (
              categories.map((category, idx) => (
                <Tab
                  key={category._id}
                  onClick={() => handleTabClick(idx, category._id)}
                  className={`${
                    selectedTab === idx
                      ? "border-b-2 border-black"
                      : "text-[#6b6b6b]"
                  } font-PoppinsBold font-normal capitalize py-2 text-[17px] whitespace-nowrap focus:outline-none`}
                >
                  {category.name}
                </Tab>
              ))
            ) : (
              <h1>No Available</h1>
            )}
          </TabList>

          <TabPanels>
            <div className="w-full max-h-[140vh]  h-auto overflow-y-auto  mt-10 flex gap-8 justify-center flex-wrap">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="lg:w-[20%] md:w-[40%] h-[60vh] cursor-pointer flex flex-col"
                >
                  <div className="w-full relative h-full group overflow-hidden">
                    <div
                      onClick={() => handleProductClick(product._id)}
                      className="group relative bg-gray-100 w-full h-full"
                    >
                      {porductLoading || imageLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <CircularProgress />
                        </div>
                      ) : (
                        <>
                          {/* Default Image */}
                          <img
                            src={`http://192.168.100.155:4000${product.imageUrls[0]}`}
                            alt="Product"
                            onLoad={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                            className={`w-full h-full object-contain transition-opacity duration-500 ${
                              imageLoading
                                ? "hidden"
                                : "block group-hover:opacity-0"
                            }`}
                          />
                          {/* Hover Image */}
                          <img
                            src={`http://192.168.100.155:4000${product.imageUrls[1]}`}
                            alt="Product Hover Image"
                            className="w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
                          />
                        </>
                      )}
                    </div>

                    {product.discount && !loading && (
                      <div
                        className={`${
                          product.discount > "10"
                            ? "bg-[#E73C2F]"
                            : "bg-[#5EC1A1]"
                        } absolute z-30 status top-[2%] right-[3%]`}
                      >
                        {product.discount}%
                      </div>
                    )}

                    {!loading && (
                      <div className="absolute top-50 bottom-0 w-full flex justify-center gap-2 items-center text-white py-2 opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        <span>
                          <Icon
                            icon={
                              product.likedBy?.includes(user._id)
                                ? "solar:heart-bold"
                                : "mdi-light:heart"
                            }
                            onClick={(event) =>
                              handleAddToWhislist(product, event)
                            }
                            className="bg-gray-900 lg:text-[36px] text-[30px] hover:bg-[#5EC1A1] transition duration-300 py-2 cursor-pointer"
                          />
                        </span>
                        <span
                          onClick={() => handleAddToCart(product, event)}
                          className="lg:text-[13px] text-[12px] sm:text-[15px] text-center font-semibold bg-[#3e3e3c] hover:bg-[#5EC1A1] transition duration-300 py-2 px-6 cursor-pointer"
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
                    )}
                  </div>

                  {/* Hide Name and Price While Loading */}
                  <div className={`h-[15%] mt-2 ${loading ? "hidden" : ""}`}>
                    <span className="block text-[16px] font-Poppins text-[#222222] font-semibold">
                      {product.name}
                    </span>
                    <span className="block text-[16px] font-Poppins text-gray-700 font-semibold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fallback for No Products */}
            {!loading && products.length === 0 && (
              <div className="flex justify-center items-center w-full h-full">
                <h1 className="text-gray-500">No Products Available</h1>
              </div>
            )}
          </TabPanels>
        </TabGroup>
        <div className="flex justify-center mt-10">
          <img src={separator} alt="Separator" />
        </div>
      </div>
    </div>
  );
}
