import React, { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";
import { Badge } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Dailog from "./Modal";
import { useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useCart } from "../Context/Context";
export default function MainNavbar() {
  const { cartItems } = useCart(); 

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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

  const SearchData = [
    { Name: "Table" },
    { Name: "Electronics" },
    { Name: "LED" },
    { Name: "White" },
    { Name: "Wea" },
    { Name: "Weewa" },
    { Name: "Black" },
  ];

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isInvalidSearch, setIsInvalidSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setLoading(true);
    setIsInvalidSearch(false);

    setTimeout(() => {
      const results = SearchData.filter((item) =>
        item.Name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
      setShowResults(results.length > 0);
      setLoading(false);
    }, 500);
  };

  const handleSearchClick = () => {
    const results = SearchData.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (results.length > 0) {
      setFilteredResults(results);
      setShowResults(true);
      setIsInvalidSearch(false);
    } else {
      setFilteredResults([]);
      setShowResults(true);
      setIsInvalidSearch(true);
    }
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
    <div className="w-full py-4 bg-sky-00 flex flex-col justify-between items-center">
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

          <div className="w-[40%] lg:flex hidden bg-[#F8F8F8] items-center border relative">
            <input
              type="text"
              placeholder="Search in..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() =>
                setShowResults(
                  searchQuery.length > 0 && filteredResults.length > 0
                )
              }
              className="w-[70%] h-full bg-transparent font-Poppins outline-none px-4"
            />
            <span className="text-gray-200 -mt-2">|</span>

            <div className="w-[50%] bg-gray-00">
              <Menu>
                <MenuButton className="inline-flex gap-2 items-center text-[14px] cursor-pointer uppercase py-3 px-5 font-Poppins text-gray-400 bg-transparent">
                  {selectedDepartment}
                  <ChevronDownIcon className="h-4 w-4 fill-gray-400 cursor-pointer" />
                </MenuButton>
                <MenuItems className="absolute z-20 mt-2 w-48 bg-white shadow-lg rounded-md py-1 text-gray-600 focus:outline-none">
                  {Departments.map((val, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={() => handleDepartmentSelect(val.Name)}
                    >
                      {({ active }) => (
                        <span
                          className={`block px-4 ${
                            idx === 0 ? "bg-gray-100" : "bg-transparent"
                          } hover:bg-gray-100 py-2 text-sm uppercase font-Poppins cursor-pointer ${
                            active
                              ? "text-[#1cc0a0] underline"
                              : "text-gray-400"
                          }`}
                        >
                          {val.Name}
                        </span>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            <button
              className="w-[15%] h-full flex items-center justify-center bg-[#5EC1A1]"
              onClick={handleSearchClick}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Icon icon="line-md:search" className="text-3xl text-white" />
              )}
            </button>
          </div>

          <div className="lg:mr-20 mr-5 flex flex-row items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden flex flex-z">
              <Icon icon="mdi:menu" className="text-3xl text-gray-600" />
            </button>
            <Dailog />
            <div className="flex flex-col items-center">
              <Badge
                badgeContent={4}
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
                  badgeContent={cartItems.length}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent font-Poppins outline-none text-gray-700  px-2"
          />
          <button
            className="bg-[#5EC1A1] p-2 rounded-md"
            onClick={handleSearchClick}
          >
            <Icon icon="line-md:search" className="text-xl text-white" />
          </button>
        </div>

        {/* Sidebar Menu with Dropdowns */}
        <div className="mt-6">
          {/* Categories Dropdown */}
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <span className="text-gray-700 font-semibold">Categories</span>
            <Icon
              icon={isCategoriesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-gray-500"
            />
          </div>
          {isCategoriesOpen && (
            <div className="pl-8 text-gray-600 space-y-2">
              {Departments.map((category, idx) => (
                <div
                  key={idx}
                  className="py-1 cursor-pointer hover:text-[#1cc0a0]"
                >
                  {category.Name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="w-[40%] left-[29.6%]  lg:flex hidden absolute bg-white shadow-lg mt-12 rounded-lg z-10">
            <ul className="w-full">
              {loading ? (
                <li className="text-gray-500 text-center">Loading...</li>
              ) : isInvalidSearch ? (
                <li className="text-gray-500 text-center">No results found</li>
              ) : (
                filteredResults.map((result, index) => (
                  <li
                    key={index}
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {result.Name}
                  </li>
                ))
              )}
            </ul>
        </div>
      )}
    </div>
  );
}
