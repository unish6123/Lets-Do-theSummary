// src/pages/ForgotPasswordPage.jsx
import React from 'react';
import AuthForm from '../components/Auth/AuthForm';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h1>
        <p className="text-center text-gray-500 mb-4">
          Enter your email address to receive a password reset link.
        </p>
        <AuthForm type="forgotPassword" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
