import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Icon } from "@iconify/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import PageHeader from "../Components/PageHeader";
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  contactnumber: Yup.number().positive().required("ContactNumber is required"),
});
export default function Contact() {
  const handleCheckOut = async (values, resetForm) => {
    console.log(values)
    resetForm()
  };
  return (
    <>
      <Header />
      <div>
      <PageHeader 
      title="Contact Us" 
      subtitle="Contact" 
      breadcrumbs={[
        { label: 'Home', link: '/' },
        { label: 'Contact', link: '/contact-us' },
      ]}
    />
        <div className="w-full h-auto mb-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-[100%] mb-10">
            <div className="px-10 pt-5">
              <h1 className="text-[#333333] font-Poppins text-[24px]">
                Contact Information
              </h1>
              <p className="text-[#222222] font-Poppins text-[14px]  leading-[26px]">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-12  mt-5">
                <div className="">
                  <h4 className="text-[#333333] font-Poppins text-[20px]">The Office</h4>
                  <div className="flex mt-5  gap-2 items-start">
                    {" "}
                    <Icon
                      icon="mynaui:location"
                      className="text-[30px] font-Poppins text-[#5EC1A1]"
                    />
                    <p className="text-[14px] py-1 font-Poppins text-[#222222]">70 Washington Square South New York, NY 10012, United States</p>
                  </div>
                  <div className="flex mt-5  gap-2 items-start">
                    {" "}
                    <Icon
                      icon="fluent-mdl2:contact"
                      className="text-[16px] font-Poppins text-[#5EC1A1]"
                    />
                    <p className="text-[14px] -py-1 font-Poppins text-[#222222]">+92 311 1309060</p>
                  </div>
                  <div className="flex mt-5  -ml-1 gap-2 items-start">
                    {" "}
                    <Icon
                      icon="mdi-light:email"
                      className="text-[22px] font-Poppins text-[#5EC1A1]"
                    />
                    <p className="text-[14px]  font-Poppins text-[#222222]">naveedabbasi8651@gmail.com</p>
                  </div>
                
                </div>
                <div className="">
                  <h4 className="text-[#333333] font-Poppins text-[20px]">The Time</h4>
                  <div className="flex mt-5  gap-2 items-start">
                    {" "}
                    <Icon
                      icon="bx:time"
                      className="text-[16px] mt-1 font-Poppins text-[#5EC1A1]"
                    />
                    <p className="text-[14px]  mt-[0.6] font-Poppins text-[#222222]">Monday-Saturday<br/>
                    11am-7pm ET</p>
                  </div>
                  <div className="flex mt-5  gap-2 items-start">
                    {" "}
                    <Icon
                      icon="uiw:date"
                      className="text-[16px] font-Poppins text-[#5EC1A1]"
                    />
                    <p className="text-[14px]  font-Poppins text-[#222222]">Sunday<br/>
                    11am-6pm ET</p>
                  </div>

                  
                  </div>
                  
              </div>
            </div>
          </div>

          <div className="w-[100%]  p-5">
          <h1 className="text-[#333333] font-Poppins text-[24px]">
              The Office
              </h1>
              <p className="text-[#222222] font-Poppins text-[14px]  leading-[26px]">
              Use the form below to get in touch with the sales team
              </p>
              <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                city: "",
                contactnumber: "",
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

               
                    <Grid item  xs={12} sm={6}>
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
                    {/* Email */}
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            value={values.email}
                            type="email"
                            fullWidth
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        )}
                      />
                    </Grid>

                    <div className="w-full mt-4 ml-4">
              <textarea
                name=""
                id=""
                className="w-[98%] outline-none resize-none  px-4 py-2 transition duration-500 border-2 focus:border-[#5EC1A1]"
                placeholder="Special Instructions for Seller"
                rows={6}
              ></textarea>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
            
                <button className="bg-[#5EC1A1] text-white  px-4 py-1">
                  Submit
                </button>
              </div>
            </div>

                   


                  </Grid>
                </Form>
              )}
            </Formik>
          </div>


        </div>
        <Footer />
      </div>
    </>
  );
}
