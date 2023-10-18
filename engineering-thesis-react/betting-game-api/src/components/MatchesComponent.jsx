import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
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
  modalBackdrop: {
    backgroundColor: 'white',
  },
  matchId: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    color: 'rgba(91, 91, 91, 0.065)',
    backgroundColor: 'transparent',
    padding: theme.spacing(0.5),
    borderRadius: '4px',
    fontSize: '8rem',
    fontWeight: 'bold',
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  scoreDisplay: {
    fontSize: '1.5rem',
    color: 'rgba(26, 26, 26, 0.6)',
  },
    halfWidthInput: {
    width: '50%',
  },
}));

const updateScore = (matchId, hostScore, visitorScore, isFinished) => {
  axiosInstance.put(`update-match/${matchId}/`, {
      score_hosts: hostScore,
      score_visitors: visitorScore,
      toVerifyPoints: isFinished,
  })
  .then(response => {
      console.log("Guess updated successfully:", response.data);
      window.location.reload();
  })
  .catch(error => {
      console.error("Error updating guess:", error);
  });
}


const getPhaseHeader = (phase, index) => {
  switch (phase) {
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

const MatchesComponent = ({ matches, isStaff }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState(null);
  const [hostsName, setHostsName] = useState(null);
  const [visitorsName, setVisitorsName] = useState(null);
  const [hostsScore, setHostsScore] = useState(0);
  const [visitorsScore, setVisitorsScore] = useState(0);
  const [matchFinished, setMatchFinished] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (match) => {
    setCurrentMatchId(match.id_match);
    setHostsName(match.hosts_name);
    setVisitorsName(match.visitors_name);
    setOpen(true);
  };

  if (!matches || matches.length === 0)
    return <p className={classes.centeredText}>No matches available</p>;

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
        } else if (
          (index % 16 === 0 && currentPhase === 'group') ||
          (index % 8 === 0 && currentPhase === 'round of 16') ||
          (index % 4 === 0 && currentPhase === 'quarter-final') ||
          (index % 2 === 0 && currentPhase === 'semi-final')
        ) {
          counter++;
          header = getPhaseHeader(currentPhase, counter);
        }
        const phaseDisplay = match.phase.charAt(0).toUpperCase() + match.phase.slice(1) + 
                     (match.match_group && /^[A-H]$/.test(match.match_group) ? ` ${match.match_group}` : '');
        return (
          <React.Fragment key={index}>
            {header && (
              <Typography
                variant="h5"
                gutterBottom
                className={`${classes.centeredText} ${classes.header}`}
              >
                {header}
              </Typography>
            )}
            <Card key={match.id_match} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.matchId}>
                  {match.id_match}
                </Typography>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item xs={5} style={{ textAlign: 'right' }}>
                    <Typography className={classes.teamName}>
                      {match.hosts_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <Typography className={`${classes.centeredText} ${classes.scoreDisplay}`}>
                    {match.toVerifyPoints ? `${match.score_hosts} : ${match.score_visitors}` : ' vs '}
                  </Typography>
                  </Grid>
                  <Grid item xs={5} style={{ textAlign: 'left' }}>
                    <Typography className={classes.teamName}>
                      {match.visitors_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography className={classes.centeredText}>
                  {phaseDisplay}
                </Typography>
                <Typography className={classes.centeredText}>
                  {new Date(match.start).toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<InfoIcon />}
                      onClick={() => navigation(`/match/${match.id_match}`)}
                    >
                      View Details
                    </Button>
                  </Grid>
                  {isStaff && (
                    <Grid item>
                      <Box ml={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(match)}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </React.Fragment>
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={4.5}>
            <Typography variant="subtitle1">{hostsName}</Typography>
          </Grid>
          <Grid item xs={1}>
            <TextField
              autoFocus
              margin="dense"
              id="hostsScore"
              label=""
              type="number"
              inputProps={{ min: 0, max: 15, style: { textAlign: 'right' } }}
              value={hostsScore}
              onChange={(e) => setHostsScore(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>:</Typography>
          </Grid>
          <Grid item xs={1}>
            <TextField
              margin="dense"
              id="visitorsScore"
              label=""
              type="number"
              inputProps={{ min: 0, max: 15 }}
              value={visitorsScore}
              onChange={(e) => setVisitorsScore(e.target.value)}
            />
          </Grid>
          <Grid item xs={4.5}>
            <Typography variant="subtitle1">{visitorsName}</Typography>
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox checked={matchFinished} onChange={() => setMatchFinished(!matchFinished)} name="matchFinished" />}
          label="Is match finished?"
        />
      </DialogContent>
        <DialogActions>
        <Button 
            variant="contained" 
            style={{ backgroundColor: theme.palette.custom.myGreen, color: 'white' }}
            className={classes.submitButton}
            startIcon={<CheckIcon />}
            onClick={() => {
                updateScore(currentMatchId, hostsScore, visitorsScore, matchFinished);
            }}>
            Save
        </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MatchesComponent;
