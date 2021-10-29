import React from "react";
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import css from '../../Styles/index.module.less';
import Alert from '../../components/alertInFormat'


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
        files: [],
        alertURL: false,
        alertMessage: ''
    }
    // Every function that interfaces with UI and data used 
    // in this class needs to bind like this:
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleAlert = (message) => {
    const state = {...this.state};
    state.alertURL = true;
    state.alertMessage = message;
    this.setState(state);
  }
  
  handleResetAlert = () => {
    const state = {...this.state};
    state.alertURL = false;
    this.setState(state)
  }

  readFileContent(fileHandler) {
    const state = {...this.state};
    if(!FileReader) {
      this.handleAlert('Browser not support FileReader object');
      state.files = [];
      this.setState(state);
        return;
    }

    if(!fileHandler.name.toLowerCase().endsWith('.vfg')) {
        this.handleAlert('Please choose *.vfg file to continue process');
        state.files = [];
        this.setState(state);
        return;
    }
    state.files = [fileHandler];
    this.setState(state);

    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // reader.result
        let content = reader.result || '';
        console.log("Content of file: ", content);
        // Save content for page four
        localStorage.setItem('fileContent', content);
    };
    reader.readAsText(fileHandler);
  }

  handleOnClick() {
    this.props.history.push('/')
  }

  handleFileChange(files) {
    console.info("files: ", files);
    const fileHandler = files[0];

    if(fileHandler) {
        this.readFileContent(fileHandler);
    }
  }

  handleContinue() {
    console.log(this.state.files.length);
    if(this.state.files.length > 0){
      window.location.href = '/demo';
    } else {
      this.handleAlert("No file to process")
    } 
  }

    
render() {
  return (
      <React.Fragment>
        <div className={css.header}>
              <h3 className={css.subtitle}>Build Visualisation From VFG file</h3>
        </div>
        <div>
          <div className={css.buttonBox}>
            <Container maxWidth="sm" component="main" className={useStyles.heroContent}>
              <Typography variant="h4" align="center" color="textPrimary" component="p">
                Select VFG file to generate visualisation directly.
              </Typography>
            </Container>
        </div>
          <Container  maxWidth="sm" component="main">
            <DropzoneArea acceptedFiles={['.vfg']} showAlerts={false} filesLimit={1} fileObjects={this.state.files} onChange={(files) => {this.handleFileChange(files)}}/>
          </Container>

          <Container maxWidth="sm" component="main">
            <div className={css.btnBoxVFG}>
              <Button variant="contained" color="default" onClick={this.handleOnClick} text-align="left">Cancel</Button>
              <Button  variant="contained" color="primary"  startIcon={<CloudUploadIcon />} onClick={()=>this.handleContinue()} text-align="right">Continue</Button>
            </div>
          </Container>
        </div>
        <Alert open={this.state.alertURL} reset={this.handleResetAlert} severity="warning">
                    {this.state.alertMessage}
        </Alert>
      </React.Fragment>
    );
  }   
}
  
export default PageTwo;