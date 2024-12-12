import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  Paper,
  ListItem,
} from "@mui/material";
import * as Yup from "yup";
import { CartContext } from "../../Context/Context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BlogListTable from "./BlogListTable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

export default function AddBlog() {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { userId, token } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); // Selected tags

  let [isOpen, setIsOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const [load, setLoad] = useState(false);
  const [addTagVal, setAddTagVal] = useState("");
  const [selectedTagId, setSelectedTagId] = useState([]);
  const AddTag = () => {
    setIsOpen(true);
  };

  function close() {
    setIsOpen(false);
  }

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
    console.log("Form values:", values);
    console.log("Description:", discription);
    console.log("Selected Tags:", selectedTags);
    const formData = new FormData();

    formData.append("title", values?.title);
    formData.append("content", discription);
    formData.append("author", userId);
    formData.append("tags", JSON.stringify(selectedTagId));

    imageFiles.forEach((file) => {
      formData.append("images", file);
      console.log("Appending file:", file);
    });

    try {
      const response = await axios.post(`${API_URL}/api/admin/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog Added Successfully");
      resetForm();
      setDiscription("");
      setSelectedTags("");
      setImages([]);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  const handleAddTag = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/tag`,
        { name: values.addTag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Tag added successfully");
      setAddTagVal("");
      fetchTags();
      setIsOpen(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/tags`, {
        headers: {
          Authorization: `Bearer ${token}`, // Proper headers format
        },
      });
      setTags(response.data.data);
    } catch (error) {
      console.error(error); // Error debug karega
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = (chipToDelete) => {
    setSelectedTags((chips) =>
      chips.filter((chip) => chip.value !== chipToDelete.value)
    );
  };

  const hanldeDeltedTags = async (value, event) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/delete-tag`,
        { id: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("deleted Successfully");
      fetchTags();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "deleted error");
    }
  };

  const isTagSelected = (value) => {
    return selectedTags?.some((tag) => tag.value === value);
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <div className="flex justify-between  items-center">
          <h5 className="text-gray-800 font-Poppins text-[30px] mb-4">
            Add Blogs
          </h5>
          <Button
            onClick={AddTag}
            type="button"
            variant="contained"
            color="primary"
          >
            Add New Tag
          </Button>
        </div>
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
                    AddTag
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      addTag: "",
                    }}
                    validationSchema={Yup.object({
                      addTag: Yup.string().required("AddTag name is required"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      handleAddTag(values, resetForm);
                    }}
                  >
                    {({ setFieldValue, values, errors, touched }) => (
                      <Form className="space-y-5 mt-4">
                        <TextField
                          label="addTag Name"
                          variant="outlined"
                          fullWidth
                          value={addTagVal}
                          onChange={(e) => {
                            setAddTagVal(e.target.value);
                            setFieldValue("addTag", e.target.value);
                          }}
                          error={touched.addTag && Boolean(errors.addTag)}
                          helperText={touched.addTag && errors.addTag}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={load}
                          className="w-full"
                        >
                          {load ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            "Add addTag"
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
        <div>
          {selectedTags.length > 0 && (
            <div className="blog-tags">
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  gap: 1,
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {selectedTags.map((data) => (
                  <ListItem key={data.value} style={{ display: "inline-flex" }}>
                    <Chip
                      label={data.label}
                      onDelete={() => handleDelete(data)}
                      sx={{
                        width: "object-fit",
                        backgroundColor: "#f1f1f1", // Light background for chips
                        color: "#333", // Text color
                        "&:hover": {
                          backgroundColor: "#e0e0e0", // Hover effect
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </Paper>
            </div>
          )}

          <Autocomplete
            sx={{ marginBottom: "2%" }}
            options={tags}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event, newValue) => {
              if (newValue) {
                if (isTagSelected(newValue.value)) {
                  setSelectedTags((prev) =>
                    prev.filter((tag) => tag.value !== newValue.value)
                  );
                  setSelectedTagId((prev) =>
                    prev.filter((id) => id !== newValue.value)
                  );
                } else {
                  setSelectedTags((prev) => [...prev, newValue]);
                  setSelectedTagId((prev) => [...prev, newValue.value]);
                }
                console.log("Selected Tag IDs:", selectedTagId);
              }
            }}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{
                  backgroundColor: isTagSelected(option.value)
                    ? "#d1e7dd"
                    : "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{option.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hanldeDeltedTags(option.value);
                  }}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "3px",
                    marginLeft: "10px",
                    borderRadius: "150px",
                  }}
                >
                  <Icon icon="ic:outline-delete" width="24" height="24" />
                </button>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Tag"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>

        <Formik
          initialValues={{
            title: "",
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

                <Grid item xs={12}>
                  <ReactQuill
                    theme="snow"
                    value={discription}
                    onChange={setDiscription}
                    className="h-[50vh]"
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
      <BlogListTable handleSubmit={handleSubmit} />
    </>
  );
}
