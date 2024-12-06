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

const BlogListTable = (props) => {
  const [search, setSearch] = useState("");
  const [Blogs, setBlogs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isViewAll, setIsViewAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleEdit = (id) => {
    if (editingId === id) {
      setEditMode(!editMode);
    } else {
      setEditingId(id);
      setEditMode(true);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}api/admin/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
        },
      });
      setBlogs(response.data.blogs);
      setFilteredData(response.data.blogs);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [props.handleSubmit]);

  const handleSave = async (item) => {
    console.log(item);
    if (uploadedFile || name) {
      setEditMode(false);
      setEditingId(null);
    }
    try {
      await axios.put(
        `${API_URL}api/admin/subBLOG/id`,
        { BLOGId: item.BLOG, subBLOGId: item._id, name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchBlogs();
      toast.success("Succefuly Update");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const handleDelete = async (id, item) => {
    try {
      await axios.post(
        `${API_URL}api/admin/subBLOG/id`,
        { BLOGId: item.BLOG, subBLOGId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBlogs();
      toast.success("BLOG deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    const filtered = Blogs.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
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
        // Sorting by Title
        BLOG: (array) =>
          array.sort((a, b) => {
            const titleA = a.name ? String(a.name) : ""; // Convert to string if undefined/null
            const titleB = b.name ? String(b.name) : ""; // Convert to string if undefined/null
            return titleA.localeCompare(titleB); // Sort by name (Title)
          }),

        // Sorting by Author
        AUTHOR: (array) =>
          array.sort((a, b) => {
            const authorA = a.author ? String(a.author) : ""; // Convert to string if undefined/null
            const authorB = b.author ? String(b.author) : ""; // Convert to string if undefined/null
            return authorA.localeCompare(authorB); // Sort by author
          }),

        // Sorting by Created At
        CREATED_AT: (array) =>
          array.sort((a, b) => {
            const dateA = new Date(a.createdAt); // Ensure it's a date object
            const dateB = new Date(b.createdAt); // Ensure it's a date object
            return dateA - dateB; // Sort by date (createdAt)
          }),
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

  const handleToggleView = () => {
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
    : filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  return (
    <>
      <MaterialThemeProvider theme={createMaterialTheme({})}>
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-800 font-Poppins text-[30px]">
              Blogs Table
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
                        endIcon={getIcon("BLOG")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "BLOG", // Sort by Title
                          })
                        }
                      >
                        Title
                      </Button>
                    </HeaderCell>
                    <HeaderCell style={{ padding: "12px" }}>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon("AUTHOR")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "AUTHOR", // Sort by Author
                          })
                        }
                      >
                        Author
                      </Button>
                    </HeaderCell>
                    <HeaderCell style={{ padding: "12px" }}>
                      <Button
                        fullWidth
                        style={{ justifyContent: "flex-start" }}
                        endIcon={getIcon("CREATED_AT")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "CREATED_AT", // Sort by Date
                          })
                        }
                      >
                        Created At
                      </Button>
                    </HeaderCell>

                    <HeaderCell style={{ padding: "12px" }}>Actions</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  {currentData.length === 0 ? (
                    <div>No data available</div>
                  ) : (
                    tableList.map((item) => (
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
                              <input
                                type="text"
                                defaultValue={item.name}
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
                                  onClick={() => handleSave(item)}
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
                              <span
                                style={{ fontWeight: "bold", fontSize: "14px" }}
                              >
                                {item.title}
                              </span>
                            </div>
                          )}
                        </Cell>

                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          Naveed
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          <div className="flex gap-2">
                            <Icon
                              icon="ic:round-edit"
                              className="text-[23px] cursor-pointer text-gray-800 hover:text-red-800"
                              onClick={() => handleEdit(item._id)}
                            />
                            <Icon
                              icon="mdi:delete-outline"
                              className="text-[23px] cursor-pointer text-gray-800 hover:text-red-500"
                              onClick={() => handleDelete(item._id, item)}
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
                {Math.ceil(filteredData.length / itemsPerPage)}
              </span>
            )}
            <Button
              disabled={
                isViewAll || currentPage * itemsPerPage >= filteredData.length
              }
              onClick={handleNextPage}
              variant="outlined"
            >
              Next
            </Button>
            <Button
              onClick={handleToggleView}
              variant="contained"
              color="primary"
            >
              {isViewAll ? "View Less" : "View All"}
            </Button>
          </div>
        </div>
      </MaterialThemeProvider>
    </>
  );
};

export default BlogListTable;
