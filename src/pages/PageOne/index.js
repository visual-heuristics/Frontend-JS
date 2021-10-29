import React from "react";
import DropAndFetch from "./dropAndFetch";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '../../components/alertInFormat';
import css from '../../Styles/index.module.less';


class PageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url:'',fineUrl:'',alertURL:false, alertMessage: ''};
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSendURL = this.handleSendURL.bind(this);
    }

    handleOnClick = () => {
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
        const state = {...this.state};
        const url = state.url;
        const pattern = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;

        if (!!pattern.test(url)){
            state['fineUrl'] = url;
        this.setState(state);
        } else {
            this.handleAlert('The URL is not valid'); 
        }
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
            <div className={css.container}>
                <div className={css.header}>
                    <h3 className={css.subtitle}>Build Visualisation From Problem</h3>
                </div>
                <div>
                    <h3 className={css.text}>
                        Step 1 - Change planner URL (Optional)
                    </h3>
                </div>               
                <form className={useStyles.root} noValidate autoComplete="off">
                    <div className={css.text}>
                        <TextField onChange={ e => this.handleNewURL(e.target.value)} id="outlined-basic" label="URL" size='small' variant="outlined" style={{float: 'left', width: '90%', marginLeft: '10%'}}/>
                    </div>
                    <div style={{float: 'left', marginLeft: '1%', alignItems: 'center'}}>
                        <Button onClick={this.handleSendURL} variant="contained" color="primary" size="medium">
                            Paste
                        </Button>
                    </div>
                </form>          
                <div>
                    <h3 className={css.text}>
                        Step 2 - Upload Problem, Domain and Animation Profile Files
                    </h3>
                </div>               
                <DropAndFetch onClick={this.handleOnClick} onStore={this.handleStore} newURL={this.state.fineUrl}/>  
                <Alert open={this.state.alertURL} reset={this.handleResetAlert} severity="warning">
                    {this.state.alertMessage}
                </Alert>           
            </div>
          );
    }
    
  }
  
  export default PageOne;