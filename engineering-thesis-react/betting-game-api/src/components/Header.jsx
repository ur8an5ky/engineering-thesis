import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import UserContext from '../UserContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosInstance from '../axios';
import logo from '/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#d5dcf2',
    width: '100%',
    top: 0,
  },
  title: {
    flexGrow: 1,
    fontWeight: 500,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  userNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    color: 'rgba(26, 26, 26, 1)',
  },
  userDetail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    marginRight: theme.spacing(2),
  },
  smallText: {
    fontSize: '0.7rem',
    color: 'rgba(222, 222, 222, 1)',
    textAlign: 'center',
    marginRight: theme.spacing(1),
  },
  smallTextPoints: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'rgba(88, 88, 88, 1)',
    textAlign: 'center',
    marginRight: theme.spacing(1),
  },
  pointsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Header() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  useEffect(() => {
    if (user) {
      axiosInstance.get('user-total-points/')
        .then((response) => {
          setUserPoints(response.data.total_points);
        })
        .catch((error) => {
          console.error('Error fetching user points:', error);
        });
    }
  }, [user]);  

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggle}
            ref={anchorRef}
          >
            <MenuIcon />
          </IconButton>

          <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper className={classes.menuPaper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={openMenu} id="menu-list-grow">
                      <MenuItem onClick={handleClose} component={NavLink} to="/matches">
                        Matches
                      </MenuItem>
                      <MenuItem onClick={handleClose} component={NavLink} to="/teams">
                        Teams
                      </MenuItem>
                      {user && (
                        <MenuItem onClick={handleClose} component={NavLink} to="/my-guesses">
                          My Guesses
                        </MenuItem>
                      )}
                      <MenuItem onClick={handleClose} component={NavLink} to="/user-points">
                        Ranking
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} />

          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link component={NavLink} to="/" underline="none" color="textPrimary">
              Betting Game for UEFA Champions League 2023/24
            </Link>
          </Typography>
          {user ? (
            <React.Fragment>
              <div className={classes.userDetail}>
                <div className={classes.userNameContainer}>
                  <Typography variant="body2" color="textPrimary" className={classes.link}>
                    You are logged in as:
                  </Typography>
                  <Typography className={classes.userName}>
                    {user.username}
                  </Typography>
                </div>
                <div className={classes.pointsContainer}>
                  <Typography className={classes.smallText}>
                      You have
                  </Typography>
                  <Typography className={classes.smallTextPoints}>
                      {userPoints}
                  </Typography>
                  <Typography className={classes.smallText}>
                      points!
                  </Typography>
                </div>
              </div>
              <Button href="#" style={{ borderColor: theme.palette.custom.myRed, color: theme.palette.custom.myRed }}
                      variant="outlined" endIcon={<LogoutIcon />} className={classes.link} component={NavLink} to="/logout">
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button href="#" variant="text" style={{ color: theme.palette.custom.myDarkBlue }}
                className={classes.link} component={NavLink} to="/register">
                Register
              </Button>
              <Button href="#" style={{ backgroundColor: theme.palette.custom.myBlue, color: 'white' }} variant="contained" 
                endIcon={<LoginIcon />} className={classes.link} component={NavLink} to="/login">
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
