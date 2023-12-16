import React, { createContext, useState, useEffect } from 'react';
import { decodeJWT } from './utility';
import axiosInstance from './axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = decodeJWT(token);

      if (decodedToken && decodedToken.username) {
        setUser({ username: decodedToken.username });
      }
    } else {
      setUser(null);
    }
  }, []);

  const login = (accessToken) => {
    const decodedToken = decodeJWT(accessToken);

    if (decodedToken && decodedToken.username) {
      setUser({ username: decodedToken.username });
      localStorage.setItem('access_token', accessToken);
      axiosInstance.defaults.headers['Authorization'] = 'JWT ' + accessToken;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    axiosInstance.defaults.headers['Authorization'] = null;
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
