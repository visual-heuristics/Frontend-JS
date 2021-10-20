import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { createTheme } from '@material-ui/core/styles';
import NavigationBar from '@/components/navigationBar/navigationBar';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  // appBar: {
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  //   backgroundColor:"#224878"
  // },
  // toolbar: {
  //   flexWrap: 'wrap',
  // },
  // toolbarTitle: {
  //   flexGrow: 1,
  // },
  // link: {
  //   margin: theme.spacing(1, 1.5),
  // },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:"#224878",
    titleTypographyProps:{ align: 'center',color:"#FFFFFF"},
    color:"#FFFFFF",
    
  },

  itemTitle: {
    whiteSpace: 'pre-wrap'
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Problem',
    pageNo: 1,
    description: ['Build visualisation from problem'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'VFG',
    pageNo: 2,
    description: ['Build visualisation from VFG'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'User Manual',
    pageNo: 3,
    description: ['Source document and user manual'],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
     title: 'Demo',
     pageNo: 4,
     description: ['Demo File for visualisation',""],
     buttonText: 'Sign up for free',
     buttonVariant: 'outlined',
   },
];
// const footers = [
//   {
//     title: 'Company',
//     description: ['Team', 'History', 'Contact us', 'Locations'],
//   },
//   {
//     title: 'Features',
//     description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   {
//     title: 'Legal',
//     description: ['Privacy policy', 'Terms of use'],
//   },
// ];

export default function Home() {
  const classes = useStyles();

  const [num, setNum] = useState();
  const history = useHistory();

  const handleOnClick = (num) => {
    setNum( num + 1 );
    switch(num){
      case 1:
        history.push('/problem');
        break;
      case 2:
        history.push('/vfg');
        break;
      case 3:
        window.open('https://planimation.github.io/documentation/')
        break;
      case 4:
        window.open('https://www.youtube.com/watch?v=Cj2rWdt1YQU')
        break;
      default: return;
    }

    
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <NavigationBar /> */}
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Planimation
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Quickly build an visualisation animation form problem or VFG file shows the plan and subplan for each problem.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="stretch" direction="row">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={3} sm={tier.title === 'Enterprise' ? 12 : 3} md={3}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' , color:"inherit"}}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                
                  
                />
                <CardContent>
                  {/* <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="inherit">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="#FFFFFF">
                      /mo
                    </Typography>
                  </div> */}
                  <ul className={classes.itemTitle}>
                    {tier.description.map((line) => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={()=>handleOnClick(tier.pageNo)}>
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      {/* <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}