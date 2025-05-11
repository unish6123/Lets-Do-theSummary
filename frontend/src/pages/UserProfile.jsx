import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import Button from '../components/UI/Button'; 

const UserProfile = () => {
  const { user, logoutUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    // localStorage.removeItem('token');
    navigate('/login');
  };

  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); 

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center text-4xl text-gray-600">
          
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{user?.name || 'User Name'}</h2>
        <p className="text-lg text-gray-600 mb-4">{user?.email || 'user@example.com'}</p>
      </div>
      <div className="text-center">
        <Button 
          onClick={handleLogout} 
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
