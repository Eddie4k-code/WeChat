// Import necessary Material-UI components and styles
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../reduxStore/configureStore';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../reduxStore/slices/userSlice';
import axiosHttp from '../../api/api';

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


const ServerDashboard: React.FC = () => {
  const classes = useStyles();
  const [serverName, setServerName] = useState<string>("");
  const navigate = useNavigate();


  const handleJoinServer = async () => {

    if (serverName.length == 0) {
      toast.error("Room Name cannot be empty!");
      return
    }

    navigate(`/join/${serverName}`);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Server Dashboard
        </Typography>
          {/* Join Server Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Join an Existing Server</Typography>
            <TextField
              label="Room Name"
              variant="outlined"
              fullWidth
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
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
      </Paper>
    </Container>
  );
};

export default ServerDashboard;