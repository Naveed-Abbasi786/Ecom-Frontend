import { useState, useEffect } from "react";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Menu, MenuItem, Avatar, CircularProgress, TextField } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [timer, setTimer] = useState(100);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(4, "Must be 4 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const forgotValidation = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  useEffect(() => {
    const fetchUserData = async () => {
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
      } catch (error) {
        setLoading(false);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (timer === 0) return;
    const intervalId = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleAvatarClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    handleAvatarClose();
    setLoading(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [newImages, setNewImages] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImages(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRegistration = async (values) => {
    const userData = new FormData();
    userData.append("username", values.userName);
    userData.append("email", values.email);
    userData.append("password", values.password);

    if (profileImage) {
      const imageFile = newImages;
      userData.append("profileImage", imageFile);
    }
    setEmail(values.email);
    setFormValues(values);
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImage("");
      notifySuccess("Verify OTP");
      setIsOtp(true);
      setTimer(100);
    } catch (error) {
      notifyError(error.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/api/auth/login`, values);
      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true);
      notifySuccess("Successfully Logged In");
      setTimeout(() => setIsOpen(false), 1000);
    } catch (error) {
      notifyError(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, { otp, email });  
      localStorage.setItem("authToken", response.data.token);  
      setIsLoggedIn(true);
      notifySuccess("Successfully Verified");
      setTimeout(() => {
        setIsOtp(false);
        setIsSignup(false);
        setIsOpen(false);
        setOtp("")
        setForm(true);
      }, 1000);
    } catch (error) {
      notifyError(error.response?.data?.message || "OTP Verification error");
    } finally {
      setLoading(false);
    }
  };
  

  const navigate = useNavigate();

  const hanldeProfile = () => {
    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/UserdashboradLayout");
    }
  };
  const handleForgetPassword = (values) => {
    navigate("/forget-passwrod");
  };

  const open = () => setIsOpen(true);
  const close = () => {
    if (window.confirm("Are you sure you want to leave this page?")) {
      setIsOpen(false);
      setIsForgetPassword(false);
      setIsOtp(false);
      setForm(true);
    }
  };

  const firstLetter = user?.username?.[0]?.toUpperCase() || "";
  const avatarSrc = user?.profileImage
    ? `${API_URL}${user.profileImage}`
    : null;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Avatar
            sx={{
              cursor: "pointer",
              marginTop: "-5%",
              bgcolor: avatarSrc ? "transparent" : deepOrange[500],
            }}
            alt={user?.name}
            src={avatarSrc}
            onClick={handleAvatarClick}
          >
            {loading ? (
              <CircularProgress size={20} color="white" />
            ) : (
              !avatarSrc && firstLetter
            )}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAvatarClose}
          >
            <MenuItem onClick={hanldeProfile}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </>
      ) : (
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={open}
        >
          <Icon
            icon="line-md:account"
            className="text-3xl bg-transparent text-gray-600"
          />
          <span className="text-gray-400 font-Poppins lg:flex hidden text-[11px] cursor-pointer">
            Account
          </span>
        </div>
      )}

      <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
        <ToastContainer />
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-7">
            <DialogPanel className="relative w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-3xl">
              <Icon
                icon="line-md:menu-to-close-alt-transition"
                onClick={close}
                className="absolute top-4 right-4 text-gray-600 cursor-pointer"
                style={{ fontSize: "24px" }}
              />
              {isOtp ? (
                <div className="mt-5">
                  <h2 className="text-[#222222] font-Poppins text-[19px]">
                    OTP Verification
                  </h2>
                  <span className="text-[#222222] font-Poppins text-[16px]">
                    Your Email: <span className="text-[15px]">{email}</span>
                  </span>
                  <h3
                    className="text-[14px] text-[#222222] cursor-pointer underline mt-2 hover:text-black"
                    onClick={() => setIsOtp(false)}
                  >
                    Change Email
                  </h3>
                  <div className="flex gap-4 mt-4">
                    <input
                      type="text"
                      placeholder="Enter Your OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full border py-2 border-gray-300 text-[#222222] font-Poppins rounded-md text-center text-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-1 justify-end mr-8 mt-5 items-center">
                    <h4 className="text-[#222222] font-Poppins text-[15px]">
                      Resend OTP:
                    </h4>
                    <span className="-mt-1">{formatTime(timer)}</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={verifyOtp}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              ) : (
                form && (
                  <TabGroup>
                    <TabList className="flex gap-4 justify-center">
                      <Tab
                        onClick={() => setIsSignup(true)}
                        className={`${
                          isSignup
                            ? "border-b-2 border-black"
                            : "text-[#6b6b6b]"
                        } py-1 px-3 text-[20px] font-Poppins font-semibold outline-none text-[#222222] focus:outline-none}`}
                      >
                        Register
                      </Tab>
                      <Tab
                        onClick={() => setIsSignup(false)}
                        className={`${
                          !isSignup
                            ? "border-b-2 border-black"
                            : "text-[#6b6b6b]"
                        } py-1 px-3 text-[20px] font-Poppins font-semibold text-[#222222] outline-none focus:outline-none}`}
                      >
                        Log In
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                      <Formik
  initialValues={{
    userName: "",
    email: "",
    password: "",
  }}
  validationSchema={validationSchema}
  onSubmit={handleRegistration}
>
  {({ isSubmitting, errors, touched }) => (
    <Form className="gap-8">
      {/* Upload Profile Image */}
   
      {/* User Name */}
      <Field
      
        name="userName"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{marginBottom:"5%",marginTop:"5%"}}
            label="User Name"
            fullWidth
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
          />
        )}
      />

      {/* Email */}
      <Field
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{marginBottom:"5%"}}

            label="Email Address"
            type="email"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        )}
      />

      {/* Password */}
      <Field
        name="password"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{marginBottom:"5%"}}

            label="Password"
            type="password"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        )}
      />


<div className="w-full p-2 mb-4 mt-2 rounded bg-transparent border-2 border-gray-300 outline-none">
        <label
          htmlFor="profile-image"
          className="w-full block text-gray-500 cursor-pointer"
        >
          Upload Profile Image
        </label>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      {profileImage && (
        <div className="flex justify-center mt-2">
          <img
            src={profileImage}
            alt="Profile Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </div>
    </Form>
  )}
</Formik>

                      </TabPanel>
                      <TabPanel>
                        <Formik
                          initialValues={{ email: "", password: "" }}
                          validationSchema={loginValidationSchema}
                          onSubmit={handleLogin}
                        >
                          {({ isSubmitting, errors, touched }) => (
                            <Form>
                              <div className="flex flex-col gap-2 mt-5">
                                <Field
                                  name="email"
                                  type="email"
                                  placeholder="Email Address"
                                  className={`w-full p-2 mb-4 mt-2 rounded bg-transparent border-2 outline-none ${
                                    errors.email && touched.email
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div className="flex flex-col gap-2 mt-3">
                                <Field
                                  name="password"
                                  type="password"
                                  placeholder="Password"
                                  className={`w-full p-2 mb-4 mt-2 rounded bg-transparent border-2 outline-none ${
                                    errors.email && touched.email
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <h6
                                className="text-[#222] font-Poppins cursor-pointer  text-end text-[15px] py-3 underline hover:text-black"
                                onClick={handleForgetPassword}
                              >
                                Forget Passowrd
                              </h6>
                              <div className="mt-6 flex justify-center">
                                <Button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                                >
                                  {loading ? (
                                    <CircularProgress
                                      size={24}
                                      color="inherit"
                                    />
                                  ) : (
                                    "Log In"
                                  )}
                                </Button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                )
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
