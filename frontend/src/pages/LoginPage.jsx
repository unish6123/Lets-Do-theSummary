// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>
        <AuthForm type="login" />
        <div className="text-center mt-4">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
