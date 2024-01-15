import React, { useEffect, useState } from 'react';
import MatchesLoading from './MatchesLoading';
import { decodeJWT } from '../utility';
import MatchesComponent from './MatchesComponent';

const MatchesLoadingComponent = MatchesLoading(MatchesComponent);

const Matches = () => {
  const [appState, setAppState] = useState({
    loading: false,
    matches: null,
  });

  const token = localStorage.getItem('access_token');
  const userData = decodeJWT(token);
  const isStaff = userData && userData.is_staff;

  useEffect(() => {
    setAppState({ loading: true });
    // const apiUrl = 'http://localhost:8000/api/matches/';
    const apiUrl = 'https://localhost/api/matches/';
    fetch(apiUrl)
      .then((data) => data.json())
      .then((response) => {
        setAppState({ 
          loading: false, 
          matches: response,
        });
      });
  }, []);

  return (
    <MatchesLoadingComponent
      isLoading={appState.loading}
      matches={appState.matches}
      isStaff={isStaff}
    />
  );
};

export default Matches;
