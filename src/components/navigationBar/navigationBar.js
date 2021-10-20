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
    },
    alink: {
      color: '#ffffff',
      textDecoration: 'none'
    }
  }));

const nav = {
    problem: '/problem',
    vfg: '/vfg',
    manual: 'https://planimation.github.io/documentation/ ',
    demo: 'https://www.youtube.com/watch?v=Cj2rWdt1YQU',
    home: '/'
};

function NavigationBar() {
    const [ url , setUrl ] = useState();
    const history = useHistory();
    const classes = useStyles();
    
    const handleClick = (url) => {
        setUrl(url);
        if(url==='manual'){
          // window.location.href(nav[url])
        }else if(url==='demo'){
          // window.location.href(nav[url])
        }
        else{
          history.push(nav[url]);

        }
    }

    return(
    <AppBar position="static" elevation={0} className={classes.appBar}>
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
        <Link variant="button" color="inherit" className={classes.link}>
          <a href={'https://planimation.github.io/documentation/'} target='_blank' rel="noreferrer" className={classes.alink}>User Manual</a>
        </Link>
        <Link variant="button" color="inherit" onClick={()=>handleClick('demo')} className={classes.link}>
        <a href={'https://www.youtube.com/watch?v=Cj2rWdt1YQU'} target='_blank' rel="noreferrer" className={classes.alink}>Demo</a>
        </Link>
      </nav>
      <Button color="inherit" variant="outlined"onClick={()=>handleClick('home')}  className={classes.link} >
        HomePage
      </Button>
    </Toolbar>
  </AppBar>);
}

export default NavigationBar;