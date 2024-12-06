import React, { useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import * as Yup from "yup";
import { CartContext } from "../../Context/Context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BlogListTable from "./BlogListTable";
// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function AddBlog() {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { userId, token } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const validImageFormats = ["image/jpeg", "image/png", "image/jpg"];
    const validFiles = files.filter((file) =>
      validImageFormats.includes(file.type)
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

  // Handle Delete Image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle Submit
  const handleSubmit = async (values, resetForm) => {
    const catId = "674af34407018de0f3679827";
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.description);
    formData.append("author", userId);
    formData.append("category", catId);

    imageFiles.forEach((file) => {
      formData.append("images", file);
      console.log("Appending file:", file);
    });
    try {
      const response = await axios.post(
        `${API_URL}api/admin/blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Add Blog");
      resetForm();
      images([])
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <Formik
          initialValues={{
            title: "",
            author: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
          {({ errors, touched, resetForm }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Title"
                    fullWidth
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <label
                    htmlFor="images-upload"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      height: "200px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "16px", color: "#666" }}>
                      Drag & Drop or Click to Upload Images
                    </span>
                  </label>
                  <input
                    id="images-upload"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImagesChange}
                    style={{ display: "none" }}
                  />
                  {/* Image Preview */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Uploaded ${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit Blog
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <BlogListTable handleSubmit={handleSubmit}/>
    </>
  );
}
