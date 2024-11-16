import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const validationSchema = Yup.object({
  categoryName: Yup.string().required("Category name is required"),
  subcategoryName: Yup.string().required("Subcategory name is required"),
});

const AddCategory = () => {
  const API_URL = "http://192.168.100.106:4000/api/cat";
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const [laoding, setLoading] = useState(false);
  const [load,setLoad]=useState(false)
  const [categories, setCategories] = React.useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");

  const hanldeAddCategory = async (values) => {
    const name = values.categoryName;
    console.log(values);
    try {
      setLoading(true);
      await axios.post(`${API_URL}/category`, { name: name });
      notifySuccess("Succuesfuly category add");
    } catch (error) {
      setLoading(false);
      console.log(error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };

  const hanldeAddSubCategory = async (values) => {
    try {
      setLoad(true);
      await axios.post(
        "http://192.168.100.106:4000/api/cat/category/subcategory",
        { name: values.subcategoryName, categoryId: selectedCategoryId }
      );
      notifySuccess("Succesfuly Add");
    } catch (error) {
      setLoad(false);
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchUserData();

    // Polling every 5 seconds
    const intervalId = setInterval(fetchUserData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);




  return (
    <div className="flex">
      <ToastContainer />
      {/* Add Category Section */}
      <div className="w-[50%] border-r p-4">
        <h5 className="text-lg font-bold mb-4">Add Category</h5>
        <Formik
          initialValues={{
            categoryName: "",
          }}
          validationSchema={Yup.object({
            categoryName: Yup.string().required("Category name is required"),
          })}
          onSubmit={hanldeAddCategory}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="space-y-5">
              <TextField
                label="categoryName"
                variant="outlined"
                fullWidth
                error={touched.categoryName && Boolean(errors.categoryName)}
                helperText={touched.categoryName && errors.categoryName}
                onChange={(e) => setFieldValue("categoryName", e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                {laoding ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add Category"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Add Subcategory Section */}
      <div className="w-[50%] p-4">
        <h5 className="text-lg font-bold mb-4">Add Subcategory</h5>
        <Formik
          initialValues={{
            subcategoryName: "",
            category: null,
          }}
          validationSchema={Yup.object({
            subcategoryName: Yup.string().required(
              "Subcategory name is required"
            ),
            category: Yup.object().nullable().required("Category is required"),
          })}
          onSubmit={hanldeAddSubCategory}
          //   (values) => {
          //   resetForm();
          //   console.log('Subcategory added:', values);
          // }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="space-y-5">
              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name || ""}
                onChange={(event, newValue) => {
                  setFieldValue("category", newValue);
                  if (newValue) {
                    setSelectedCategoryId(newValue._id);
                    console.log("Selected Category ID:", newValue._id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Category"
                    variant="outlined"
                    error={touched.category && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                  />
                )}
              />
              <TextField
                // name="subcategoryName"
                label="Subcategory Name"
                variant="outlined"
                fullWidth
                error={
                  touched.subcategoryName && Boolean(errors.subcategoryName)
                }
                onChange={(e) =>
                  setFieldValue("subcategoryName", e.target.value)
                }
                helperText={touched.subcategoryName && errors.subcategoryName}
              />
              <Button type="submit" variant="contained" color="primary">
                {load ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "  Add Subcategory"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
