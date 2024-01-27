// Import necessary Material-UI components and styles
import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../reduxStore/configureStore';

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
  const [serverName, setServerName] = useState<string>("");
  const {user} = useAppSelector(state => state.user);

  
  const handleCreateServer = async () => {

    const response = await axios.get('/server/create', {params: {serverName: serverName, username: user!.username}}); 
    
    console.log("Server Created", response.data.server.serverName);

  };

  
  const handleJoinServer = () => {
    
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
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
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