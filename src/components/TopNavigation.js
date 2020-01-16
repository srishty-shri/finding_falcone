import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fontColor : {
    color : 'white'
  }
}));
export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <AppBar position="static">
        <Toolbar>
          <Button color="inherit" ><Link className={classes.fontColor} to="/reset">Reset</Link></Button>
          <Button color="inherit"><a className={classes.fontColor} href="https://www.geektrust.in/">Geek Trust Home</a></Button>
        </Toolbar>
      </AppBar> 
    </div>
  );
}
