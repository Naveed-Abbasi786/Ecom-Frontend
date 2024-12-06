import React, { useState, useEffect } from "react";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useSort } from "@table-library/react-table-library/sort";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CategoryTable = (porps) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isViewAll, setIsViewAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const [name, setName] = useState("");
  const handleEdit = (item) => {
    setName(item.name);
    const id = item._id;
    if (editingId === id) {
      setEditMode(!editMode);
    } else {
      setEditingId(id);
      setEditMode(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}api/cat/categories`);
      setCategories(response?.data?.categories);
      setFilteredData(response?.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [porps.handleAddCategory]);

  const handleSave = async () => {
    if (uploadedFile || name) {
      setEditMode(false);
      setEditingId(null);
    }
    const categoryId = editingId;
    try {
      const resposne = await axios.put(
        `${API_URL}api/admin/category/id`,
        { categoryId, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchCategories();
      toast.success("Succefuly Update");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      console.log(token);

      const response = await axios.post(
        `${API_URL}api/admin/category/id`,
        { categoryId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
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

  const sort = useSort(
    { nodes: filteredData },
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        CATEGORY: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        CREATED_AT: (array) =>
          array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
        UPDATED_AT: (array) =>
          array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const getIcon = (sortKey) => {
    if (sort.state.sortKey === sortKey && sort.state.reverse) {
      return <KeyboardArrowDownOutlinedIcon />;
    }
    if (sort.state.sortKey === sortKey && !sort.state.reverse) {
      return <KeyboardArrowUpOutlinedIcon />;
    }
    return <UnfoldMoreOutlinedIcon />;
  };

  const handleViewAll = () => {
    setIsViewAll((prevState) => !prevState);
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

  const currentData = isViewAll
    ? filteredData
    : filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <MaterialThemeProvider theme={createMaterialTheme({})}>
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-800 font-Poppins text-[30px]">
              Category Table
            </h2>
            <div className="relative w-72 ml-2">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <Icon icon="mdi:magnify" className="text-gray-500" />
              </div>
              <input
                className="peer h-full w-full pl-10 rounded-[7px] border border-blue-gray-200 px-3 py-2.5 text-sm font-normal text-blue-gray-700 placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Table
            data={{ nodes: currentData }}
            sort={sort}
            style={{
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow
                    style={{
                      borderBottom: "2px solid #ddd",
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    <HeaderCell style={{ padding: "12px" }}>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon("CATEGORY")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "CATEGORY",
                          })
                        }
                      >
                        Category
                      </Button>
                    </HeaderCell>
                    <HeaderCell style={{ padding: "12px" }}>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon("CREATED_AT")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "CREATED_AT",
                          })
                        }
                      >
                        Created At
                      </Button>
                    </HeaderCell>
                    <HeaderCell style={{ padding: "12px" }}>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon("UPDATED_AT")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "UPDATED_AT",
                          })
                        }
                      >
                        Updated At
                      </Button>
                    </HeaderCell>
                    <HeaderCell style={{ padding: "12px" }}>Actions</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  {currentData?.length === 0 ? (
                    <div>No data available</div>
                  ) : (
                    tableList?.map((item) => (
                      <Row
                        item={item}
                        key={item.id}
                        style={{
                          borderBottom: "1px solid #ddd",
                          backgroundColor: "#fff",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f9f9f9")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#fff")
                        }
                      >
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {editMode && editingId === item._id ? (
                            // Edit Mode for the specific item
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <label
                                style={{
                                  cursor: "pointer",
                                  display: "inline-block",
                                  position: "relative",
                                }}
                              >
                                <img
                                  src={
                                    imagePreview ||
                                    `http://192.168.100.155:4000${item.image}`
                                  }
                                  alt="Category"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid #ccc",
                                  }}
                                />
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={handleImageChange}
                                />
                              </label>
                              <input
                                type="text"
                                value={name}
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  padding: "8px",
                                  fontSize: "14px",
                                  width: "100%",
                                }}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <span>
                                <Icon
                                  icon="mdi:check"
                                  className="text-[25px]"
                                  onClick={handleSave}
                                />
                              </span>
                            </div>
                          ) : (
                            // View Mode for all other items
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <img
                                src={
                                  imagePreview ||
                                  `http://192.168.100.155:4000${item?.image}`
                                }
                                alt="Category"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                              <span
                                style={{ fontWeight: "bold", fontSize: "14px" }}
                              >
                                {item.name}
                              </span>
                            </div>
                          )}
                        </Cell>

                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {/* {new Date(item.updatedAt).toLocaleDateString()} */}
                          {item.updatedAt}
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          <div className="flex gap-2">
                            <Icon
                              icon="ic:round-edit"
                              className="text-[23px] cursor-pointer text-gray-800 hover:text-red-800"
                              onClick={() => handleEdit(item)}
                            />
                            <Icon
                              icon="mdi:delete-outline"
                              className="text-[23px] cursor-pointer text-gray-800 hover:text-red-500"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div>
                        </Cell>
                      </Row>
                    ))
                  )}
                </Body>
              </>
            )}
          </Table>

          <div className="mt-4 flex justify-between items-center">
            <Button
              disabled={currentPage === 1 || isViewAll}
              onClick={handlePreviousPage}
              variant="outlined"
            >
              Previous
            </Button>
            {!isViewAll && (
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredData?.length / itemsPerPage)}
              </span>
            )}
            <Button
              disabled={
                isViewAll || currentPage * itemsPerPage >= filteredData?.length
              }
              onClick={handleNextPage}
              variant="outlined"
            >
              Next
            </Button>
            <Button onClick={handleViewAll} variant="contained" color="primary">
              {isViewAll ? "View Less" : "View All"}
            </Button>
          </div>
        </div>
      </MaterialThemeProvider>
    </>
  );
};

export default CategoryTable;
