
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { NavLink} from 'react-router-dom';
import { useAppSelector } from '../reduxStore/configureStore';

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
  const {user} = useAppSelector(state => state.user);

  const authenticatedNavItems = [
    {name: "Chat Servers", path:"/servers"},
  ]

  const notAuthenticatedNavItems = [
    {name: "Login", path:"/login"},
    {name: "Register", path:"/register"}
  ]


  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          WeChat
        </Typography>
        
        {user ? (
        //show nav items that require authentication
        authenticatedNavItems.map(item => (
          <Typography key={item.name} color="inherit" className={classes.button} component={NavLink} to={item.path}>
          {item.name}
        </Typography>

        ))

       
    
      ) : (
        // show nav items that dont require authentication
        notAuthenticatedNavItems.map(item => (
          <Typography key={item.name} color="inherit" className={classes.button} component={NavLink} to={item.path}>
          {item.name}
        </Typography>

        ))
      )}


      </Toolbar>
    </AppBar>
  );
};


