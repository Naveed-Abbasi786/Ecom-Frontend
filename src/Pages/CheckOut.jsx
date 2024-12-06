import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Product from "../assets/img/product3.jpg";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Footer from "../Components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../Context/Context";

// Yup Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  contactnumber: Yup.number().positive().required("ContactNumber is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  Address: Yup.string().required("Address is required"),
  zipcode: Yup.string().required("Zip Code is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
});

export default function CheckOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const fetchsUserData = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/auth/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setIsLoggedIn(true);

      if (response.data._id) {
        setLoading(true);
        const cartResponse = await axios.post(
            `${API_URL}/api/cart/getcart`,
          { userId: response.data._id }
        );
        setCartItems(cartResponse.data.cart.items);
        setCartTotal(Math.trunc(cartResponse.data.cartTotal));
        console.log(cartResponse.data.cart.items);
      }
    } catch (error) {
      setLoading(False);
      setIsLoggedIn(false);
      console.log(error);
    } finally {
      setLoading(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchsUserData();
  }, []);

  const { fetchCartData } = useContext(CartContext);

  const handleCheckOut = async (values, resetForm) => {
    if (user.role === "admin") {
      notifyError("Admin order nhi kr sakta");
      return;
    }
    const form = {
      userId: user._id,
      name: `${values.firstName} ${values.lastName}`,
      email: user.email,
      contactNumber: values.contactnumber,
      billingAddress: values.Address,
      city: values.city,
      state: values.state,
      zipCode: values.zipcode,
      paymentMethod: values.paymentMethod,
      totalAmount: cartTotal,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: Number(item.quantity),
      })),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/checkout/create`,
        form
      );
      notifySuccess("Order placed successfully!");
      setCartItems([]);
      setCartTotal("");
      fetchCartData();
      resetForm();
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      notifyError(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const State = [{ name: "Sindh " }, { name: "Punjab" }, { name: "Kpk" }];
  const Country = [
    { name: "Pakistan " },
    { name: "Palestine" },
    { name: "Dubai" },
  ];
  const PaymentMehotd = [
    { name: "EasyPaisa" },
    { name: "JazzCash" },
    { name: "BankAccount" },
    { name: "Cash on Delivery" },
  ];
  const PaymentMethodDetails = {
    EasyPesa:
      "EasyPesa is a mobile wallet solution, easy to use for quick payments.",
    JazzCash:
      "JazzCash is a popular mobile payment provider offering online transactions.",
    BankAccount:
      "BankAccount allows direct bank transfers for secure payments.",
  };
  const Cart = [
    { ProductName: "Product", Price: "39", ProductPic: <Product /> },
    { ProductName: "Product", Price: "39", ProductPic: <Product /> },
    { ProductName: "Product", Price: "39", ProductPic: <Product /> },
  ];
  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      {/* <ToastContainer /> */}
      <div>
        <div className="w-full h-[30vh] bg-[#F6F6F6] flex justify-center items-center">
          <div>
            <h1 className="font-Poppins text-[#333333] text-[40px] leading-[44px] tracking-[1]">
              CheckOut
            </h1>
            <h4 className="font-Poppins text-[#5EC1A1] text-center text-[20px] -tracking-[1]">
              Shop
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4 ml-[5%]">
          <span className="text-[14px] font-Poppins cursor-pointer text-[#6b6b6b] hover:text-[#222] hover:underline">
            <Link to="/">Home</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
          <span className="text-[14px] font-Poppins text-[#222] cursor-pointer hover:text-[#6b6b6b] hover:underline">
            <Link to="/CheckOut">Your CheckOut</Link>
          </span>
          <Icon
            icon="iconamoon:arrow-right-2-thin"
            className="text-[20px] font-Poppins text-[#222] cursor-pointer"
          />
        </div>
      </div>

      <div className="w-[85%] h-full ml-[5%] mt-8 flex lg:flex-row flex-col">
        <div className="lg:w-[70%] w-[100%]  h-[100%]">
          <div className="w-[97%] h-full">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                city: "",
                contactnumber: "",
                country: "",
                state: "",
                Address: "",
                zipcode: "",
                paymentMethod: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleCheckOut(values, resetForm);
              }}
            >
              {({ setFieldValue, values, touched, errors }) => (
                <Form>
                  <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="firstName"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name"
                            fullWidth
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                          />
                        )}
                      />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="lastName"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name"
                            fullWidth
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                          />
                        )}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            value={user.email}
                            type="email"
                            fullWidth
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        )}
                      />
                    </Grid>

                    {/* contactnumber*/}
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="contactnumber"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Contact Number"
                            fullWidth
                            error={
                              touched.contactnumber &&
                              Boolean(errors.contactnumber)
                            }
                            helperText={
                              touched.contactnumber && errors.contactnumber
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6}>
                      <Field name="country">
                        {({ field }) => (
                          <Autocomplete
                            {...field}
                            options={Country}
                            getOptionLabel={(option) => option.name || ""}
                            onChange={(event, newValue) => {
                              setFieldValue(
                                "country",
                                newValue ? newValue.name : ""
                              );
                            }}
                            value={
                              values.country ? { name: values.country } : null
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select a Country"
                                error={
                                  touched.country && Boolean(errors.country)
                                }
                                helperText={touched.country && errors.country}
                              />
                            )}
                          />
                        )}
                      </Field>
                    </Grid>
                    {/* City */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="city"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="City"
                            fullWidth
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        )}
                      />
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6}>
                      <Field name="state">
                        {({ field }) => (
                          <Autocomplete
                            {...field}
                            options={State}
                            getOptionLabel={(option) => option.name || ""}
                            onChange={(event, newValue) => {
                              setFieldValue(
                                "state",
                                newValue ? newValue.name : ""
                              );
                            }}
                            value={values.state ? { name: values.state } : null}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select a State"
                                error={touched.state && Boolean(errors.state)}
                                helperText={touched.state && errors.state}
                              />
                            )}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="Address"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Address"
                            fullWidth
                            error={touched.Address && Boolean(errors.Address)}
                            helperText={touched.Address && errors.Address}
                          />
                        )}
                      />
                    </Grid>

                    {/* Zip Code */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="zipcode"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Zip Code"
                            fullWidth
                            error={touched.zipcode && Boolean(errors.zipcode)}
                            helperText={touched.zipcode && errors.zipcode}
                          />
                        )}
                      />
                    </Grid>

                    {/* Payment Method */}
                    <Grid item xs={12} sm={6}>
                      <Field name="paymentMethod">
                        {({ field }) => (
                          <Autocomplete
                            {...field}
                            options={PaymentMehotd}
                            getOptionLabel={(option) => option.name || ""}
                            onChange={(event, newValue) => {
                              setFieldValue(
                                "paymentMethod",
                                newValue ? newValue.name : ""
                              );
                            }}
                            value={
                              values.paymentMethod
                                ? { name: values.paymentMethod }
                                : null
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Payment Method"
                                error={
                                  touched.paymentMethod &&
                                  Boolean(errors.paymentMethod)
                                }
                                helperText={
                                  touched.paymentMethod && errors.paymentMethod
                                }
                              />
                            )}
                          />
                        )}
                      </Field>
                    </Grid>

                    {/* Payment Method Details */}
                    {values.paymentMethod && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                          {PaymentMethodDetails[values.paymentMethod]}
                        </Typography>
                      </Grid>
                    )}

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginBottom: "5%" }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "wheat" }} />
                        ) : (
                          "Submit Order"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="lg:w-[30%] w-[100%] lg:mb-0 mb-10 h-[57%] bg-[#F9F9F9]  lg:mt-0 mt-10  border-2 border-dotted">
          <div>
            <h2 className="w-[80%] mx-auto  font-Poppins text-[#333333] leading-[17px] py-5 font-bold border-b-2">
              Your Cart Products
            </h2>
            <div className="w-full max-h-[40vh] mt-4 h-auto overflow-y-auto">
              {loading ? ( // Show loader when loading
                <div className="flex justify-center items-center h-full">
                  <span className="text-lg font-Poppins">Loading...</span>
                </div>
              ) : cartItems.length > 0 ? ( // Show cart items if available
                cartItems.map((val, idx) => (
                  <div key={idx} className="w-full px-4 mt-2 flex">
                    <img
                      src={`${API_URL}${val.product.imageUrls[0]}`}
                      alt={val.product.name}
                      className="w-12 h-auto rounded-lg"
                    />
                    <div className="w-full flex justify-between items-center">
                      <h3 className="font-Poppins text-[#333333]">
                        {val.product.name}
                      </h3>
                      <h3 className="font-Poppins text-[#333333]">
                        ({val.quantity})
                      </h3>
                      <h5 className="font-Poppins text-[#333333]">
                        ${val.product.discountedPrice?.toFixed(0)}
                      </h5>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span className="text-lg font-Poppins">
                    No items in the cart
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-[80%] mt-6  mx-auto">
            <h2 className="text-[#333333] font-Poppins py-5 font-bold border-t-2 flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-[16px] text-[#111111] font-Poppins font-bold">
                ${cartTotal}
              </span>
            </h2>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
