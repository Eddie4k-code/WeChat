// Import necessary Material-UI components and styles
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

// Define styles using makeStyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(5)
    },
    paper: {
      padding: theme.spacing(3),
    },
    button: {   
      marginTop: theme.spacing(2),
    },
  })
);

// Define the ServerDashboard component
const ServerDashboard: React.FC = () => {
  const classes = useStyles();

  // Dummy function for handling server creation
  const handleCreateServer = () => {
    // Implement your logic for server creation here
    console.log('Creating a new server...');
  };

  // Dummy function for handling joining a server
  const handleJoinServer = () => {
    // Implement your logic for joining a server here
    console.log('Joining an existing server...');
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Server Dashboard
        </Typography>
        <Grid container spacing={2}>
          {/* Create Server Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Create a New Server</Typography>
            <TextField
              label="Server Name"
              variant="outlined"
              fullWidth
              // Add necessary props and state for handling input
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCreateServer}
            >
              Create Server
            </Button>
          </Grid>

          {/* Join Server Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Join an Existing Server</Typography>
            <TextField
              label="Server Code"
              variant="outlined"
              fullWidth
              // Add necessary props and state for handling input
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleJoinServer}
            >
              Join Server
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ServerDashboard;