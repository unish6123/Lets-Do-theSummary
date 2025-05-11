
import React from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResendOTP from './ResendOTP';

const AuthForm = ({ type }) => {
  const renderForm = () => {
    switch (type) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'forgotPassword':
        return <ForgotPassword />;
      case 'resendOTP':
        return <ResendOTP />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="auth-form">
      {renderForm()}
    </div>
  );
};

export default AuthForm;
