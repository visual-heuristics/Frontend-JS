import React from "react";
import {Stage, Text, Graphics, Sprite} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allBlocks, claw, steps, stepSubgoalMap, vfg} from './dataUtils';
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
            drawBlocks: allBlocks[0],
            playSpeed: 3,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
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

    highlight(index) {
        const highlightSubGoals = stepSubgoalMap.get(index) || [];
        const map = {};
        highlightSubGoals.forEach(item => {
            map[item]=true;
        });
        return map;
    }

    diff(index) {
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
                for (let j = 0; j < 50; j++) {
                    const specificPos = {}
                    specificPos.x = eachBlock.x + (newBlocks[i].x - eachBlock.x)/50 * (j + 1)
                    specificPos.y = eachBlock.y + (newBlocks[i].y - eachBlock.y)/50 * (j + 1)
                    changingPos.push(specificPos)
                }
                movedBlocks[eachBlock.name] = changingPos
            }
        })
        //console.log(movedBlocks)
        // draw 100 times, during 2 seconds, slash: 20ms
        let i = 0;
        if(this.handler) {
            clearInterval(this.handler);
        }
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
            //console.info(i, newDrawBlocks);

            if( i >= 50){
                clearInterval(handler);
                this.handler = false;
            }
        }, 60/this.state.playSpeed);
        this.handler = handler;
    };

    handleSwitchStage(index) {
        // Get Stage[index] blocks, and display
        //console.info("handleSwitchStage(), ", index);
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        this.diff(index)
        const map = this.highlight(index)

        this.setState({
            blockIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        });
    }

    handleStepClick(value) {
        //console.info("handleStepClick", value);
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        const index = Number(value);

        this.diff(index)
        const map = this.highlight(index)

        this.setState({
            blockIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        });
        //console.info('DOM:', this.stepItem[index]);
        this.stepItem[index].current.scrollIntoView();
    }

    handlePreviousClick(value) {
        //console.info("handlePreviousClick", value);
        const previousIndex = Number(value) - 1;
        if (previousIndex < 0) {
            alert("It's already the initial state!")
        }
        else{
            this.diff(previousIndex)
            const map = this.highlight(previousIndex)
            this.setState({
                blockIndex: previousIndex,
                stepInfoIndex: previousIndex,
                selectedSubGoals: map
            });
            //console.info('DOM:', this.stepItem[index]);
            this.stepItem[previousIndex].current.scrollIntoView();
        }
    }

    handleNextClick(value) {
        //console.info("handleNextClick", value);
        const nextIndex = Number(value) + 1
        if (nextIndex >= steps.length) {
            alert("It's already the final state!")
        }
        else{
            this.diff(nextIndex)
            const map = this.highlight(nextIndex)
            this.setState({
                blockIndex: nextIndex,
                stepInfoIndex: nextIndex,
                selectedSubGoals: map
            });
           // console.info('DOM:', this.stepItem[index]);
            this.stepItem[nextIndex].current.scrollIntoView();
        }
    }

    handleStartClick(value) {
        let nextIndex = Number(value) + 1
        if(nextIndex === steps.length) {
            alert("It's already the final state!")
        } else {
            this.diff(nextIndex)
            const map = this.highlight(nextIndex)
            this.setState({
                blockIndex: nextIndex,
                stepInfoIndex: nextIndex,
                selectedSubGoals: map,
                playButtonColor: 'default',
                pauseButtonColor: 'primary'}
            )
            this.stepItem[nextIndex].current.scrollIntoView();

            nextIndex++;
            if(this.handlerPlay) {
                clearInterval(this.handlerPlay);
            }
            if(steps.length > nextIndex) {
                const run = () => {
                    this.diff(nextIndex)
                    const map = this.highlight(nextIndex)
                    this.setState({
                        blockIndex: nextIndex,
                        stepInfoIndex: nextIndex,
                        selectedSubGoals: map
                    })
                    this.stepItem[nextIndex].current.scrollIntoView();

                    nextIndex++;

                    if (nextIndex >= steps.length) {
                        if(this.handlerPlay) {
                            clearTimeout(this.handlerPlay);
                        }
                    } else {
                        // setInterval effect
                        // detect change of playSpeed
                        const handlerPlay = setTimeout(run, 3000/this.state.playSpeed);
                        this.handlerPlay = handlerPlay;
                    }
                };

                const handlerPlay = setTimeout(run, 3000/this.state.playSpeed);
                this.handlerPlay = handlerPlay;
            }
        }
    }

    handlePauseClick() {
        if(this.handlerPlay) {
            this.setState( {
                playButtonColor: 'primary',
                pauseButtonColor: 'default'
            })
            clearInterval(this.handlerPlay);
        }
    }

    handleResetClick() {
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        this.diff(0)
        const map = this.highlight(0)
        this.setState( {
            blockIndex: 0,
            stepInfoIndex: 0,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        })
        this.stepItem[0].current.scrollIntoView();
    }

    handleShowGoalClick(){
        //console.info("handleShowGoalClick");
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        const index = Number(steps.length) - 1;
        this.diff(index)
        const map = this.highlight(index)
        this.setState( {
            blockIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        })
       // console.info('DOM:', this.stepItem[index]);
        this.stepItem[index].current.scrollIntoView();
    }

    handleSpeedScroll(value){
        // console.info(value);
        this.setState({
            playSpeed: value
        })
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

                            //reading directly from vfg, but in a (future) generalisable way, we don't know if there are claws or blocks
                            //we just render them all, which is easier

                            <Sprite
                            image={"data:image/png;base64,"+vfg.imageTable.m_values[vfg.imageTable.m_keys.indexOf('img-claw')]} 
                            scale={{ x: 0.5, y: 0.5 }}
                            anchor={(0,0)}
                            x={canvasWidth_Middle/4-50} // this must be extracted from vfg, this is just example
                            
                        
                            />
                            /*<Graphics
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
                            */
                        }
                    </Stage>
                    {/*controller buttons*/}
                    <div style={{height:'50px'}}>
                        <IconButton color="primary" style={{float:'left', marginLeft:'6%', marginRight:'5%'}} onClick={()=>{this.handlePreviousClick(this.state.stepInfoIndex);}}>
                            <SkipPreviousIcon fontSize="large" />
                        </IconButton>
                        <IconButton color={this.state.playButtonColor} style={{float:'left', marginRight:'6%'}} onClick={()=>{this.handleStartClick(this.state.stepInfoIndex);}}>
                            <PlayCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color={this.state.pauseButtonColor} style={{float:'left', marginRight:'6%'}} onClick={()=>{this.handlePauseClick(this.state.stepInfoIndex);}}>
                            <PauseCircleFilledIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'6%'}} onClick={()=>{this.handleNextClick(this.state.stepInfoIndex);}}>
                            <SkipNextIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" style={{float:'left', marginRight:'10%', marginTop:'5px'}} onClick={()=>{this.handleResetClick(this.state.stepInfoIndex);}}>
                            <ReplayIcon fontSize="medium" />
                        </IconButton>
                        <ul>Speed:</ul>
                        <Slider onChange={(event, newValue) => {this.handleSpeedScroll(newValue);}}
                            defaultValue={3}
                            getAriaValueText={valuetext}
                            aria-labelledby="speed-slider"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            valueLabelDisplay="auto"
                            style={{width: '150px'}}
                           // onChangeCommitted={this.handleSpeedScroll()}
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
                        <div className={styles.sub_title_selected}>{Object.keys(this.state.selectedSubGoals || {}).length}/{subGoal.size}</div>
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
