import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDropdownToggle = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const nav = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop-list" },
    { name: "Blogs", link: "/blog-listing" },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  const filterValidCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cat/categories`);
      const fetchedCategories = response?.data?.categories?.slice(0, 5);
      setCategories(fetchedCategories);

    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      filterValidCategories();
    }
  }, []);
  // const categories = [
  //   "Electronics",
  //   "Fashion",
  //   "Home & Garden",
  //   "Sports",
  //   "Health & Beauty",
  //   "Toys",
  //   "Automotive",
  //   "Books",
  // ];
  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };
  const navigate=useNavigate('')
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/shop-list?category=${category._id}`)
    setShowCategories(false); 
  };

  return (
    <header className={`lg:block hidden text-colorWhite`}>
      <div className="w-full flex ml-16  items-center relative p- max-w-screen-xl mx-auto">
      <div
      onClick={toggleCategories}
      className="relative w-[23%] py-3 justify-center gap-2 cursor-pointer flex hover:bg-[#5EC1A1] hover:text-white items-center"
    >
      {showCategories ? <IoClose size={24} /> : <FaBars size={24} />}
      <button className="text-xl whitespace-nowrap font-bold flex items-center">
        Browse Categories
      </button>
      {showCategories && (
        <div className="absolute z-50 top-full left-[0%] bg-white text-black p-2 shadow-md mt-2 w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`py-2 hover:bg-gray-100 cursor-pointer ${
                selectedCategory?._id === category._id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
              <hr />
            </div>
          ))}
        </div>
      )}
    
    </div>
        {/* Hamburger Icon for Mobile */}
        <FaBars
          className="lg:hidden cursor-pointer"
          onClick={toggleMobileMenu}
        />

        {/* Navigation Links for Desktop */}
        <nav className="hidden lg:flex justify-center space-x-8 items-center w-full">
          {nav.map((item, index) => (
            <div
              key={index}
              className="group py-4 relative cursor-pointer"
              onMouseEnter={() => handleDropdownToggle(item.name)}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <div className="flex items-center space-x-2">
                <Link to={item.link}>
                  {" "}
                  <span>{item.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-colorBlue text-white p-4 absolute top-16 left-0 w-full">
            <div className="flex flex-col items-center">
              {["Home", "Pages", "Shop", "Products", "Blogs"].map(
                (item, index) => (
                  <div key={index} className="py-1">
                    <div
                      className="flex justify-between items-center w-full cursor-pointer"
                      onClick={() => handleDropdownToggle(item)}
                    >
                      <span>{item}</span>
                      {item !== "Home" && (
                        <FaChevronDown
                          className={`transition-transform"${
                            activeDropdown === item ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Dropdown for Mobile */}
                    {item !== "Home" && activeDropdown === item && (
                      <div className="mt-2 text-sm">
                        <ul className="space-y-1">
                          {item === "Shop" ? (
                            <>
                              <li className="hover:text-gray-300">
                                Shop Grid 4 Columns
                              </li>
                              <li className="hover:text-gray-300">
                                Shop Market
                              </li>
                            </>
                          ) : item === "Products" ? (
                            <>
                              <li className="hover:text-gray-300">Default</li>
                              <li className="hover:text-gray-300">Gallery</li>
                            </>
                          ) : item === "Blogs" ? (
                            <>
                              <li className="hover:text-gray-300">
                                Latest Trends
                              </li>
                              <li className="hover:text-gray-300">
                                How-To Guides
                              </li>
                            </>
                          ) : item === "Pages" ? (
                            <>
                              <li className="hover:text-gray-300">About Us</li>
                              <li className="hover:text-gray-300">
                                Contact Us
                              </li>
                            </>
                          ) : null}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
