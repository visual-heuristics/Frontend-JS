import React from "react";
import {Stage, Container, Sprite, Text, useTick, Graphics} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allBlocks, claw, steps} from './dataUtils';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './index.less';

const canvasWidth_Middle = 800
const canvasHeight_Middle = 480
// const canvasWidth_Left = 400
// const canvasHeight_Left = 800

console.info('subGoal', [...subGoal.keys()]);


const useStyles = makeStyles({
    root: {
      width: 300,
    },
});
  
function valuetext(value) {
    return `${value}`;
}

class PageFour extends React.Component {
    // init data
    constructor(props) {
        super(props);

        
        this.stepItem = {};
        steps.forEach((step, i) => {
            this.stepItem[i] = React.createRef();
        })

        this.state = {
            // data that will be used/changed in render function
            blockIndex: 0,
            stepInfoIndex: 0,
            showKey: '',
            showPlayButton: true

        }
        // Every function that interfaces with UI and data used
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleSubItemClick(key) {
        console.info("handleSubItemClick(), ", key);
        // this.state.blockIndex = index;
        if(this.state.showKey !== key) {
            this.setState({
                showKey: key,
            });
        } else {
            this.setState({
                showKey: "",
            });
        }
    }

    componentDidMount() {
    }

    handleSwitchStage(index) {
        // Get Stage[index] blocks, and display
        console.info("handleSwitchStage(), ", index);
        // this.state.blockIndex = index;
        this.setState({
            blockIndex: index,
            stepInfoIndex: index
        });
    }

    handleStepClick(value) {
        console.info("handleStepClick", value);
        const index = Number(value);
        this.setState({
            blockIndex: index,
            stepInfoIndex: index
        });
        console.info('DOM:', this.stepItem[index]);
        this.stepItem[index].current.scrollIntoView();
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.sub_title}> Steps </div>
                    <div className={styles.left_upper}>
                        {
                            steps.map((step, i) => {
                                return <div className={styles.stage_item}
                                            style={{backgroundColor: i === this.state.stepInfoIndex ? '#eef': 'white'}}
                                            onClick={()=>{this.handleSwitchStage(i);}}
                                            ref={this.stepItem[i]}
                                            key={i}>
                                    <ul><li className={styles.stage_li} >{i + '. ' + step}</li></ul>
                                </div>;
                            })
                        }
                    </div>
                    <div>
                        <div className={styles.sub_title}> Step Info </div>
                        <div className={styles.step_info}>
                        {
                            stepInfo[this.state.stepInfoIndex]
                        }
                        </div>
                    </div>
                </div>
                <div className={styles.middle}>
                    <Stage width={canvasWidth_Middle} height={canvasHeight_Middle}
                           options={{backgroundColor: 0xffffff}} key={'main-graph'}>
                        {
                            allBlocks[this.state.blockIndex].map((block, i) => {
                                const color = utils.rgb2hex([block.color.r, block.color.g, block.color.b])
                                //console.log(block)
                                return (
                                    <>
                                        <Graphics
                                            // draw the block
                                            key={`${i}_graphic`}
                                            draw={g => {
                                                g.clear();
                                                g.lineStyle(0)
                                                g.beginFill(color, 1.0)
                                                g.drawRect(block.x/2, canvasHeight_Middle - block.y/2 - block.height/2, block.height/2, block.width/2)
                                                g.endFill()
                                            }}
                                        />
                                        <Text
                                            // text on the block
                                            key={`${i}_text`}
                                            text={block.name}
                                            anchor={0.5}
                                            x={block.x/2 + block.width/4}
                                            y={canvasHeight_Middle - block.y/2 - block.height/4}
                                        />
                                    </>
                                )
                            })
                        }
                        {
                            // Draw the claw
                            <Graphics
                                key={`${0}_claw`}
                                draw={g => {
                                    g.clear();
                                    g.lineStyle(2, 0x000000, 1)
                                    g.moveTo(claw[0].x/2, canvasHeight_Middle - claw[0].y/2 + claw[0].height/4 -10)
                                    g.lineTo(claw[0].x/2, canvasHeight_Middle - claw[0].y/2 -10)
                                    g.lineTo(claw[0].x/2 + claw[0].width/2, canvasHeight_Middle - claw[0].y/2 -10)
                                    g.lineTo(claw[0].x/2 + claw[0].width/2, canvasHeight_Middle - claw[0].y/2 + claw[0].height/4 -10)
                                    g.moveTo(claw[0].x/2 + claw[0].width/2 - 20, canvasHeight_Middle - claw[0].y/2 -10)
                                    g.lineTo(claw[0].x/2 + claw[0].width/2 - 20, canvasHeight_Middle - claw[0].y/2 - claw[0].height/4 -10)
                                    g.moveTo(0, canvasHeight_Middle)
                                    g.lineTo(canvasWidth_Middle, canvasHeight_Middle)
                                }}
                            />
                        }
                    </Stage>
                    {/*controller buttons*/}
                    <div style={{height:'50px'}}>
                        <IconButton color="primary" style={{float:'left', marginLeft:'6%', marginRight:'5%'}}>
                            <SkipPreviousIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} >
                            <PlayCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} >
                            <PauseCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}}>
                            <SkipNextIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'10%', marginTop:'5px'}}>
                            <ReplayIcon fontSize="medium" />
                        </IconButton>
                        <ul>Speed:</ul>
                        <Slider
                            defaultValue={3}
                            getAriaValueText={valuetext}
                            aria-labelledby="speed-slider"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            valueLabelDisplay="auto"
                            style={{width: '150px'}}     
                        />
                    </div>
                </div>
                
                <div className={styles.right}>
                    <div className={styles.sub_title}>Subgoal</div>
                    <div className={styles.sub_list}>
                        {
                            [...subGoal.keys()].map(key => {
                                return <div className={styles.sub_item} key={key} onClick={()=> {this.handleSubItemClick(key)}}>
                                    {key}
                                    <div className={styles.sub_item_menu}
                                        style={{display: this.state.showKey === key ? 'block': 'none'}}>
                                        {subGoal.get(key).map(value => {
                                            return <div className={styles.sub_item_menu_item}
                                                        onClick={()=>this.handleStepClick(value)}
                                                        key={key}
                                            >Step {value}</div>
                                        })}
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
    );
    }
}
