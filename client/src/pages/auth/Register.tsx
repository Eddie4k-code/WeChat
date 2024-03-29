import React, { ReactEventHandler, useState, useEffect } from 'react';
import { Container, Paper, Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { linkClasses } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../reduxStore/configureStore';
import { registerUser } from '../../reduxStore/slices/userSlice';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8) + theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.grey[500], 
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.grey[700], 
    color: theme.palette.common.white,
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {


    useEffect(() => {
      /* If user is already logged in redirect them to dashbaord (if "user" in localStorage were invalid they would then be redirected back to login*/
      if (localStorage.getItem("user")) {
        navigate("/dashboard")
      }
    }, [])

    e.preventDefault();
    setLoading(true);
    await dispatch(registerUser({username:username, password: password})).then(data => console.log(data));

    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;