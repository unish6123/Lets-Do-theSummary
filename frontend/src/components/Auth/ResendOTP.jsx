import React, { useState } from 'react';
import { resendOTP } from '../../services/authService';
import { validateResendOTPForm } from '../../utils/validations';
import InputField from '../UI/InputField';
import Button from '../UI/Button';

const ResendOTP = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResendOTP = async (e) => {
    e.preventDefault();

    const validationError = validateResendOTPForm(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await resendOTP(email);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleResendOTP} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Resend OTP</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          className="border p-2 w-full rounded-md"
        />

        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Resend OTP
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the OTP?{' '}
            <a href="/resend-otp" className="text-blue-500 hover:text-blue-600">
              Resend OTP
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResendOTP;
