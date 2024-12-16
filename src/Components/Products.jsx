import React, { useContext, useEffect, useState } from "react";
import separator from "../assets/img/separator.png";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/Context";

export default function Products() {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { addToCart, addToWishlist, user, token } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/cat/products`, {
        params: {
          page,
          limit,
        },
      });
      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );
      console.log("API Response:", response.data);
      setProducts(activeProducts || []);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    const productQuantity = 1;
    addToCart(product, user._id, productQuantity);
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

    addToWishlist(updatedProduct, user._id);
  };

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
        {products.map((product, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => handleProductClick(product._id)}
          >
            <div className="lg:w-[100%] md:w-[100%] h-[60vh] cursor-pointer flex flex-col">
              <div className="w-full relative h-[100%] bg-[#F1F3F5] group overflow-hidden">
                <div className="group relative w-full h-full">
                  <img
                    src={`${API_URL}${product.imageUrls[0]}`}
                    alt="Product Image"
                    className="w-full h-full object-contain transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={`${API_URL}${product.imageUrls[1]}`}
                    alt="Product Image"
                    className="w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
                  />
                </div>
                {product.discount && !loading && (
                  <div
                    className={`${
                      product.discount > "10" ? "bg-[#E73C2F]" : "bg-[#5EC1A1]"
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
                        onClick={(event) => handleAddToWhislist(product, event)}
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
              <div className="h-[15%] mt-2">
                <span className="block text-[16px] font-Poppins text-[#222222] font-semibold">
                  {product.name}
                </span>
                <span className="block text-[16px] font-Poppins text-gray-700 font-semibold">
                  $ {product.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
