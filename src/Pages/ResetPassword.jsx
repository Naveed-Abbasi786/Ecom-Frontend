import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ForgetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required'),
});

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const location = useLocation();

  const getTokenFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token'); 
  };

  const token = getTokenFromQuery();

  const handleForgetPassword = async (values) => {
    const newPassword = values.password;
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}api/auth/reset-password`, { newPassword, token });
      notifySuccess('Password saved successfully');
      console.log('Response:', response);
    } catch (error) {
      notifyError('Failed to save password');
      console.error('Error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
          <p className="text-center text-gray-600 mt-2 mb-8">Enter your new password</p>

          <Formik
            initialValues={{ password: '' }}
            validationSchema={ForgetPasswordSchema}
            onSubmit={handleForgetPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  {loading ? 'Submitting...' : 'Reset Password'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
