import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext'; // Import kontekstu

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext); // Wykorzystaj kontekst

  useEffect(() => {
    // Wyloguj użytkownika za pomocą funkcji z kontekstu
    logout();

    // Przekieruj użytkownika na stronę główną po wylogowaniu
    navigate('/');

    // Dodatkowe działania po wylogowaniu
  }, [logout, navigate]);

  return <div>Logging out...</div>;
}
