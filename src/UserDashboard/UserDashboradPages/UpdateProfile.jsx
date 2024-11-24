import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";

function UpdateProfile() {
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username can't be longer than 20 characters")
        .required("Username is required"),
      profileImage: Yup.mixed().required("Profile image is required"),
    }),
    onSubmit: (values) => {
      toast.success("Profile updated successfully!");
      console.log("Form Submitted:", values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      // Create a preview of the image
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Box className="w-full flex">
      <Toaster position="top-right" />
      <Box className="w-full ">
        <Typography variant="h5" className="font-bold text-center mb-6">
          Update Profile
        </Typography>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-8">
          {/* Username Field */}
          <TextField
            fullWidth
            type="text"
            label="Username"
            variant="outlined"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          {/* Profile Image Field */}
          <Box>
            <Button
              variant="outlined"
              component="label"
              className="w-full mb-2"
            >
              Upload Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {formik.errors.profileImage && formik.touched.profileImage && (
              <Typography variant="caption" color="error">
                {formik.errors.profileImage}
              </Typography>
            )}
            {formik.values.profileImage && (
              <Typography variant="body2" className="text-gray-600 mt-2">
                Selected File: {formik.values.profileImage.name}
              </Typography>
            )}
          </Box>

          {/* Image Preview */}
          {imagePreview && (
            <Box className="my-4">
              <Typography variant="body2" className="text-gray-600 mb-2">
                Preview Image:
              </Typography>
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </Box>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default UpdateProfile;
