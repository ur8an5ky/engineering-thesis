import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { decodeJWT } from '../utility';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#a3a3a3',
    width: '100%', 
    top: 0,
  },
  title: {
    flexGrow: 1,
  },
  link: {
		margin: theme.spacing(1, 1.5),
	},
}));

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {

      setLoggedIn(true);

      const decodedToken = decodeJWT(token);

      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
      }
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link	component={NavLink}	to="/"	underline="none"	color="textPrimary">
                Betting Game for UEFA Champions League 2023/24
						</Link>
          </Typography>
          {loggedIn ? (
            // Jeśli użytkownik jest zalogowany, wyświetl jego nazwę i przycisk wylogowania
            <React.Fragment>
              <Typography variant="body2" color="textPrimary" className={classes.link}>
                You are logged in as: {username}
              </Typography>
              <Button	href="#"	color="primary"	variant="outlined"	className={classes.link}	component={NavLink}	to="/logout">
                Logout
              </Button>
            </React.Fragment>
          ) : (
            // Jeśli użytkownik jest niezalogowany, wyświetl przyciski Login i Register
            <React.Fragment>
              <Link color="textPrimary" href="#" className={classes.link} component={NavLink} to="/register">
                Register
              </Link>
              <Button href="#" color="primary" variant="outlined" className={classes.link} component={NavLink} to="/login">
                Login
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
