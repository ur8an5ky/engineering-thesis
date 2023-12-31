import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Matches from './components/Matches';
import MatchDetail from './components/MatchDetail';
import Teams from './components/Teams';
import TeamDetail from './components/TeamDetail';
import GroupDetail from './components/GroupDetail';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';
import MyGuesses from './components/MyGuesses';
import UserPointsTable from './components/UserPointsTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    custom: {
      myBlue: '#003863',
      myDarkBlue: '#0e2d44',
      myRed: '#5e4343',
      myGreen: '#187b00'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            {/* <Route path="/" element={<App />} /> */}

            {/* <Route path="/about-me" element={<App />} />*/}{/* default */}
            {/* <Route path="/about-this-page" element={<App />} />*/}{/* default */}
            {/* <Route path="/rules" element={<App />} />*/}{/* default */}

            <Route path="/" element={<Matches />} />

            <Route path="/matches" element={<Matches />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/team/:id" element={<TeamDetail />} />
            <Route path="/group/:group" element={<GroupDetail />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:country" element={<CountryDetail />} />
            
            <Route path="/user-points" element={<UserPointsTable />} />
            <Route path="/my-guesses" element={<MyGuesses />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </UserProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
