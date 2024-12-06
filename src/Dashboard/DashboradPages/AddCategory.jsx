import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CatgeroyTable from "../DashboradPages/Categorytable";
// import SubcategoryTable from "./SubCategoryTable";
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import useDebounce from "../../Hook/useDebounce";

const AddCategory = (porps) => {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const token = localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleAddCategory = useCallback(async (values) => {
    const formData = new FormData();
    formData.append("name", values.categoryName);
    formData.append("categoryImage", categoryImage);
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/admin/category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCatName("");
      setImagePreview("");
      setCategoryImage("")
      notifySuccess("Successfully added category");
    } catch (error) {
      notifyError(
        `Error adding category: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  },);

  return (
    <>
      <div className="">
        <ToastContainer />
        {/* Add Category Section */}
        <div className="w-[100%] border-r p-4">
          <h5 className="text-gray-800 font-Poppins text-[30px] mb-4">
            Add Category
          </h5>
          <Formik
            initialValues={{ categoryName: "" }}
            validationSchema={Yup.object({
              categoryName: Yup.string().required("Category name is required"),
            })}
            onSubmit={(values, { resetForm }) =>
              handleAddCategory(values, resetForm)
            }
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="space-y-5">
                <TextField
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  value={catName} // State value
                  onChange={(e) => {
                    setCatName(e.target.value); // Update state
                    setFieldValue("categoryName", e.target.value); // Update Formik field value
                  }}
                  error={touched.categoryName && Boolean(errors.categoryName)}
                  helperText={touched.categoryName && errors.categoryName}
                />

                <div className="flex">
                  <Button
                    variant="outlined"
                    component="label"
                    className="w-full mb-2"
                  >
                    Upload Category Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
                {imagePreview && (
                  <div className="w-full h-[16vh] flex justify-center">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-[120px] h-full object-contain shadow-inner rounded-full"
                    />
                  </div>
                )}

                <div className="flex justify-center">
                  <Button type="submit" variant="contained" color="primary">
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Add Category"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <CatgeroyTable handleAddCategory={handleAddCategory} />
      </div>
    </>
  );
};

export default AddCategory;
