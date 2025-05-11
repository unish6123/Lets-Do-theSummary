import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer transform transition duration-500 hover:scale-105"
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
        >
          <div className="bg-white text-indigo-600 text-4xl font-extrabold p-2 rounded-full shadow-lg">
            📚
          </div>
          <span className="text-3xl font-bold text-white tracking-wide">BookStore</span>
        </div>

        <ul className="flex items-center space-x-6">
          {isAuthenticated ? (
            <li className="flex items-center space-x-4">
            <span className="text-white text-lg font-semibold">
                Welcome, {user?.name || 'User'}
              </span>
              <Link to = '/userprofile'>
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              </Link>
              
              {/* <span className="text-white text-lg font-semibold">
                Welcome, {user?.name || 'User'}
              </span> */}

              <button
                onClick={handleLogout}
                className="px-6 py-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Please Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
