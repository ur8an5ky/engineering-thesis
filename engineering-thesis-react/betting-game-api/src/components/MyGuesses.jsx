import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(2),
    },
    cardContent: {
        flexGrow: 1,
    },
    centeredText: {
        textAlign: 'center',
    },
    marginTop: {
        marginTop: theme.spacing(4),
    },
    header: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    submitButton: {
        marginTop: theme.spacing(2),
    }
}));

const getTeamNameById = (teams, id) => {
    const team = teams.find(t => t.id_team === id);
    return team ? team.name : 'Unknown';
};

const submitGuess = (matchId, hostScore, visitorScore) => {
    axiosInstance.post('add-guess/', {
        id_match: matchId,
        guess_hosts_score: hostScore,
        guess_visitors_score: visitorScore
    })
    .then(response => {
        console.log("Guess added successfully:", response.data);
    })
    .catch(error => {
        console.error("Error adding guess:", error);
    });
}

const updateGuess = (matchId, hostScore, visitorScore) => {
    axiosInstance.put(`update-guess/${matchId}/`, {
        guess_hosts_score: hostScore,
        guess_visitors_score: visitorScore
    })
    .then(response => {
        console.log("Guess updated successfully:", response.data);
    })
    .catch(error => {
        console.error("Error updating guess:", error);
    });
}


const MyGuesses = () => {
    const classes = useStyles();
    const [data, setData] = useState({ matches: [], teams: [] });
    const [loading, setLoading] = useState(true);
    const [hostScores, setHostScores] = useState({});
    const [visitorScores, setVisitorScores] = useState({});

    const findUserGuessForMatch = (matchId) => {
        return data.my_guesses && data.my_guesses.find(guess => guess.id_match === matchId);
    };

    useEffect(() => {
        axiosInstance.get('my-guesses/')
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching matches:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container maxWidth="md" component="main">
            <Typography variant="h5" gutterBottom className={`${classes.centeredText} ${classes.header}`}>
                My Guesses
            </Typography>
            {data.matches.map((match) => {
                const teamHostName = getTeamNameById(data.teams, match.id_hosts);
                const teamVisitorName = getTeamNameById(data.teams, match.id_visitors);
                const userGuess = findUserGuessForMatch(match.id_match);
                return (
                    <Grid container spacing={3} key={match.id_match}>
                        <Grid item xs={5}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h6" component="h2" className={classes.centeredText}>
                                        Match: {teamHostName} vs. {teamVisitorName}
                                    </Typography>
                                    <Typography className={classes.centeredText}>
                                        Date: {new Date(match.start).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={2} className={`${classes.centeredText} ${classes.marginTop}`}>
                            {userGuess ? (
                                <React.Fragment>
                                    <Typography>
                                        Your Guess: {userGuess.guess_hosts_score} : {userGuess.guess_visitors_score}
                                    </Typography>
                                    <Typography>
                                        Points: {userGuess.points}
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <Typography>
                                    You haven't guessed yet!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: '20px' }}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={4}>
                                    <TextField
                                        type="number"
                                        min="0"
                                        max="15"
                                        label="Host Score"
                                        variant="outlined"
                                        fullWidth
                                        value={hostScores[match.id_match] || ''}
                                        onChange={(e) => setHostScores({...hostScores, [match.id_match]: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={1} className={classes.centeredText}>
                                    :
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        type="number"
                                        min="0"
                                        max="15"
                                        label="Visitor Score"
                                        variant="outlined"
                                        fullWidth
                                        value={visitorScores[match.id_match] || ''}
                                        onChange={(e) => setVisitorScores({...visitorScores, [match.id_match]: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={9} className={classes.centeredText}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.submitButton}
                                    onClick={() => {
                                        if (userGuess) {
                                            updateGuess(match.id_match, hostScores[match.id_match], visitorScores[match.id_match]);
                                        } else {
                                            submitGuess(match.id_match, hostScores[match.id_match], visitorScores[match.id_match]);
                                        }
                                    }}>
                                    {userGuess ? 'CHANGE' : 'SUBMIT'}
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </Container>
    );
};

export default MyGuesses;
