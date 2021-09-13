import React from "react";
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';



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
      margin: "500",
    },
    cardHeader: {
      backgroundColor:"#224878",
      titleTypographyProps:{ align: 'center',color:"#FFFFFF"},
      color:"#FFFFFF",
      
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
  


class PageTwo extends React.Component {
    // init data


    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function

        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }


    

    render() {
        return (
            <React.Fragment>
            <div>
        
            <Container maxWidth="sm" component="main" className={useStyles.heroContent}>
            <Typography variant="h4" align="center" color="textPrimary" component="p">
                Select VFG file to generate visualisation directly.
                </Typography>
            </Container>


                <Container  maxWidth="sm" component="main">
                <div>
                   
                </div>
                
                <DropzoneArea acceptedFiles={['.vfg']} filesLimit={1} onChange={(files) => console.log('Files:', files)}/>
                
                </Container>

                <Container maxWidth="sm" component="main"  marginTop="50">
                <div margin-top="50">
                <Button variant="contained" color="#224878" onClick={this.handleOnClick} text-align="left">Cancell</Button>
                <Button  variant="contained" color="primary"  startIcon={<CloudUploadIcon />} onClick={this.handleOnClick} text-align="right">Upload File</Button>
                </div>
                </Container>
            </div>
            </React.Fragment>
          );
    }
    
  }
  
  export default PageTwo;