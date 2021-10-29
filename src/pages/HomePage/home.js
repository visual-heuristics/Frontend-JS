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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
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
    </React.Fragment>
  );
}