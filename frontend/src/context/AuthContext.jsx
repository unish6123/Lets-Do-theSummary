import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for the token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
  
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
    }
  
    setLoading(false); // ✅ Done checking localStorage
  }, []);
  
  

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ store user
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // ✅ clear user on logout
  };
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser, loading }}>
    {children}
  </AuthContext.Provider>
  
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
