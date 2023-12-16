import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    centeredText: {
        textAlign: 'center',
    },
    header: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    gridContainer: {
        marginTop: theme.spacing(2),
    },
    card: {
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '60%', // This is 3:5 aspect ratio
    },
}));

const Countries = () => {
    const classes = useStyles();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/countries/')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container maxWidth="md" component="main">
            <Typography variant="h5" gutterBottom className={`${classes.centeredText} ${classes.header}`}>
                Countries
            </Typography>
            <Grid container spacing={3} className={classes.gridContainer}>
                {countries.map((country) => (
                    <Grid item xs={4} key={country}>
                        <Link to={`/country/${country}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card className={classes.card}>
                                <Box>
                                    <CardMedia
                                        className={classes.media}
                                        image={`countries/${country.toLowerCase()}.png`}
                                        title={country}
                                        alt={country}
                                    />
                                    <Typography variant="h6" component="h2" className={classes.centeredText}>
                                        {country}
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Countries;
