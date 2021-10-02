import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from './index.less';
import {PlayControl, SubGoals, StepsList, ViScreen} from './components/vis';

let vfg = {};

const content = localStorage.getItem('fileContent');
if(content) {
    vfg = JSON.parse(content);
}


const useStyles = makeStyles({
    root: {
      width: 300,
    },
});

class PageFour extends React.Component {
    // init data
    constructor(props) {
        super(props);

        this.state = {
            currentStep : 0,
        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleChangeStep(index){
        this.setState({currentStep : index,})
    }

    render() {
        return(
            <div className ={styles.container}>
                <StepsList vfg={vfg} currentStep={this.state.currentStep}/>
                <div style={{display: 'inline-block'}}> 
                    <ViScreen vfg={vfg}/>
                    <PlayControl vfg={vfg}/>
                    
                </div>
                <SubGoals vfg={vfg}/>
                
            </div>

        );
    }
}


export default PageFour;