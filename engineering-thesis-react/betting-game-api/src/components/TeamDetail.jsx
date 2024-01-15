import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    textAlign: 'center',
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

const TeamDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [teamDetail, setTeamDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/api/team/${id}/`)
    // fetch(`http://localhost:8000/api/team/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTeamDetail(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching team detail:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h5" className={classes.header}>
        Team: {teamDetail.team.name}
      </Typography>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">Country: {teamDetail.team.country}</Typography>
          <Typography variant="body1">City: {teamDetail.team.city}</Typography>
          <Typography variant="body1">Group: {teamDetail.team.group}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" className={classes.header}>
        Matches
      </Typography>

      {teamDetail.matches.map((match) => (
        <Card key={match.id_match} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="body1">
              Match ID: {match.id_match}
            </Typography>
            <Typography variant="body1">
              Match: {match.id_hosts} vs {match.id_visitors}
            </Typography>
            <Typography variant="body1">
              Score: {match.score_hosts} - {match.score_visitors}
            </Typography>
            <Typography variant="body1">
                Date: {new Date(match.start).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default TeamDetail;
