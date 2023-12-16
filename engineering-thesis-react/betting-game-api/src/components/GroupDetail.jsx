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

const GroupDetail = () => {
  const classes = useStyles();
  const { group } = useParams();
  const [groupDetail, setGroupDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/group/${group}/`)
      .then((response) => response.json())
      .then((data) => {
        setGroupDetail(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching group detail:', error);
        setLoading(false);
      });
  }, [group]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h5" className={classes.header}>
        Group: {group.toUpperCase()}
      </Typography>

      <Typography variant="h6" className={classes.header}>
        Teams
      </Typography>

      {groupDetail.teams.map((team) => (
        <Card key={team.id_team} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="body1">
              Team: {team.name}
            </Typography>
            <Typography variant="body1">
              Country: {team.country}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" className={classes.header}>
        Matches
      </Typography>

      {groupDetail.matches.map((match) => (
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

export default GroupDetail;
