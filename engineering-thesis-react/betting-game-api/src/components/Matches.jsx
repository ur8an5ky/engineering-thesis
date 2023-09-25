import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MatchesLoading from './MatchesLoading';
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
  
  const getPhaseHeader = (phase, index) => {
    switch(phase) {
      case 'group':
        return `MATCHDAY ${index + 1}`;
      case 'round of 16':
        return `ROUND OF 16 - PART ${Math.floor(index / 8) + 1}`;
      case 'quarter-final':
        return `QUARTER-FINALS - PART ${Math.floor(index / 4) + 1}`;
      case 'semi-final':
        return `SEMI-FINALS - PART ${Math.floor(index / 2) + 1}`;
      case 'final':
        return 'FINAL';
      default:
        return '';
    }
  };
  
  const MatchesComponent = ({ matches }) => {
    const classes = useStyles();
  
    if (!matches || matches.length === 0) return <p className={classes.centeredText}>No matches available</p>;
  
    let currentPhase = '';
    let counter = 0;
  
    return (
      <Container maxWidth="md" component="main">
        {matches.map((match, index) => {
          let header = '';
          if (currentPhase !== match.phase) {
            currentPhase = match.phase;
            counter = 0;
            header = getPhaseHeader(currentPhase, counter);
          } else if (index % 16 === 0 && currentPhase === 'group' ||
                     index % 8 === 0 && currentPhase === 'round of 16' ||
                     index % 4 === 0 && currentPhase === 'quarter-final' ||
                     index % 2 === 0 && currentPhase === 'semi-final') {
            counter++;
            header = getPhaseHeader(currentPhase, counter);
          }
          return (
            <React.Fragment key={index}>
{header && <Typography variant="h5" gutterBottom className={`${classes.centeredText} ${classes.header}`}>{header}</Typography>}
              <Card key={match.id_match} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2" className={classes.centeredText}>
                  Match ID: {match.id_match}
                </Typography>
                <Typography className={classes.centeredText}>
                  Match: {match.id_hosts} vs {match.id_visitors}
                </Typography>
                <Typography className={classes.centeredText}>
                  Score: {match.score_hosts} - {match.score_visitors}
                </Typography>
                <Typography className={classes.centeredText}>Phase: {match.phase}</Typography>
                <Typography className={classes.centeredText}>Date: {new Date(match.start).toLocaleString()}</Typography>
                {/* <Typography className={classes.centeredText}>
                  Penalties: {match.isPenalties ? 'Yes' : 'No'}
                </Typography> */}
                <Link to={`/match/${match.id_match}`}>View Details</Link>
              </CardContent>
            </Card>
            </React.Fragment>
          );
        })}
      </Container>
    );
  };
  
  const MatchesLoadingComponent = MatchesLoading(MatchesComponent);
  
  const Matches = () => {
    const [appState, setAppState] = useState({
      loading: false,
      matches: null,
    });
  
    useEffect(() => {
      setAppState({ loading: true });
      const apiUrl = 'http://localhost:8000/api/matches/';
      fetch(apiUrl)
        .then((data) => data.json())
        .then((matches) => {
          setAppState({ loading: false, matches: matches });
        });
    }, []);
  
    return <MatchesLoadingComponent isLoading={appState.loading} matches={appState.matches} />;
  };
  
  export default Matches;
  