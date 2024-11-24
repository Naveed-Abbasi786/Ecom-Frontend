import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(6, "Current password must be at least 6 characters long")
        .required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters long")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // Simulate API Call
      setTimeout(() => {
        if (values.currentPassword === "123456") {
          toast.success("Password changed successfully!");
          resetForm();
        } else {
          toast.error("Current password is incorrect!");
        }
      }, 1000);
    },
  });

  return (
    <Box className="w-full flex">
      <Toaster position="top-right" />
      <Box className="w-full">
        <Typography variant="h5" className="font-bold text-center ">
          Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-8">
          <Box className="flex gap-4">
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              variant="outlined"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Box>
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
