import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/match/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setMatch(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching match data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (match) {
    return (
      <div>
        <h1>Match ID: {match.id_match}</h1>
        <p>Hosts: {match.id_hosts}</p>
        <p>Visitors: {match.id_visitors}</p>
        <p>Score: {match.score_hosts} - {match.score_visitors}</p>
        <p>Phase: {match.phase}</p>
        <p>Date: {new Date(match.start).toLocaleString()}</p>
      </div>
    );
  }

  return <p>No match data available.</p>;
};

export default MatchDetail;
