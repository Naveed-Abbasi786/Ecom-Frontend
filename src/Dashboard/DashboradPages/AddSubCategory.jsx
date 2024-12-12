import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SubcategoryTable from "./SubCategryTable";
import { Toaster, toast } from "react-hot-toast";

export default function AddSubCategory(props) {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const token = localStorage.getItem("authToken");

  const [categories, setCategories] = useState([]);
  const [subName, setSubName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [load, setLoad] = useState(false);
  const [categoryState, setCategoryState] = useState(null); // Local state for Autocomplete

  const handleAddSubCategory = useCallback(
    async (values) => {
      if (!categoryState?._id) {
        toast.error("Please select a valid category");
        return;
      }
  
      try {
        setLoad(true);
  
        await axios.post(
          `${API_URL}/api/admin/subcategory`,
          {
            name: values.subcategoryName,
            categoryId: categoryState._id, // Using centralized state
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        toast.success("Successfully added subcategory");
  
        // Clear states
        setCategoryState(null); // Reset Autocomplete
        setSubName("");
      } catch (error) {
        console.error("Error adding subcategory:", error);
        toast.error(
          `Error adding subcategory: ${error.response?.data?.message || error.message}`
        );
      } finally {
        setLoad(false);
      }
    },
    [categoryState, token]
  );
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cat/categories`);
        setCategories(response?.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[100%] mt-8">
        <h5 className="text-gray-800 font-Poppins text-[30px] mb-4">
          Add Subcategory
        </h5>
        <Formik
  initialValues={{
    subcategoryName: "",
  }}
  validationSchema={Yup.object({
    subcategoryName: Yup.string().required("Subcategory name is required"),
  })}
  onSubmit={(values) => handleAddSubCategory(values)}
>
  {({ setFieldValue, values, errors, touched }) => (
    <Form className="space-y-5">
      {/* Autocomplete */}
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option?.name || ""}
        value={categoryState} // Controlled state
        onChange={(event, newValue) => {
          console.log("Selected Category:", newValue); // Debugging
          setCategoryState(newValue); // Sync local state
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a Category"
            variant="outlined"
          />
        )}
      />

      {/* Subcategory Name */}
      <TextField
        label="Subcategory Name"
        variant="outlined"
        fullWidth
        value={subName} // Controlled
        onChange={(e) => {
          setSubName(e.target.value);
          setFieldValue("subcategoryName", e.target.value);
        }}
        error={
          touched.subcategoryName && Boolean(errors.subcategoryName)
        }
        helperText={touched.subcategoryName && errors.subcategoryName}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={load}
      >
        {load ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Add Subcategory"
        )}
      </Button>
    </Form>
  )}
</Formik>;
      </div>
      <SubcategoryTable handleAddSubCategory={handleAddSubCategory} />
    </div>
  );
}
