import React, { useContext, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import separator from "../assets/img/separator.png";
import { Icon } from "@iconify/react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/Context";

export default function CollectionProducts() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Fetch products for a selected category
  const fetchProducts = async (categoryId) => {
    setLoading(true);
    setSelectedCategoryId(categoryId);
    try {
      const response = await axios.post(
        `http://192.168.100.106:4000/api/cat/products/category`,
        { categoryId }
      );

      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );

      setProducts(activeProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterValidCategories = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.106:4000/api/cat/category`
      );
  
      const fetchedCategories = response.data.slice(0, 5);
      setCategories(fetchedCategories);
  
      // Fetch data for the default selected category (index 0)
      if (fetchedCategories.length > 0) {
        const defaultCategoryId = fetchedCategories[0]._id;
        setSelectedTab(0); // Default to the first tab
        fetchProducts(defaultCategoryId); // Fetch products for the default category
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  useEffect(() => {
    filterValidCategories();
  }, []);

  const handleTabClick = (idx, categoryId) => {
    setSelectedTab(idx);
    fetchProducts(categoryId);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart(product);
    alert(`${product.name} has been added to the cart!`);
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <div>
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
            {categories.map((category, idx) => (
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
            ))}
          </TabList>

          <TabPanels>
            {loading ? (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              <div className="w-full  mt-10 flex gap-8 justify-center flex-wrap">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="lg:w-[20%] md:w-[40%]  h-[60vh] cursor-pointer flex flex-col"
                  >
                    <div className="w-full relative h-full group overflow-hidden">
                    <div className="group relative bg-gray-100 w-full h-full">
  {imageLoading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <CircularProgress />
    </div>
  )}

  {/* Default Image */}
  <img
    src={`http://192.168.100.106:4000${product.imageUrls[0]}`}
    alt="Product"
    onLoad={() => setImageLoading(false)}
    onError={() => setImageLoading(false)}
    className={`w-full h-full object-contain transition-opacity duration-500 ${
      imageLoading ? "hidden" : "block group-hover:opacity-0"
    }`}
  />

  {/* Hover Image */}
  <img
    src={`http://192.168.100.106:4000${product.imageUrls[1]}`}
    alt="Product Hover Image"
    className="w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
  />
</div>

                      {product.Status && (
                        <div
                          className={`${
                            product.Status === "Hot"
                              ? "bg-[#E73C2F]"
                              : "bg-[#5EC1A1]"
                          } absolute z-50 status top-[2%] right-[3%]`}
                        >
                          {product.Status}
                        </div>
                      )}
                      <div className="absolute top-50 bottom-0 w-full flex justify-center gap-2 items-center text-white py-2 opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        <span>
                          <Icon
                            icon="mdi-light:heart"
                            className="bg-gray-900 lg:text-[36px] text-[30px] hover:bg-[#5EC1A1] transition duration-300 py-2 cursor-pointer"
                          />
                        </span>
                        <span
                          onClick={(event) => handleAddToCart(product, event)}
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
                    </div>
                    <div className="h-[15%] mt-2">
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
