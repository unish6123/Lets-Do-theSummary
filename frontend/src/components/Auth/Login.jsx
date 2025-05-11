import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/authService';
import { validateLoginForm } from '../../utils/validations';
import InputField from '../UI/InputField';
import Button from '../UI/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateLoginForm(email, password);
  
    if (!validationErrors || typeof validationErrors !== 'object') {
      setError({ email: 'Unknown error', password: 'Unknown error' });
      toast.error('Unknown error');
      return;
    }
  
    if (validationErrors.email || validationErrors.password) {
      setError(validationErrors);
      if (validationErrors.email) toast.error(validationErrors.email);
      if (validationErrors.password) toast.error(validationErrors.password);
      return;
    }
  
    setIsLoading(true);
    setError({ ...error, general: '' }); // Clear any previous general errors

    try {
      const data = await login(email, password);
      
      loginUser(data.user);  // This should now store the token
      localStorage.setItem('token', data.token); // Ensure token is saved in localStorage
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError({ ...error, general: err.message });
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {error.general && (
          <div className="text-sm text-red-500">{error.general}</div>
        )}

        <div className="relative">
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((prev) => ({ ...prev, email: '' }));
            }}
            error={error.email}
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
          />
          {error.password && (
            <span className="text-sm text-red-500 absolute top-full left-0 mt-1">
              {error.password}
            </span>
          )}
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Login
        </Button>
        
        <div className="text-center mt-2">
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 font-semibold">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
