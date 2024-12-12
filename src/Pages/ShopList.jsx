import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  InputAdornment,
  LinearProgress,
  Pagination,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import "tailwindcss/tailwind.css";
import Empty from "../assets/img/out-of-stock.png";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ProductPic from "../assets/img/pro1.jpg";
import ProductPicHover from "../assets/img/pro2.jpg";
import { CartContext } from "../Context/Context";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import useDebounce from "../Hook/useDebounce";

const ShopList = () => {
  const { token, userId } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [gridColumns, setGridColumns] = useState(4);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedSubCategories, setCheckedSubCategories] = useState({});
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // const hasRunRef = useRef(false);

  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const categoryId = searchParams.get("category");

    if (categoryId) {
      setSelectedCategoryId(categoryId);
      setIsCategoryLoaded(true);
      setProducts([]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isCategoryLoaded) {
      setCheckedCategories({
        [selectedCategoryId]: true,
      });
      if (selectedCategoryId) {
        setProducts([]);
        hanldeFilterdProducts();
      }
    }
  }, [selectedCategoryId, isCategoryLoaded]);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetchProducts = async () => {
    if (selectedCategoryId) return;
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
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProducts();
    }
  }, [page]);

  const searchDebounced = useDebounce(searchTerm, 1000);

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/cat/products/filter-products`,
        {
          params: {
            name: searchDebounced,
          },
        }
      );
      setProducts(response.data.products || []);
    } catch (error) {
      setProducts([]);
      console.error("Error searching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.log("Debounced Search Term:", searchDebounced);

    // Check if the search term length is 0
    if (searchDebounced.length === 0) {
      console.log("Input is empty, not fetching data.");
      return;
    }

    searchProducts();
  }, [searchDebounced]);

  const filterValidCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/cat/categories`);
      const fetchedCategories = response.data.categories;
      setCategories(fetchedCategories);
      console.log(categories);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterValidCategories();
  }, []);

  const handleCategoryClick = (id) => {
    setCheckedCategories({
      [id]: true,
    });
    setSelectedCategoryId(id);

    setProducts([]);
    hanldeFilterdProducts();
  };

  const handleSubCategoryClick = (id) => {
    setCheckedSubCategories({
      [id]: true,
    });
    setSelectedSubCategoryId(id);

    setProducts([]);
    hanldeFilterdSubCategoryProducts(id);
  };

  const filterValidSubCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/cat/category/subcategories`,
        { categoryId: selectedCategoryId }
      );
      const fetchedCategories = response.data.subcategories;
      setSubCategory(fetchedCategories);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      filterValidSubCategories();
    }
  }, [selectedCategoryId]);
  useEffect(() => {
    hanldeFilterdProducts();
  }, [selectedCategoryId]);
  const hanldeFilterdProducts = async () => {
    if (!selectedCategoryId) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/cat/products/category`,
        {
          categoryId: selectedCategoryId,
        }
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

  const hanldeFilterdSubCategoryProducts = async (_id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/cat/products/subcategory`,
        { subCategoryId: _id }
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

  const InStock = async (_id) => {
    const outOfStock = false;
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/cat/products/filter-products`,
        {
          params: {
            outOfStock,
          },
        }
      );
      console.log("API Response:", response.data);

      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );

      setProducts(activeProducts || []);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const OutOfStock = async (_id) => {
    const outOfStock = true;
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/cat/products/filter-products`,
        {
          params: {
            outOfStock,
          },
        }
      );
      console.log("API Response:", response.data);

      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );

      setProducts(activeProducts || []);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const ClearAll = () => {
    fetchProducts();
    setProducts([]);
    setSelectedFilter("");
    setCheckedCategories("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedSubCategoryId("");
    setSelectedCategoryId("");
    setSubCategory([]);
    setSearchTerm("");
  };

  const handleSort = (sortType) => {
    const sortedProducts = [...products];
    if (sortType === "A-Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "Z-A") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const handleGridChange = (columns) => {
    setGridColumns(columns);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const debouncedMinPrice = useDebounce(minPrice, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  const hanldeMinChnage = (e) => {
    setMinPrice(e.target.value);
  };
  const hanldeMaxChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const PriceFilter = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/cat/products`, {
        params: {
          page,
          limit,
          minPrice: debouncedMinPrice,
          maxPrice: debouncedMaxPrice,
        },
      });
      const activeProducts = response?.data.products.filter(
        (product) => !product.isDeleted && product.isPublic
      );
      console.log("API Response:", response.data);
      setProducts(activeProducts || []);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PriceFilter();
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const handleFilterClick = (filterType) => {
    if (selectedFilter === filterType) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filterType);
    }

    if (filterType === "inStock") {
      InStock();
    } else if (filterType === "outOfStock") {
      OutOfStock();
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-[30vh] bg-[#F6F6F6] flex justify-center items-center">
        <div>
          <h1 className="font-Poppins text-[#333333] text-[40px] leading-[44px] tracking-[1]">
            Shop List
          </h1>
          <h4 className="font-Poppins text-[#5EC1A1] text-center text-[20px] -tracking-[1]">
            Shop
          </h4>
        </div>
      </div>
      <div className="w-[97%] ml-[2%]  mb-10 mt-5 min-h-screen flex lg:flex-row flex-col">
        {/* Sidebar Filters */}

        <div className="lg:w-[20%] w-[100%] lg:p-0  p-4  border-r mt-5">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-[#666666] mb-4">
              Filters
            </h2>
            <h2
              onClick={ClearAll}
              className="text-lg font-semibold text-[#5EC1A1] hover:opacity-50 mb-4 mr-2 cursor-pointer"
            >
              Clear All
            </h2>
          </div>
          <div className="lg:w-60 w-full flex items-center">
            <Icon
              icon="mdi:magnify"
              className="text-gray-500 text-[23px] mt-2 ml-1"
            />
            <input
              placeholder="Search"
              className="outline-none border-none p-2 text-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-4 border-t">
            <h3 className="text-lg font-semibold mb-2 font-Poppins mt-4 text-[#333333]">
              Category
            </h3>

            {categories.map((val, idx) => (
              <div
                onClick={() => handleCategoryClick(val._id)}
                key={idx}
                className="flex justify-between items-center mb-4  whitespace-nowrap mt-5 cursor-pointer mr-4"
              >
                <label className="block  text-[#848484]">
                  <input
                    type="checkbox"
                    checked={checkedCategories[val._id] || false}
                    className="mr-2"
                  />
                  {val.name}
                </label>
                <span className="text-[#848484]">(9)</span>
              </div>
            ))}
          </div>

          <>
            <>
              <div className="mb-4 border-t">
                <h3 className="text-lg font-semibold mb-2 font-Poppins mt-4 text-[#333333]">
                  Sub Category
                </h3>

                {subCategory.map((val, idx) => (
                  <div
                    onClick={() => handleSubCategoryClick(val._id)}
                    key={idx}
                    className="flex justify-between items-center mb-4  whitespace-nowrap mt-5 cursor-pointer mr-4"
                  >
                    <label className="block  text-[#848484]">
                      <input
                        type="checkbox"
                        checked={checkedSubCategories[val._id] || false}
                        className="mr-2"
                      />
                      {val.name}
                    </label>
                    <span className="text-[#848484]">(9)</span>
                  </div>
                ))}
              </div>
            </>
          </>

          <div className="mb-4  border-t">
            <h3 className="text-lg font-semibold mb-2 font-Poppins mt-3 text-[#333333]">
              Availability
            </h3>

            <div
              onClick={(e) => {
                e.preventDefault();
                handleFilterClick("inStock");
              }}
              className="flex cursor-pointer justify-between items-center mb-4 mr-4"
            >
              <label className="block text-[#848484] cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedFilter === "inStock"} // Check agar selectedFilter "inStock" ho
                  onChange={(e) => e.preventDefault()}
                />
                In Stock
              </label>
              <span className="text-[#848484]">(9)</span>
            </div>

            {/* Out of Stock */}
            <div
              onClick={(e) => {
                e.preventDefault();
                handleFilterClick("outOfStock");
              }}
              className="flex cursor-pointer justify-between items-center mb-4 mr-4"
            >
              <label className="block text-[#848484] cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedFilter === "outOfStock"} // Check agar selectedFilter "outOfStock" ho
                  onChange={(e) => e.preventDefault()}
                />
                Out of Stock
              </label>
              <span className="text-[#848484]">(9)</span>
            </div>
          </div>

          <div className="mb-4  border-t">
            <h3 className="text-lg font-semibold mb-2 font-Poppins mt-3 text-[#333333]">
              Price
            </h3>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                label="Min Price"
                id="outlined-start-adornment-min"
                sx={{ m: 1, flex: 1 }}
                value={minPrice}
                onChange={(e) => hanldeMinChnage(e)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">Min</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Max price"
                id="outlined-start-adornment-max"
                sx={{ m: 1, flex: 1 }}
                value={maxPrice}
                onChange={(e) => hanldeMaxChange(e)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">Max</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </div>
        </div>

        <div className="lg:w-3/4 w-full">
          {/* Products Section */}
          <div className="lg:w-full w-[full]  min-h-[100vh] h-auto  ml-4 mt-6">
            {/* Sorting and Grid Controls */}
            <div className="flex justify-between mb-4 ">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="p-2 border rounded border-[#848484] outline-none text-[#848484] "
              >
                <option value="">Sort By</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <select
                onChange={(e) => handleGridChange(parseInt(e.target.value))}
                className="p-2 border rounded lg:flex hidden border-[#848484] outline-none text-[#848484] "
              >
                <option value={4}>4 Columns</option>
                <option value={2}>2 Columns</option>
              </select>
            </div>
            {loading && <LinearProgress />}
            {/* Products Grid */}
            <div
              className={`grid grid-cols-1 gap-6 ${
                gridColumns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"
              }`}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    onClick={() => handleProductClick(product._id)}
                    key={product._id}
                    className="border bg-white cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {/* Product Image Section */}
                    <div className="group relative overflow-hidden rounded-md">
                      <img
                        src={`${API_URL}${product.imageUrls[0]}`}
                        alt={product.name}
                        className="w-full h-60 object-contain transition-opacity duration-500 block group-hover:opacity-0"
                      />
                      <img
                        src={`${API_URL}${product.imageUrls[1]}`}
                        alt={product.name}
                        className="w-full h-60 object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
                      />

                      {/* Hover Actions */}
                      <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-black via-transparent to-transparent opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex gap-4 mb-3  rounded-lg">
                          {/* Heart Icon */}
                          <span className="flex items-center justify-center bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-[#5EC1A1] transition duration-300 cursor-pointer">
                            <Icon icon="mdi-light:heart" className="text-xl" />
                          </span>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="text-[12px] text-white font-semibold bg-[#3e3e3c] hover:bg-[#5EC1A1] transition duration-300 px-2 py-0 rounded-lg flex items-center justify-center"
                          >
                            Add to Cart
                          </button>

                          {/* Search Icon */}
                          <span className="flex items-center justify-center bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-[#5EC1A1] transition duration-300 cursor-pointer">
                            <Icon icon="line-md:search" className="text-xl" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h4>
                        <p className="text-md font-medium text-[#374151]">
                          ${product.price}
                        </p>
                      </div>
                      <p
                        className={`mt-1 text-sm font-medium ${
                          product.quantity >= 1
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.quantity >= 1 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="w-[1000px] h-[90vh] flex justify-center items-center">
                    <img
                      src={Empty}
                      className="w-[150px] h-[150px] mx-auto object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full flex justify-end">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopList;
