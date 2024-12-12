import React, { useCallback, useContext, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";
import { Badge } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Dailog from "../Modal";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "../CartSidebar";
import { useCart } from "../../Context/Context";
import axios from "axios";
import { CartContext } from "../../Context/Context";
export default function MainNavbar() {
  const Departments = [
    { Name: "All Departments" },
    { Name: "Fashion" },
    { Name: "- Man" },
    { Name: "- Women" },
    { Name: "Electronics" },
    { Name: "Home & Garden" },
    { Name: "- Decor" },
    { Name: "- Lighting" },
  ];
  const nav = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop-list" },
    { name: "Blogs", link: "/blog-listing" },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const { cartItems, wishlistProducts } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

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
      setProducts(activeProducts || []);
      setFilteredProducts(activeProducts || []);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    setSearchQuery("");
    navigate(`/product-detail/${productId}`);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const LogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    setIsCartSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsCartSidebarOpen(false);
  };
  return (
    <div className="w-full sticky z-40  top-0 left-0 bg-white  py-4 bg-sky-00 flex flex-col justify-between items-center">
      {/* Large screen Navbar */}
      <div className="flex justify-between w-full">
        {/* Existing Navbar Content */}
        <div className="flex justify-between w-full">
          <div className="lg:ml-20 ml-5">
            <h1
              onClick={LogoClick}
              className="text-3xl w-32 font-Poppins font-semibold text-gray-800 cursor-pointer"
            >
              <span className="text-[#1cc0a0]">C</span>astro
            </h1>
          </div>

          <div className="w-[40%]  lg:flex hidden bg-[#F8F8F8] items-center border relative">
            <input
              type="text"
              placeholder="Search in..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-[70%] h-full bg-transparent font-Poppins outline-none px-4"
            />
            <button className="w-[15%] h-full ml-24 flex items-center justify-center bg-[#5EC1A1]">
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Icon icon="line-md:search" className="text-3xl text-white" />
              )}
            </button>
          </div>

          <div className="lg:mr-20 mr-5 flex flex-row items-center gap-2">
            <button onClick={toggleSidebar} className="lg:hidden flex flex-z">
              <Icon icon="mdi:menu" className="text-3xl text-gray-600" />
            </button>
            <Dailog />
            <div
              onClick={() => navigate("/wishlist")}
              className="flex flex-col cursor-pointer items-center"
            >
              <Badge
                badgeContent={wishlistProducts?.length || 0}
                sx={{
                  "& .MuiBadge-dot": { backgroundColor: "#1cc0a0" },
                  "& .MuiBadge-standard": { backgroundColor: "#1cc0a0" },
                  color: "white",
                }}
              >
                <Icon
                  icon="mdi:heart-outline"
                  className="text-3xl bg-transparent text-gray-600"
                />
              </Badge>
              <span className="text-gray-400 font-Poppins lg:flex hidden text-[11px] ">
                Wishlist
              </span>
            </div>
            <div className="relative">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={handleCartClick}
              >
                <Badge
                  badgeContent={cartItems?.length || 0}
                  sx={{
                    "& .MuiBadge-dot": { backgroundColor: "#1cc0a0" },
                    "& .MuiBadge-standard": { backgroundColor: "#1cc0a0" },
                    color: "white",
                  }}
                >
                  <Icon
                    icon="akar-icons:cart"
                    className="text-3xl text-gray-600"
                  />
                </Badge>
                <span className="text-gray-400 font-Poppins text-center lg:flex hidden text-[11px]">
                  Cart
                </span>
              </div>

              {/* Backdrop */}
              {isCartSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
                  onClick={closeSidebar}
                ></div>
              )}

              {/* Sidebar */}
              <CartSidebar
                isOpen={isCartSidebarOpen}
                closeSidebar={closeSidebar}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleSidebar} className="p-4">
          <Icon icon="mdi:close" className="text-3xl text-gray-600" />
        </button>

        {/* Sidebar Search bar */}
        <div className="w-[90%] ml-4 flex bg-[#F8F8F8] items-center border relative py-1 px-4 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent font-Poppins outline-none text-gray-700  px-2"
          />
          <button className="bg-[#5EC1A1] p-2 rounded-md">
            <Icon icon="line-md:search" className="text-xl text-white" />
          </button>
        </div>

        {searchQuery && (
        <div className="w-[100%]  absolute bg-white shadow-lg  rounded-lg z-10">
          <ul className="w-full max-h-[300px] overflow-y-auto">
            {loading ? (
              <li className="text-gray-500 text-center py-4">Loading...</li>
            ) : filteredProducts.length === 0 ? (
              <li className="text-gray-500 text-center py-4">
                No results found
              </li>
            ) : (
              filteredProducts.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleProductClick(result._id)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                >
                  <div className="w-[60px] h-[60px] overflow-hidden rounded-md border">
                    <img
                      src={`${API_URL}${result.imageUrls[0]}`}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-700 truncate">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-500">{result.price} PKR</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}


        <div className="mt-6">
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <span className="text-gray-700 font-semibold">Pages</span>
            <Icon
              icon={isCategoriesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-gray-500"
            />
          </div>

          {isCategoriesOpen && (
            <div className="pl-8  text-gray-600 space-y-2">
              {nav.map((item, idx) => (
                <div
                  key={idx}
                  className="py-1  cursor-pointer hover:text-[#1cc0a0]"
                >
                  <Link className="w-full" to={item.link}>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="w-[40%] left-[29.6%] lg:flex hidden absolute bg-white shadow-lg mt-12 rounded-lg z-10">
          <ul className="w-full max-h-[300px] overflow-y-auto">
            {loading ? (
              <li className="text-gray-500 text-center py-4">Loading...</li>
            ) : filteredProducts.length === 0 ? (
              <li className="text-gray-500 text-center py-4">
                No results found
              </li>
            ) : (
              filteredProducts.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleProductClick(result._id)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                >
                  <div className="w-[60px] h-[60px] overflow-hidden rounded-md border">
                    <img
                      src={`${API_URL}${result.imageUrls[0]}`}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-700 truncate">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-500">{result.price} PKR</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
