import React from "react";
import DropAndFetch from "./dropAndFetch";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const container = {
	width: "100%",
	height: "100%",
	backgroundColor: "#FFFFFF"
}

const header = {
	width: "100%",
	height: "50px",
	backgroundColor: "#20477A"
}

const subtitle = {
	width: "90%",
	height: "5%",
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '2px',
    float: 'left',
    marginTop: '0px',
	marginLeft: '25px',
}

const text = {
    textAlign: 'left',
    marginTop: '2%',
    marginLeft: '25%',
    marginRight: '25%'
}

class PageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url:'',fineUrl:'',};
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleStore = (content)=> {
        localStorage.setItem('fileContent', content);
        window.location.href = '/demo';
    }

    handleNewURL = (urlString) => {
        const url = {...this.state};
        url['url'] = urlString;
        this.setState(url);
    }

    handleSendURL = () => {
        const stt = {...this.state};
        const url = stt.url;
        const pattern = new RegExp('^(https?:\\/\\/)?','i');
        if (!!pattern.test(url)){
            stt['fineUrl'] = url;
        this.setState(stt);
        } else {
        alert('The URL is not valid');
        }
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
              },
            },         
          }));

        return (
            <div style={container}>
                <div style={header}>
                    <h3 style={subtitle}>Build Visualisation From Problem</h3>
                </div>
                <div>
                    <h3 style={text}>
                        Step 1 - Change planner URL (Optional)
                    </h3>
                </div>               
                <form className={useStyles.root} noValidate autoComplete="off">
                    <div style={text}>
                        <TextField onChange={ e => this.handleNewURL(e.target.value)} id="outlined-basic" label="URL" size='small' variant="outlined" style={{float: 'left', width: '90%', marginLeft: '10%'}}/>
                    </div>
                    <div style={{float: 'left', marginLeft: '1%', alignItems: 'center'}}>
                        <Button onClick={this.handleSendURL} variant="contained" color="primary" size="medium">
                            Paste
                        </Button>
                    </div>
                </form>          
                <div style={{marginTop:"5%"}}>
                    <h3 style={text}>
                        Step 2 - Upload Problem, Domain and Animation Profile Files
                    </h3>
                </div>               
                <DropAndFetch onClick={this.handleOnClick} onStore={this.handleStore} newURL={this.state.fineUrl}/>              
            </div>
          );
    }
    
  }
  
  export default PageOne;