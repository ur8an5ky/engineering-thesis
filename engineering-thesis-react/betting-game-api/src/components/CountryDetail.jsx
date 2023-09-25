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

const CountryDetail = () => {
  const classes = useStyles();
  const { country } = useParams();
  const [countryTeams, setCountryTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/country/${country}/`)
      .then((response) => response.json())
      .then((data) => {
        const sortedTeams = data.sort((a, b) => {
          if (a.group < b.group) return -1;
          if (a.group > b.group) return 1;
          return 0;
        });
        setCountryTeams(sortedTeams);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country detail:', error);
        setLoading(false);
      });
  }, [country]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h5" className={classes.header}>
        Country: {country.charAt(0).toUpperCase() + country.slice(1)}
      </Typography>

      <Typography variant="h6" className={classes.header}>
        Teams
      </Typography>

      {countryTeams.map((team) => (
        <Card key={team.id_team} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="body1">
              Team: {team.name}
            </Typography>
            <Typography variant="body1">
              City: {team.city}
            </Typography>
            <Typography variant="body1">
              Group: {team.group}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default CountryDetail;
