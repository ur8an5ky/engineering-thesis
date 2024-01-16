import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(1),
    },
    cardContent: {
        flexGrow: 1,
    },
    centeredText: {
        textAlign: 'center',
    },
    header: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
  },
}));

const Teams = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('http://localhost/api/teams/')
    fetch('http://localhost:8000/api/teams/')
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h5" gutterBottom className={`${classes.centeredText} ${classes.header}`}>
        All Football Teams
      </Typography>
      {teams.map((team) => (
        <Card key={team.id_team} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Link to={`/team/${team.id_team}`}>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.centeredText}>
                            Team: {team.name}
                        </Typography>
                    </Link>
                    <Typography className={classes.centeredText}>
                        Country: {team.country}
                    </Typography>
                    <Typography className={classes.centeredText}>
                        City: {team.city}
                    </Typography>
                    <Typography className={classes.centeredText}>
                        Group: {team.group}
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </Container>
  );
};

export default Teams;
