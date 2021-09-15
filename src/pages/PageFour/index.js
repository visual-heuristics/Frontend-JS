import React from "react";
import {Stage, Container, Sprite, Text, useTick, Graphics} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allBlocks, claw, steps, stepSubgoalMap,initialPos} from './dataUtils';
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

const canvasWidth_Middle = 800
const canvasHeight_Middle = 480
// const canvasWidth_Left = 400
// const canvasHeight_Left = 800

// console.info('subGoal', [...subGoal.keys()]);
//
// console.info('stepSubgoalMap', stepSubgoalMap);


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
            showPlayButton: true,
            selectedSubGoals: {},
            // previousMap: {},
            currentMap: initialPos,
            drawBlocks: allBlocks[0]
        }

        // Every function that interfaces with UI and data used
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleSubItemClick(key) {
        //console.info("handleSubItemClick(), ", key);
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

        const highlightSubGoals = stepSubgoalMap.get(index) || [];
        const map = {};
        highlightSubGoals.forEach(item => {
            map[item]=true;
        });

        this.setState({
            blockIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map
        });

        // 2 sets of blocks
        const previousBlockIndex = this.state.blockIndex;
        const previousBlocks = allBlocks[previousBlockIndex];
        const newBlocks = allBlocks[index];

        // Differ 2 sets of blocks
        // - find out, different blocks;
        // - blockId | blockIndex
        // - blockId => src, x1, y1, dest, x2, y2
        // - blockId => xn, yn: x1 + (x2-x1)/10 * n, ...
        // - blockId => xn, yn
        // - [{blockId1: [xn, yn], blockId2: [xn, yn]},
        // {},
        // {}
        // ]
        // => movedBlocks
        const movedBlocks = {};
        previousBlocks.map((eachBlock, i) => {
            if(eachBlock.x !== newBlocks[i].x || eachBlock.y !== newBlocks[i].y) {
                // 10
                // { blockId => [{x:x1,y:y1}, {x: x2, y: y2}, , x3, .... x10] }
                const changingPos = [];
                for (let j = 0; j < 40; j++) {
                    const specificPos = {}
                    specificPos.x = eachBlock.x + (newBlocks[i].x - eachBlock.x)/40 * (j + 1)
                    specificPos.y = eachBlock.y + (newBlocks[i].y - eachBlock.y)/40 * (j + 1)
                    changingPos.push(specificPos)
                }
                movedBlocks[eachBlock.name] = changingPos
            }
        })
        console.log(movedBlocks)
        // draw 100 times, during 2 seconds, slash: 20ms
        let i = 0;
        const handler = setInterval(()=>{
            const newDrawBlocks = previousBlocks.map( block => {
                // block -> block.id
                if(movedBlocks[block.name]) {
                    const move = movedBlocks[block.name];
                    // I need to move
                    // Replace old x, y, with computed x, y (which will change per 20ms)
                    return {
                        ...block,
                        x: move[i].x,
                        y: move[i].y
                    }
                } else {
                    // Keep at original position
                    return block;
                }
            })
            this.setState({
                drawBlocks: [...newDrawBlocks]
            });

            i++;
            console.info(i, newDrawBlocks);

            if( i >= 40){
                clearInterval(handler);
            }
        }, 50);
    }

    handleStepClick(value) {
        //console.info("handleStepClick", value);
        const index = Number(value);
        const highlightSubGoals = stepSubgoalMap.get(index) || [];
        const map = {};
        highlightSubGoals.forEach(item => {
            map[item]=true;
        });

        this.setState({
            blockIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map
        });
        //console.info('DOM:', this.stepItem[index]);
        this.stepItem[index].current.scrollIntoView();
    }

    handlePreviousClick(value) {
        console.info("handlePreviousClick", value);
        const index = Number(value) - 1;
        if (index < 0) {
            alert("It's already the initial state!")
        }
        else{
            this.setState({
                blockIndex: index,
                stepInfoIndex: index
            });
            console.info('DOM:', this.stepItem[index]);
            this.stepItem[index].current.scrollIntoView();
        }
    }

    handleNextClick(value) {
        console.info("handleNextClick", value);
        const index = Number(value) + 1;
        if (index >= steps.length) {
            alert("It's already the final state!")
        }
        else{
            this.setState({
                blockIndex: index,
                stepInfoIndex: index
            });
            console.info('DOM:', this.stepItem[index]);
            this.stepItem[index].current.scrollIntoView();
        }
    }

    handleShowGoalClick(){
        console.info("handleShowGoalClick");
        const index = Number(steps.length) - 1;
        this.setState({
            blockIndex: index,
            stepInfoIndex: index
        });
        console.info('DOM:', this.stepItem[index]);
        this.stepItem[index].current.scrollIntoView();
    }



    render() {
        // drawBlocks
        const drawBlocks = this.state.drawBlocks;

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
                            drawBlocks.map((block, i) => {
                                // if()
                                // currentBlockPos[block.name] = [block.x/2, block.y/2]
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
                        <IconButton color="primary" style={{float:'left', marginLeft:'6%', marginRight:'5%'}} onClick={()=>{this.handlePreviousClick(this.state.stepInfoIndex);}}>
                            <SkipPreviousIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} >
                            <PlayCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} >
                            <PauseCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} onClick={()=>{this.handleNextClick(this.state.stepInfoIndex);}}>
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
                    <div style={{marginTop:'5px', marginBottom:'5px'}}>
                        <Button variant="contained" color="primary" size="small" onClick={()=> {this.handleShowGoalClick()}}>
                            Show the Goal
                        </Button>
                    </div>
                    <div className={styles.sub_title}>
                        <div className={styles.sub_title_key}>Subgoal</div>
                        <div className={styles.sub_title_selected}>{Object.keys(this.state.selectedSubGoals || {}).length}/10</div>
                    </div>
                    <div className={styles.sub_list}>
                        {
                            [...subGoal.keys()].map(key => {
                                return <div className={styles.sub_item + ' ' + (this.state.selectedSubGoals[key] ? styles.highlight_item : '')}
                                            key={key} onClick={()=> {this.handleSubItemClick(key)}}>
                                    {key}
                                    <div className={styles.sub_item_menu}
                                        style={{display: this.state.showKey === key ? 'block': 'none'}}>
                                        {subGoal.get(key).map(value => {
                                            return <div className={styles.sub_item_menu_item}
                                                        onClick={()=>this.handleStepClick(value)}
                                                        key={key + value}
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

export default PageFour;
