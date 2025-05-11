import React, { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import { validateForgotPasswordForm } from '../../utils/validations';
import InputField from '../UI/InputField';
import Button from '../UI/Button';
import { toast } from 'react-toastify'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const validationError = validateForgotPasswordForm(email);
    if (validationError) {
      toast.error(validationError); 
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success('Reset link sent!'); 
    } catch (err) {
      toast.error(err.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleForgotPassword} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Forgot Password</h2>

        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded-md"
        />

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Send Reset Link
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
