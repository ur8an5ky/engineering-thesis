import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the refresh token from local storage
    const refresh_token = localStorage.getItem('refresh_token');

    // Check if the refresh token exists
    if (refresh_token) {
      // Send a request to the server to blacklist the refresh token
      setTimeout(() => {
		axiosInstance
		  .post('user/logout/blacklist/', { refresh_token })
		  .then(() => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			axiosInstance.defaults.headers['Authorization'] = null;
			navigate('/login');
		  })
		  .catch((error) => {
			// Obsłuż błąd, np. wyświetl komunikat użytkownikowi
			console.error(error);
		  });
	  }, 1000);
    } else {
      // Handle the case where there is no refresh token in local storage
      console.error('No refresh token found in local storage');
      // Redirect the user to the login page or any other desired location
      navigate('/login');
    }
  }, [navigate]);

  return <div>Logging out...</div>; // You can show a message while the logout process is ongoing
}
