import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#a3a3a3',
    // position: 'fixed',
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
  const classes = useStyles();
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
          <nav>
						<Link	color="textPrimary"	href="#"	className={classes.link}	component={NavLink}	to="/register">
							Register
						</Link>
					</nav>
					<Button	href="#"	color="primary"	variant="outlined"	className={classes.link}	component={NavLink}	to="/login">
						Login
					</Button>
					<Button	href="#"	color="primary"	variant="outlined"	className={classes.link}	component={NavLink}	to="/logout">
						Logout
					</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
