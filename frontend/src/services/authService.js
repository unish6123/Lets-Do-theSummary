// src/services/authService.js
import axios from 'axios';

// Set your API base URL
const API_URL = 'http://localhost:4000/api/auth'; // Adjust according to your backend API

// Login request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signIn`, { email, password });
    if (response.status === 200) {
      return response.data; // Expected response containing user data or a token
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


// Register request
export const register = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/signUp`, userDetails);
    return response.data; // Return success message or user data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Forgot password request
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data; // Return success message or instructions
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Forgot password failed');
  }
};

// Resend OTP request
export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, { email });
    return response.data; // Return success message
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Resend OTP failed');
  }
};
