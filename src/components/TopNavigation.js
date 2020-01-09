import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MainContents from './Contents';
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
}));
export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <AppBar position="static">
        <Toolbar>
          <Button color="inherit"><Link to="/">Reset</Link></Button>
          <Button color="inherit">Geek Trust Home</Button>
        </Toolbar>
      </AppBar> 
    </div>
  );
}
