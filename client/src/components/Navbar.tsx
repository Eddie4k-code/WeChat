
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    backgroundColor: '#757575', // Use your desired grey color
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Your App Name
        </Typography>
        <Button color="inherit" className={classes.button}>
          Login
        </Button>
        <Button color="inherit" className={classes.button}>
          Register
        </Button>
        <Button color="inherit" className={classes.button}>
          Chat Servers
        </Button>
      </Toolbar>
    </AppBar>
  );
};


