import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: theme.spacing(2),
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '50%',
    textAlign: 'center',
  },
  modalBackdrop: {
    backgroundColor: 'white',
  },
}));

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
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);

  const [idHosts, setIdHosts] = useState(null);
  const [idVisitors, setIdVisitors] = useState(null);
  const [hostsScore, setHostsScore] = useState(0);
  const [visitorsScore, setVisitorsScore] = useState(0);
  const [matchFinished, setMatchFinished] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (match) => {
    setIdHosts(match.id_hosts);
    setIdVisitors(match.id_visitors);
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
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.centeredText}
                >
                  Match ID: {match.id_match}
                </Typography>
                <Typography className={classes.centeredText}>
                  Match: {match.id_hosts} vs {match.id_visitors}
                </Typography>
                <Typography className={classes.centeredText}>
                  Score: {match.score_hosts} - {match.score_visitors}
                </Typography>
                <Typography className={classes.centeredText}>
                  Phase: {match.phase}
                </Typography>
                <Typography className={classes.centeredText}>
                  Date: {new Date(match.start).toLocaleString()}
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="subtitle1">{idHosts}</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="hostsScore"
              label=""
              type="number"
              fullWidth
              inputProps={{ min: 0, max: 15, style: { textAlign: 'right' } }}
              value={hostsScore}
              onChange={(e) => setHostsScore(e.target.value)}
            />
            <Typography variant="subtitle1" style={{ margin: '0 8px' }}>:</Typography>
            <TextField
              margin="dense"
              id="visitorsScore"
              label=""
              type="number"
              fullWidth
              inputProps={{ min: 0, max: 15 }}
              value={visitorsScore}
              onChange={(e) => setVisitorsScore(e.target.value)}
            />
            <Typography variant="subtitle1">{idVisitors}</Typography>
          </div>
          <FormControlLabel
            control={<Checkbox checked={matchFinished} onChange={() => setMatchFinished(!matchFinished)} name="matchFinished" />}
            label="Is match finished?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success" variant="contained" startIcon={<CheckIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MatchesComponent;
