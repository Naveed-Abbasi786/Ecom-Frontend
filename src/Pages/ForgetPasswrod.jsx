import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgetPassword() {
    const [loading, setloading] = useState(false);
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const handleForgetPassword= async(values)=>{
        const origin=window.location.origin
       const email= values.email
        try {
          setloading(true)
          const response = await axios.post(`${API_URL}/api/auth/forgot-password`,{email,origin});
          notifySuccess('Succusfully forgot')
        } catch (error) {
          notifyError(error)
          console.log(error)
          setloading(false)
        }finally{
          setloading(false)
        }
    }
  return (
    <>
    <ToastContainer/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">Enter your email to reset your password</p>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={handleForgetPassword}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>

  );
}
