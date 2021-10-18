import React from "react";
import {Stage, Text, Sprite} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allStages, steps, stepSubgoalMap, vfg, textContent} from './dataUtils';
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
import * as PIXI from 'pixi.js'

const canvasWidth_Middle = 800
const canvasHeight_Middle = 470

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
            drawBlocks: allStages[0],
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
        const previousStageIndex = this.state.blockIndex;
        const previousStage = allStages[previousStageIndex];
        const newStage = allStages[index];
        const times = 20;
        newStage.sort((itemA, itemB) => itemA.depth - itemB.depth);
        // this.setState({
        //     drawBlocks: [...newStage]
        // });
        //
        // requestAnimationFrame(() => {
        //
        // })

        const movedBlocks = {};
        previousStage.map((eachBlock, i) => {
            if(eachBlock.name !== newStage[i].name) return
            if(eachBlock.x !== newStage[i].x || eachBlock.y !== newStage[i].y) {
                // 10
                // { blockId => [{x:x1,y:y1}, {x: x2, y: y2}, , x3, .... x10] }
                const changingPos = [];
                for (let j = 0; j < times; j++) {
                    const specificPos = {}
                    // specificPos.x = eachBlock.x + (newStage[i].x - eachBlock.x)/50 * (j + 1)
                    // specificPos.y = eachBlock.y + (newStage[i].y - eachBlock.y)/50 * (j + 1)
                    specificPos.minX = eachBlock.minX + (newStage[i].minX - eachBlock.minX)/times * (j + 1);
                    specificPos.maxX = eachBlock.maxX + (newStage[i].maxX - eachBlock.maxX)/times * (j + 1);
                    specificPos.minY = eachBlock.minY + (newStage[i].minY - eachBlock.minY)/times * (j + 1);
                    specificPos.maxY = eachBlock.maxY + (newStage[i].maxY - eachBlock.maxY)/times * (j + 1);
                    changingPos.push(specificPos)
                }
                movedBlocks[eachBlock.name] = changingPos
            }
        })

        // draw 100 times, during 2 seconds, slash: 20ms
        let i = 0;
        if(this.handler) {
            clearInterval(this.handler);
        }
        const handler = setInterval(()=>{
            const newDrawBlocks = previousStage.map( block => {
                // block -> block.id
                if(movedBlocks[block.name]) {
                    const move = movedBlocks[block.name];
                    // I need to move
                    // Replace old x, y, with computed x, y (which will change per 20ms)
                    // return block;

                    return {
                        ...block,
                        minX: move[i].minX,
                        maxX: move[i].maxX,
                        maxY: move[i].maxY,
                        minY: move[i].minY
                    };
                } else {
                    // Keep at original position
                    return block;
                }
            })

            this.setState({
                drawBlocks: [...newDrawBlocks]
            });
            i++;
            // console.info(i, newDrawBlocks);

            if( i >= times){
                clearInterval(handler);
                this.handler = false;
                this.setState({
                    drawBlocks: [...newStage]
                });
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
        this.diff(index)
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
        this.diff(index)
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
            this.diff(previousIndex)
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
            this.diff(nextIndex)
           // console.info('DOM:', this.stepItem[index]);
            this.stepItem[nextIndex].current.scrollIntoView();
        }
    }

    handleStartClick(value) {
        let nextIndex = Number(value) + 1
        if(nextIndex === steps.length) {
            alert("It's already the final state!")
        } else {
            const map = this.highlight(nextIndex)
            this.setState({
                blockIndex: nextIndex,
                stepInfoIndex: nextIndex,
                selectedSubGoals: map,
                playButtonColor: 'default',
                pauseButtonColor: 'primary'}
            )
            this.diff(nextIndex)
            this.stepItem[nextIndex].current.scrollIntoView();

            nextIndex++;
            if(this.handlerPlay) {
                clearInterval(this.handlerPlay);
            }
            if(steps.length > nextIndex) {
                const run = () => {
                    const map = this.highlight(nextIndex)
                    this.diff(nextIndex)
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
                        this.setState({
                            playButtonColor: 'primary',
                            pauseButtonColor: 'default'}
                        )
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

    handleExportClick(){
        const data = textContent
        let blob = new Blob([data]);
        let filename = "download.vfg";

        if (typeof window.navigator.msSaveBlob !== "undefined") {
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var blobURL = window.URL.createObjectURL(blob);
            // create a hidden <a> tag for download
            var tempLink = document.createElement("a");
            tempLink.style.display = "none";
            tempLink.href = blobURL;
            tempLink.setAttribute("download", filename);
            if (typeof tempLink.download === "undefined") {
                tempLink.setAttribute("target", "_blank");
            }
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }
    }

    handleSpeedScroll(value){
        // console.info(value);
        this.setState({
            playSpeed: value
        })
    }
    
    componentWillUnmount(){
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
    }

    render() {
        // Get all sprites
        // var sprites = vfg.visualStages[this.state.stepInfoIndex].visualSprites;
        var sprites = this.state.drawBlocks;
        // Sort sprites by their depth
         sprites.sort((itemA, itemB) => itemA.depth - itemB.depth)
    
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.sub_title}> Steps </div>
                    <div className={styles.left_upper}>
                        {
                            steps && steps.map((step, i) => {
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
                            
                            sprites.map((sprite, i) => {
                                // Get the texture name
                                var textureName = sprite.prefabimage
                                // Get the color of the sprite
                                var color = null
                                if(sprite.color) {
                                     color = utils.rgb2hex([sprite.color.r, sprite.color.g, sprite.color.b])
                                }
                                // Initialize the rotation of the sprite
                                var rotation = 0
                                // Initialize the x-axis coordinate position of the sprite
                                var x = sprite.minX * canvasHeight_Middle
                                // Initialize the y-axis coordinate position of the sprite
                                var y = canvasHeight_Middle - sprite.maxY * canvasHeight_Middle
                                // Initialize the anchor (i.e. the origin point) of the sprite
                                var anchor = (0, 0)
                                // Update the anchor, rotation, (x,y) location if the sprite need to be rotated
                                if ('rotate' in sprite){
                                    anchor = (0.5, 0.5)
                                    rotation = sprite.rotate * Math.PI / 180;
                                    x = sprite.minX * canvasHeight_Middle + (sprite.maxX - sprite.minX) * canvasHeight_Middle/2
                                    y = canvasHeight_Middle - sprite.minY * canvasHeight_Middle
                                }
                                // Draw the sprite with a text
                                if (sprite.showname) {
                                    return (
                                        <>
                                            <Sprite
                                                // the image texture of the sprite
                                                image = {"data:image/png;base64,"+vfg.imageTable.m_values[vfg.imageTable.m_keys.indexOf(textureName)]}
                                                name = {sprite.name}
                                                anchor = {anchor}
                                                rotation = {rotation}
                                                x = {x}
                                                y = {y}
                                                width = {(sprite.maxX - sprite.minX) * canvasHeight_Middle}
                                                height = {(sprite.maxY - sprite.minY) * canvasHeight_Middle}
                                                tint = {color}
                                            />
                                            <Text
                                                // text on the sprite
                                                text = {sprite.name}
                                                style = {{fontFamily: 'Arial', fontSize: 16, fill: 0x000000}}
                                                anchor = {(0.5, 0.5)}
                                                x = {x + (sprite.maxX - sprite.minX) * canvasHeight_Middle / 2}
                                                y = {y + (sprite.maxY - sprite.minY) * canvasHeight_Middle / 2}
                                            />
                                        </>
                                    )
                                }
                                // Draw the sprite without text
                                else{
                                    return (
                                        <>
                                            <Sprite
                                                image = {"data:image/png;base64,"+vfg.imageTable.m_values[vfg.imageTable.m_keys.indexOf(textureName)]}
                                                name = {sprite.name}
                                                anchor={anchor}
                                                rotation = {rotation}
                                                x = {x}
                                                y = {y}
                                                width = {(sprite.maxX - sprite.minX) * canvasHeight_Middle}
                                                height = {(sprite.maxY - sprite.minY) * canvasHeight_Middle}
                                                tint = {color}
                                            />
                                        </>
                                    )
                                } 
                            })
                        }
                    </Stage>
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
                        &nbsp;&nbsp;
                        <Button variant="contained" color="primary" size="small" onClick={()=> {this.handleExportClick()}}>
                            Export
                        </Button>
                    </div>
                    <div className={styles.sub_title}>
                        <div className={styles.sub_title_key}>Subgoal</div>
                        <div className={styles.sub_title_selected}>{Object.keys(this.state.selectedSubGoals || {}).length}/{subGoal.size}</div>
                    </div>
                    <div className={styles.sub_list}>
                        {
                            [...subGoal.keys()].map(key => {
                                return <div className={styles.sub_item + ' ' + (this.state.selectedSubGoals[key] ? styles.highlight_item : ' ')}
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
