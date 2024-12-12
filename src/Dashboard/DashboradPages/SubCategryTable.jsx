import React, { useState, useEffect, useContext } from "react";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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
import { CartContext } from "../../Context/Context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
const SubcategoryTable = (props) => {
  const [search, setSearch] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { categoryLoading, categories } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isViewAll, setIsViewAll] = useState(false);
  const [load, setLoad] = useState(false);

  const [name, setName] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const [subName, setSubName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);
  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleEdit = async (item) => {
    setIsOpen(true);
    setSelectedSubCategoryId(item._id);
  };

  function close() {
    setIsOpen(false);
  }

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/subcategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubCategories(response.data.subCategorirs);
      setFilteredData(response.data.subCategorirs);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchSubCategories();
  }, [props.handleAddSubCategory]);

  const handleUpdateSubCategory = async (values, { resetForm }) => {
    if (!selectedCategoryId && !selectedSubCategoryId && !subName) {
      return;
    }

    const obj = {
      subcategoryId: selectedSubCategoryId,
      name: subName,
      newCategoryId: selectedCategoryId,
    };
    console.log(obj);
    try {
      await axios.put(`${API_URL}api/admin/subcategory/id`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSubCategories();
      resetForm();
      setName("");
      setIsOpen(false);
      toast.success("Succefuly Update");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id, item) => {
    try {
      await axios.post(
        `${API_URL}/api/admin/subcategory/id`,
        { categoryId: item.category, subcategoryId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSubCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    const filtered = subCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const sort = useSort(
    { nodes: filteredData },
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        CATEGORY: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        SUBCATEGORY: (array) =>
          array.sort((a, b) => a.name.localeCompare(b.name)),
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
    : filteredData.slice(
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
              SubCategory Table
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
                        endIcon={getIcon("SUBCATEGORY")}
                        onClick={() =>
                          sort.fns.onToggleSort({
                            sortKey: "SUBCATEGORY",
                          })
                        }
                      >
                        SubCategory
                      </Button>
                    </HeaderCell>
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
                          <span
                            style={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            {item.name}
                          </span>
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          <span
                            style={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            {item?.category?.name}
                          </span>
                        </Cell>

                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </Cell>
                        <Cell style={{ padding: "12px", textAlign: "left" }}>
                          <div className="flex gap-2">
                            <Icon
                              icon="ic:round-edit"
                              className="text-[23px] cursor-pointer text-gray-800 hover:text-red-800"
                              onClick={() => handleEdit(item)}
                            />
                            <>
                              <Dialog
                                open={isOpen}
                                as="div"
                                className="relative z-10 focus:outline-none"
                                onClose={close}
                              >
                                {/* Background with reduced opacity */}
                                <div
                                  className="fixed inset-0 bg-white/10 backdrop-blur-sm"
                                  aria-hidden="true"
                                ></div>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                  <div className="flex min-h-full items-center justify-center p-7">
                                    <Dialog.Panel className="relative w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                                      {/* Close Button */}
                                      <button
                                        onClick={close}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                      >
                                        <span
                                          className="iconify"
                                          data-icon="mdi:close"
                                          data-width="24"
                                        ></span>
                                      </button>

                                      <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold text-gray-800"
                                      >
                                        Sub Category Update
                                      </Dialog.Title>

                                      {/* Your Form or Content Here */}
                                      <Formik
                                        initialValues={{
                                          subcategoryName: "",
                                          category: null,
                                        }}
                                        validationSchema={Yup.object({
                                          subcategoryName:
                                            Yup.string().required(
                                              "Subcategory name is required"
                                            ),
                                          category: Yup.object()
                                            .nullable()
                                            .required("Category is required"),
                                        })}
                                        onSubmit={(values, { resetForm }) =>
                                          handleUpdateSubCategory(values, {
                                            resetForm,
                                          })
                                        }
                                      >
                                        {({
                                          setFieldValue,
                                          values,
                                          errors,
                                          touched,
                                        }) => (
                                          <Form className="space-y-5 mt-4">
                                            <Autocomplete
                                              options={categories}
                                              getOptionLabel={(option) =>
                                                option?.name || ""
                                              }
                                              onChange={(event, newValue) => {
                                                setFieldValue(
                                                  "category",
                                                  newValue
                                                );
                                                if (newValue) {
                                                  setSelectedCategoryId(
                                                    newValue._id
                                                  );
                                                }
                                              }}
                                              renderInput={(params) => (
                                                <TextField
                                                  {...params}
                                                  label="Select a Category"
                                                  variant="outlined"
                                                  error={
                                                    touched.category &&
                                                    Boolean(errors.category)
                                                  }
                                                  helperText={
                                                    touched.category &&
                                                    errors.category
                                                  }
                                                />
                                              )}
                                            />
                                            <TextField
                                              label="Subcategory Name"
                                              variant="outlined"
                                              fullWidth
                                              value={subName}
                                              onChange={(e) => {
                                                setSubName(e.target.value);
                                                setFieldValue(
                                                  "subcategoryName",
                                                  e.target.value
                                                );
                                              }}
                                              error={
                                                touched.subcategoryName &&
                                                Boolean(errors.subcategoryName)
                                              }
                                              helperText={
                                                touched.subcategoryName &&
                                                errors.subcategoryName
                                              }
                                            />
                                            <Button
                                              type="submit"
                                              variant="contained"
                                              color="primary"
                                              disabled={load}
                                              className="w-full"
                                            >
                                              {load ? (
                                                <CircularProgress
                                                  size={24}
                                                  color="inherit"
                                                />
                                              ) : (
                                                "Add Subcategory"
                                              )}
                                            </Button>
                                          </Form>
                                        )}
                                      </Formik>
                                    </Dialog.Panel>
                                  </div>
                                </div>
                              </Dialog>
                            </>

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
            <Button onClick={handleViewAll} variant="contained" color="primary">
              {isViewAll ? "View Less" : "View All"}
            </Button>
          </div>
        </div>
      </MaterialThemeProvider>
    </>
  );
};

export default SubcategoryTable;
