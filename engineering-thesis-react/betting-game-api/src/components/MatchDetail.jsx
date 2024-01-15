// fetch(`http://localhost:8000/api/match/${id}/`)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  card: {
    minWidth: 275,
    textAlign: 'center',
  },
  teamName: {
    display: 'flex',
    justifyContent: 'flex-end', // Align to the right
    paddingRight: theme.spacing(2), // Add padding
  },
  teamScore: {
    display: 'flex',
    justifyContent: 'center', // Align score to the center
    alignItems: 'center',
    padding: theme.spacing(2), // Add padding
  },
  teamVs: {
    display: 'flex',
    justifyContent: 'flex-start', // Align to the left
    paddingLeft: theme.spacing(2), // Add padding
  },
  score: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '0 8px', // Ensure the colon is centered by giving it equal margin
  },
}));

const MatchDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/api/match/${id}/`)
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

  return (
    <Container className={classes.container}>
      {match ? (
        <Card className={classes.card}>
          <CardContent>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={5} className={classes.teamName}>
                <Typography variant="h6">
                  {match.hosts_name}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.teamScore}>
                <Typography variant="h5" className={classes.score}>
                  {match.score_hosts} : {match.score_visitors}
                </Typography>
              </Grid>
              <Grid item xs={5} className={classes.teamVs}>
                <Typography variant="h6">
                  {match.visitors_name}
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              Date: {new Date(match.start).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Phase: {match.phase}
              <br />
              Group: {match.match_group}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No match data available.</Typography>
      )}
    </Container>
  );
};

export default MatchDetail;
