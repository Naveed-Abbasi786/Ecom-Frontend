import React, { useState, useEffect } from "react";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useStorageState } from "@toolpad/core/persistence";
const status = [
  { _id: "1", name: "Pending" },
  { _id: "2", name: "Processing" },
  { _id: "3", name: "Shipped" },
  { _id: "4", name: "Delivered" },
  { _id: "5", name: "Cancelled" },
];
const OrderTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [statusLoad, setStatusLoad] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(status[1]);
  const [statuss, setStaus] = useState("");
  const [isViewAll, setIsViewAll] = useState(false);

  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data);
      setFilteredData(response?.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    const filtered = categories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewAll = () => {
    setIsViewAll(true);
  };

  const currentData = isViewAll
    ? filteredData
    : filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleChange = (statusItem, itemId) => {
    console.log("Item ID:", itemId, "Selected Status:", statusItem.name);
    setSelectedId(itemId);
    setStaus(statusItem.name);
    setSelectedStatus((prevStatuses) => ({
      ...prevStatuses,
      [itemId]: statusItem,
    }));
  };
  useEffect(() => {
    const StatusChanges = async () => {
      toast.promise(
        axios.put(
          `${API_URL}/api/admin/order/status`,
          { orderId: selectedId, orderStatus: statuss },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Updating status...",
          success: "Successful status change!",
          error: (err) => err.response?.data?.message || "Something went wrong",
        }
      );
    };

    if (selectedStatus) {
      StatusChanges();
    }
  }, [selectedStatus]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mt-10">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <h2 className="text-gray-800 font-Poppins text-[24px] lg:text-[30px]">
            Orders Table
          </h2>
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-3 flex items-center">
              🔍
            </div>
            <input
              className="peer h-full w-full pl-10 rounded-[7px] border border-blue-gray-200 px-3 py-2.5 text-sm font-normal text-blue-gray-700 placeholder-shown:border focus:border-gray-900 focus:outline-none"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="min-w-[150vw] border-gray-200">
          <table className="min-w-[140vw] overflow-auto divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Products</th>
                <th className="px-4 py-2 text-nowrap text-left hidden sm:table-cell">
                  Customer Name
                </th>
                <th className="px-4  text-nowrap py-2 text-left hidden lg:table-cell">
                  Billing Address
                </th>
                <th className="px-4 py-2 text-nowrap text-left">
                  City & State
                </th>
                <th className="px-4 py-2 text-nowrap text-left hidden md:table-cell">
                  Payment Method
                </th>
                <th className="px-4 py-2 text-nowrap text-left">Price</th>
                <th className="px-4 py-2 text-nowrap text-left hidden md:table-cell">
                  Created
                </th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => {
                const product = item.products?.[0]?.productId || {};
                return (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={`${API_URL}${product.imageUrls?.[0]}`}
                          alt="Category"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-bold text-sm">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-normal overflow-hidden hidden sm:table-cell">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 whitespace-normal hidden lg:table-cell">
                      {item.billingAddress}
                    </td>
                    <td className="px-4 py-2">
                      {item.city}, {item.state}
                    </td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {item.paymentMethod}
                    </td>
                    <td className="px-4 py-2">${item.totalAmount}</td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-2">
                      <div className="relative w-[140px]">
                        <Listbox
                          key={item._id}
                          value={
                            selectedStatus[item._id] ||
                            status.find((s) => s.name === item.orderStatus)
                          } // Default to item.orderStatus
                          onChange={(statusItem) =>
                            handleChange(statusItem, item._id)
                          }
                        >
                          <Listbox.Button className="block w-full rounded-lg bg-black py-1.5 pr-8 pl-3 text-left text-sm text-white focus:outline-none hover:bg-gray-800">
                            {selectedStatus[item._id]?.name ||
                              item.orderStatus ||
                              "Select Status"}
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>

                          <Listbox.Options className="absolute z-10 mt-1 w-full rounded-lg bg-white border border-gray-300 py-1 shadow-lg">
                            {status.map((statusItem) => (
                              <Listbox.Option
                                key={statusItem._id}
                                value={statusItem}
                                className={({ active, selected }) =>
                                  `cursor-pointer select-none py-2 px-4 rounded-lg ${
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-700"
                                  } ${selected ? "font-bold bg-gray-200" : ""}`
                                }
                              >
                                {statusItem.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
          <button
            disabled={currentPage === 1 || isViewAll}
            onClick={handlePreviousPage}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Previous
          </button>
          {!isViewAll && (
            <span>
              Page {currentPage} of{" "}
              {Math.ceil(filteredData.length / itemsPerPage)}
            </span>
          )}
          <button
            disabled={
              isViewAll || currentPage * itemsPerPage >= filteredData.length
            }
            onClick={handleNextPage}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Next
          </button>
          <button
            onClick={handleViewAll}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
