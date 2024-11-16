import axios from 'axios';

const API_URL = 'http://192.168.100.106:4000/api/auth';

export const registerUser = async (userName,email,password) => {
    console.log("Inside registerUser function:", userName,email,password); // For debugging
    try {
        const response = await axios.post(`${API_URL}/signup`, userName,email,password); // Pass userdata directly here
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};
