import React, { useState } from 'react';
import { register } from '../../services/authService.js';
import { validateRegisterForm } from '../../utils/validations';
import InputField from '../UI/InputField.jsx';
import Button from '../UI/Button.jsx';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(name, email, password, confirmPassword);
    if (validationErrors.name || validationErrors.email || validationErrors.password || validationErrors.confirmPassword) {
      setError(validationErrors);
      if (validationErrors.name) toast.error(validationErrors.name);
      if (validationErrors.email) toast.error(validationErrors.email);
      if (validationErrors.password) toast.error(validationErrors.password);
      if (validationErrors.confirmPassword) toast.error(validationErrors.confirmPassword);
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError({ ...error, general: err.message });
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleRegister} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

        {error.general && <p className="text-red-500 text-sm">{error.general}</p>}

        <div className="relative">
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError((prev) => ({ ...prev, name: '' }));
            }}
            error={error.name}
            className="border p-2 w-full rounded-md"
          />
          {error.name && (
            <span className="text-sm text-red-500 absolute top-full left-0 mt-1">
              {error.name}
            </span>
          )}
        </div>

        <div className="relative">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((prev) => ({ ...prev, email: '' }));
            }}
            error={error.email}
            className="border p-2 w-full rounded-md"
          />
          {error.email && (
            <span className="text-sm text-red-500 absolute top-full left-0 mt-1">
              {error.email}
            </span>
          )}
        </div>

        <div className="relative">
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError((prev) => ({ ...prev, password: '' }));
            }}
            error={error.password}
            className="border p-2 w-full rounded-md"
          />
          {error.password && (
            <span className="text-sm text-red-500 absolute top-full left-0 mt-1">
              {error.password}
            </span>
          )}
        </div>

        <div className="relative">
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            error={error.confirmPassword}
            className="border p-2 w-full rounded-md"
          />
          {error.confirmPassword && (
            <span className="text-sm text-red-500 absolute top-full left-0 mt-1">
              {error.confirmPassword}
            </span>
          )}
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Register
        </Button>

        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
