import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor:"#224878"
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      cursor: 'pointer'
    }
  }));

const nav = {
    problem: '/page1',
    vfg: '/page2',
    manual: '/page3',
    demo: '/page4',
    home: '/'
};

function NavigationBar() {
    const [ url , setUrl ] = useState();
    const history = useHistory();
    const classes = useStyles();
    
    const handleClick = (url) => {
        setUrl(url);
        history.push(nav[url]);
    }

    return(
    <AppBar position="static" background-color="#224878" elevation={0} className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" align="left" noWrap className={classes.toolbarTitle}>
        Planimation
      </Typography>
      <nav>
        <Link variant="button" color="inherit" onClick={()=>handleClick('problem')} className={classes.link}>
          Problem
        </Link>
        <Link variant="button" color="inherit" onClick={()=>handleClick('vfg')} className={classes.link}>
          VFG
        </Link>
        <Link variant="button" color="inherit" onClick={()=>handleClick('manual')} className={classes.link}>
          User Manual
        </Link>
        <Link variant="button" color="inherit" onClick={()=>handleClick('demo')} className={classes.link}>
          Demo
        </Link>
      </nav>
      <Button color="inherit" variant="outlined"onClick={()=>handleClick('home')}  className={classes.link} >
        HomePage
      </Button>
    </Toolbar>
  </AppBar>);
}

export default NavigationBar;