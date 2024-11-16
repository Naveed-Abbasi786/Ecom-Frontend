import React, { useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Img1 from "../assets/img/img1.png";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const handleDropdownToggle = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Health & Beauty",
    "Toys",
    "Automotive",
    "Books",
  ];
  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <header className="lg:block hidden text-colorWhite">
      <div className="flex  justify-between items-center relative p-4 max-w-screen-xl mx-auto">
        <div
            onClick={toggleCategories}
             className="relative w-[23%] py-3 justify-center gap-2 cursor-pointer flex hover:bg-[#5EC1A1] hover:text-white items-center">
          {/* Icon toggle */}
          {showCategories ? <IoClose size={24} /> : <FaBars size={24} />}

          <button
            className="text-xl font-bold flex items-center"
        
          >
            Browse Categories
          </button>
          {showCategories && (
            <div className="absolute z-50 top-full left-0 bg-white text-black p-2 shadow-md mt-2 w-full">
              {console.log("Dropdown is visible")}
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {category}
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
          {["Home", "Pages", "Shop", "Products", "Blogs"].map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onMouseEnter={() => handleDropdownToggle(item)}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <div className="flex items-center space-x-2">
                <span>{item}</span>
                {item !== "Home" && item !== "Blogs" && (
                  <FaChevronDown
                    className={`transition-transform duration-200 ${
                      activeDropdown === item ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {/* Dropdown Menu */}
              {item !== "Home" && activeDropdown === item && (
                <div className="absolute -left-[150%] top-[6vh] left-0 z-50 bg-white text-black shadow-lg p-4 transition-opacity duration-300">
                  {item === "Shop" ? (
                    <div className="w-[43vw] flex flex-row gap-4">
                      <ul className="text-sm space-y-1">
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 4 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 2 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Market
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Fullwidth No Sidebar
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 2 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Market
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Fullwidth No Sidebar
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 2 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Market
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Fullwidth No Sidebar
                        </li>
                      </ul>
                      <ul className="text-sm space-y-1">
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 4 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Grid 2 Columns
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Market
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Shop Fullwidth No Sidebar
                        </li>
                      </ul>
                      <div className="border h-[20%]">
                        <img
                          src={Img1}
                          alt=""
                          className="w-auto h-[50vh] object-cover"
                        />
                      </div>
                    </div>
                  ) : item === "Products" ? (
                    <div className="w-[10vw] flex flex-col space-y-2">
                      <p className="font-semibold text-gray-700">
                        Product Details
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Default
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Gallery
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Sticky Info
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Product Video
                        </li>
                      </ul>
                    </div>
                  ) : item === "Pages" ? (
                    <div className="w-[10vw] flex flex-col space-y-2">
                      <p className="font-semibold text-gray-700">
                        Helpful Pages
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          About Us
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          Contact Us
                        </li>
                        <li className="text-gray-400 hover:text-gray-600 py-1 Font-Poppins">
                          FAQ
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}
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
                          className={`transition-transform ${
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
