import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Autocomplete,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Icon } from "@iconify/react";

const validationSchema = Yup.object({
  productName: Yup.string().required("Product name is required"),
  heading: Yup.string().required("Heading is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  discountPrice: Yup.number().positive("Discount price must be positive"),
  description: Yup.string().required("Requird the Discription"),
  Quantity:Yup.number().required("Requird Quanity").positive('must be positive'),
  // category:Yup.required('Requird Category'),
  // Subcategory:Yup.required('Requird Category'),
});

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.106:4000/api/cat/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.106:4000/api/cat/products"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.post(
            "http://192.168.100.106:4000/api/cat/category/subcategories",
            {
              categoryId: selectedCategoryId,
            }
          );
          setSubCategories(response.data);
        } catch (error) {
          console.error(
            "Error fetching subcategories:",
            error.response ? error.response.data : error.message
          );
        }
      };
      fetchSubCategories();
    }
  }, [selectedCategoryId]);

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const validImageFormats = ["image/jpeg", "image/png", "image/jpg"];
    const validFiles = files.filter(
      (file) => validImageFormats.includes(file.type)
    );

    if (validFiles.length + imageFiles.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    const newImages = validFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);

    return () => {
      newImages.forEach((image) => URL.revokeObjectURL(image));
    };
  };
  const handleProductAdd = async (values,resetForm) => {
    if (!selectedSubCategoryId) {
        console.error("Subcategory ID is missing.");
        return; 
    }
    const formData = new FormData();
    formData.append("subCategoryId", selectedSubCategoryId);
    formData.append("name", values.productName);
    formData.append("heading", values.heading);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discountPrice);
    formData.append("quantity",values.Quantity); 

    imageFiles.forEach((file) => {
        formData.append("files", file);
        console.log("Appending file:", file);
    });

    console.log("Form Data before submission:", formData);

    setLoading(true); 
    try {
        const response = await axios.post(
            "http://192.168.100.106:4000/api/cat/product",    
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Product added successfully:", response.data);
        notifySuccess('Successfully Add')
        setImages([]);
        setImageFiles([]);
        resetForm();
        setCategories([])
        setSubCategories([])
    } catch (error) {
      notifyError('Error Adding Product',error.response ? error.response.data : error.message)
        console.error(
            "Error adding product:",
            error.response ? error.response.data : error.message
        );
    } finally {
        setLoading(false); 
    }
};

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
    <ToastContainer/>
    <Formik
      initialValues={{
        productName: "",
        heading: "",
        price: "",
        discountPrice: "",
        description: "",
        category: null,
        Subcategory:null,
        Quantity:''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => handleProductAdd(values, resetForm)}
    >
      {({ values, handleChange, setFieldValue, touched, errors }) => (
        <Form  className="space-y-5">
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            name="productName"
            value={values.productName}
            onChange={handleChange}
            error={touched.productName && Boolean(errors.productName)}
            helperText={touched.productName && errors.productName}
          />

          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name || ""}
            onChange={(event, newValue) => {
              setFieldValue("category", newValue);
              setSelectedCategoryId(newValue?._id || "");
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

          <Autocomplete
            options={subCategories}
            getOptionLabel={(option) => option.name || ""}
            onChange={(event, newValue) => {
              setSelectedSubCategoryId(newValue?._id || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Subcategory"
                variant="outlined"
                error={touched.Subcategory && Boolean(errors.Subcategory)}
                helperText={touched.Subcategory && errors.Subcategory}
              />
            )}
          />

          <TextField
            label="Heading"
            variant="outlined"
            fullWidth
            name="heading"
            value={values.heading}
            onChange={handleChange}
            error={touched.heading && Boolean(errors.heading)}
            helperText={touched.heading && errors.heading}
          />

          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            name="price"
            value={values.price}
            onChange={handleChange}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            />

          <TextField
            label="Discount Price"
            type="number"
            variant="outlined"
            fullWidth
            name="discountPrice"
            value={values.discountPrice}
            onChange={handleChange}
          />
           <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            name="Quantity"
            value={values.Quantity}
            onChange={handleChange}
            error={touched.Quantity && Boolean(errors.Quantity)}
            helperText={touched.Quantity && errors.Quantity}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="description"
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />

          <div className="flex flex-wrap">
            <div className="w-full p-4">
              <label className="block mb-2 text-center font-semibold">
                Upload Images
              </label>
              <label
                htmlFor="images-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-60 cursor-pointer hover:bg-gray-100 transition duration-300"
              >
                <Icon
                  icon="akar-icons:plus"
                  className="text-3xl text-gray-600"
                />
                <span className="mt-2 text-gray-600">Upload Images</span>
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                onChange={handleImagesChange}
                id="images-upload"
                className="hidden"
              />

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 hover:bg-red-100"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="flex items-center justify-center"
          >
            {loading ? <CircularProgress size={24} /> : "Add Product"}
          </Button>
        </Form>
      )}
    </Formik>
      </>
  );
};

export default AddProducts;


// // <FormControl variant="outlined" className="w-full bg-white rounded">
// <InputLabel id="size-label">Sizes</InputLabel>
// <Select
//   labelId="size-label"
//   label="Sizes"
//   multiple
//   value={values.selectedSizes}
//   onChange={(e) => setFieldValue('selectedSizes', e.target.value)}
//   error={touched.selectedSizes && Boolean(errors.selectedSizes)}
// >
//   {SizeOptions.map((size) => (
//     <MenuItem key={size} value={size}>{size}</MenuItem>
//   ))}
// </Select>
// </FormControl>

// <FormControl variant="outlined" className="w-full bg-white rounded">
// <InputLabel id="color-label">Colors</InputLabel>
// <Select
//   labelId="color-label"
//   label="Colors"
//   multiple
//   value={values.selectedColors}
//   onChange={(e) => setFieldValue('selectedColors', e.target.value)}
//   error={touched.selectedColors && Boolean(errors.selectedColors)}
// >
//   {ColorOptions.map((color) => (
//     <MenuItem key={color} value={color}>{color}</MenuItem>
//   ))}
// </Select>
// </FormControl>
