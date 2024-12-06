import { Icon } from "@iconify/react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  CardFooter,
} from "@material-tailwind/react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const TABLE_HEAD = [
  "Product Name",
  "Customer Name",
  "City & State",
  "Address",
  "Price",
  "Payment Method",
  "Status",
];

export default function Orders() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrders, setSortOrders] = useState({ name: "asc", price: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const itemsPerPage = 5;

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/auth/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserEmail(response.data.email || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const response = await axios.post(
          `${API_URL}/api/checkout/user-orders`,
          { email: userEmail }
        );

        const orders = response.data.data || [];
        setAllProducts(orders);
        setFilteredProducts(orders.slice(0, itemsPerPage));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const filtered = allProducts.filter((product) =>
      product.products?.[0]?.productId?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(
      viewAll ? filtered : filtered.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [searchTerm, currentPage, allProducts, viewAll]);

  const sortProducts = (column) => {
    const newSortOrder = sortOrders[column] === "asc" ? "desc" : "asc";
    const sorted = [...allProducts].sort((a, b) => {
      if (column === "price") {
        return newSortOrder === "asc"
          ? +a.products[0].productId[column] - +b.products[0].productId[column]
          : +b.products[0].productId[column] - +a.products[0].productId[column];
      }
      return newSortOrder === "asc"
        ? a.products[0].productId[column].localeCompare(
            b.products[0].productId[column]
          )
        : b.products[0].productId[column].localeCompare(
            a.products[0].productId[column]
          );
    });

    setFilteredProducts(sorted.slice(0, itemsPerPage));
    setSortOrders((prev) => ({ ...prev, [column]: newSortOrder }));
  };

  return (
    <div className="w-full flex bg-transparent flex-col items-center">
      <Card className="w-full shadow-none bg-transparent max-w-[100%]">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-transparent flex justify-between items-center"
        >
          <div className="relative  w-72 ml-2">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Icon icon="mdi:magnify" className="text-gray-500" />
            </div>
            <input
              className="peer h-full w-full pl-10 rounded-[7px] border border-blue-gray-200 px-3 py-2.5 text-sm font-normal text-blue-gray-700 placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Icon
              icon={
                sortOrders.name === "asc"
                  ? "mdi:sort-ascending"
                  : "mdi:sort-descending"
              }
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={() => sortProducts("name")}
            />
          </div>
        </CardHeader>

        <CardBody className="overflow-auto px-0 h-[400px]">
          <table className="mt-4 w-full  text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 font-normal"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                    <CircularProgress />
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((order, index) => {
                  const product = order.products?.[0]?.productId || {};
                  return (
                    <tr key={index}>
                      <td className="p-4 border-b flex items-center gap-4 border-blue-gray-50">
                        <Avatar
                          src={`${API_URL}${product.imageUrls?.[0]}`}
                          alt={product.name}
                          className="w-12 h-12"
                        />
                        {product.name}
                      </td>
                      <td className="p-4 border-b  border-blue-gray-50">
                        {order?.name || "N/A"}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {order?.city}, {order?.state}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {order?.billingAddress}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {order?.totalAmount?.toFixed(0)}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {order?.paymentMethod}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {order?.orderStatus}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>

        {!viewAll && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <button
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of{" "}
              {Math.ceil(allProducts.length / itemsPerPage)}
            </Typography>
            <button
              disabled={
                currentPage === Math.ceil(allProducts.length / itemsPerPage)
              }
              className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${
                currentPage === Math.ceil(allProducts.length / itemsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
