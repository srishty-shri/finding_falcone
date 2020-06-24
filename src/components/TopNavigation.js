import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export default function ButtonAppBar(props) {
  return <AppBar position="static">
        <Toolbar>
          <Link to="/" className="customlink"><Button color="inherit">RESET</Button></Link>
          <Button color="inherit" href="https://www.geektrust.in/">Geek Trust Home</Button>
        </Toolbar>
      </AppBar>;
}
