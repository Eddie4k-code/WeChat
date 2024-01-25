import React, { useState } from 'react';
import { Container, Paper, Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { linkClasses } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reduxStore/slices/userSlice';
import { AppDispatch, useAppSelector } from '../../reduxStore/configureStore';




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

const Login = () => {

  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const {user, error} = useAppSelector(state => state.user);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e:React.FormEvent) => {
    //make dispatch to our async thunk method from redux to login user.
    e.preventDefault();
    setLoading(true);
    await dispatch(loginUser({username, password})).then(data => console.log(data));
    console.log(user);
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>
      {error && <h1>{error.error}</h1>}
    </Container>
  );
};

export default Login
