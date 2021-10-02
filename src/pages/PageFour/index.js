import React from "react";
import {Stage, Text, Graphics, Sprite} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './index.less';
import {PlayControl, SubGoals, StepsList, ViScreen, TestVis} from './components/vis';

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