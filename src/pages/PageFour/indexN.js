import React from "react";
import {Stage, Text, Sprite} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allStages, steps, stepSubgoalMap, vfg, textContent,
        getAllStages, getSteps, getStepInfo, getSubGoal, getStepSubgoalMap} from './dataUtils';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';
import Slider from '@material-ui/core/Slider';
import styles from './index.less';


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
            stageIndex: 0,
            stepInfoIndex: 0,
            showKey: '',
            showPlayButton: true,
            selectedSubGoals: {},
            drawSprites: allStages[0],
            playSpeed: 3,
            playButtonColor: 'primary',
            pauseButtonColor: 'default',
            canvasWidth: 720,
            canvasHeight: 470,
        }

        // Every function that interfaces with UI and data used
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.receiveMessageFromPlugin = this.receiveMessageFromPlugin.bind(this);
    }

    updateWindowDimensions() {
        if(this.refDom){
            const {clientWidth, clientHeight} = this.refDom;
            const tmp_width = Math.max(clientWidth - 550, 720)
            this.setState({ canvasWidth: tmp_width, canvasHeight: Math.min(tmp_width / 2, clientHeight - 120)  },(val)=>{
                console.log('client.inner',clientWidth, clientHeight);
            });
        }
      }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleSubItemClick(key) {
        // this.state.stageIndex = index;
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
        this.updateWindowDimensions();
        this.refDom.addEventListener('resize', this.updateWindowDimensions);
        // this.data = {
        //     action: 'loadfile'
        // }
        // window.parent && window.parent.postMessage(this.data, '*')
        // window.addEventListener("message", this.receiveMessageFromPlugin, false)

    }

    receiveMessageFromPlugin ( event ) {
        if(event.origin!= "http://localhost:3000"){
            console.log( 'iframe is working:', event.origin );
        let contentObject = {};

        const content = localStorage.getItem('fileContent');
        if(content) {
            contentObject = JSON.parse(content);
            allStages = getAllStages();
            steps = getSteps();
            stepInfo =  getStepInfo();
            subGoal = getSubGoal();
            stepSubgoalMap = getStepSubgoalMap();
            vfg = contentObject;
            textContent = content

            this.stepItem = {};
            steps.forEach((step, i) => {
                this.stepItem[i] = React.createRef();
            })
            this.setState({drawSprites: allStages[0]})
        }
        }
    }

    highlight(index) {
        const highlightSubGoals = stepSubgoalMap.get(index) || [];
        const map = {};
        highlightSubGoals.forEach(item => {
            map[item]=true;
        });
        return map;
    }

    animation(index) {
        // 2 sets of sprites
        const previousStageIndex = this.state.stageIndex;
        const previousStage = allStages[previousStageIndex];
        const newStage = allStages[index];
        const times = 20;
        newStage.sort((itemA, itemB) => itemA.depth - itemB.depth);


        const movedSprites = {};
        previousStage.map((eachSprite, i) => {
            if(eachSprite.name !== newStage[i].name) return
            if(eachSprite.x !== newStage[i].x || eachSprite.y !== newStage[i].y) {
                const changingPos = [];
                for (let j = 0; j < times; j++) {
                    const specificPos = {}

                    specificPos.minX = eachSprite.minX + (newStage[i].minX - eachSprite.minX)/times * (j + 1);
                    specificPos.maxX = eachSprite.maxX + (newStage[i].maxX - eachSprite.maxX)/times * (j + 1);
                    specificPos.minY = eachSprite.minY + (newStage[i].minY - eachSprite.minY)/times * (j + 1);
                    specificPos.maxY = eachSprite.maxY + (newStage[i].maxY - eachSprite.maxY)/times * (j + 1);
                    changingPos.push(specificPos)
                }
                movedSprites[eachSprite.name] = changingPos
            }
        })

        // draw 100 times, during 2 seconds, slash: 20ms
        let i = 0;
        if(this.handler) {
            clearInterval(this.handler);
        }
        const handler = setInterval(()=>{
            const newDrawSprites = previousStage.map( sprite => {
                // sprite -> sprite.id
                if(movedSprites[sprite.name]) {
                    const move = movedSprites[sprite.name];
                    // I need to move
                    // Replace old x, y, with computed x, y (which will change per 20ms)
                    // return sprite;

                    return {
                        ...sprite,
                        minX: move[i].minX,
                        maxX: move[i].maxX,
                        maxY: move[i].maxY,
                        minY: move[i].minY
                    };
                } else {
                    // Keep at original position
                    return sprite;
                }
            })

            this.setState({
                drawSprites: [...newDrawSprites]
            });
            i++;

            if( i >= times){
                clearInterval(handler);
                this.handler = false;
                this.setState({
                    drawSprites: [...newStage]
                });
            }
        }, 60/this.state.playSpeed);
        this.handler = handler;
    };

    handleStepsClick(index) {
        // Get Stage[index] sprites, and display
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        this.animation(index)
        const map = this.highlight(index)

        this.setState({
            stageIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        });
        this.animation(index)
    }

    handleSubgoalStepItemClick(value) {
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        const index = Number(value);

        this.animation(index)
        const map = this.highlight(index)

        this.setState({
            stageIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        });
        this.animation(index)
        this.stepItem[index].current.scrollIntoView();
    }

    handlePreviousClick(value) {
        const previousIndex = Number(value) - 1;
        if (previousIndex < 0) {
            alert("It's already the initial state!")
        }
        else{
            this.animation(previousIndex)
            const map = this.highlight(previousIndex)
            this.setState({
                stageIndex: previousIndex,
                stepInfoIndex: previousIndex,
                selectedSubGoals: map
            });
            this.animation(previousIndex)
            this.stepItem[previousIndex].current.scrollIntoView();
        }
    }

    handleNextClick(value) {
        const nextIndex = Number(value) + 1
        if (nextIndex >= steps.length) {
            alert("It's already the final state!")
        }
        else{
            this.animation(nextIndex)
            const map = this.highlight(nextIndex)
            this.setState({
                stageIndex: nextIndex,
                stepInfoIndex: nextIndex,
                selectedSubGoals: map
            });
            this.animation(nextIndex)
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
                stageIndex: nextIndex,
                stepInfoIndex: nextIndex,
                selectedSubGoals: map,
                playButtonColor: 'default',
                pauseButtonColor: 'primary'}
            )
            this.animation(nextIndex)
            this.stepItem[nextIndex].current.scrollIntoView();

            nextIndex++;
            if(this.handlerPlay) {
                clearInterval(this.handlerPlay);
            }
            if(steps.length > nextIndex) {
                const run = () => {
                    const map = this.highlight(nextIndex)
                    this.animation(nextIndex)
                    this.setState({
                        stageIndex: nextIndex,
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
                        const handlerPlay = setTimeout(run, 2700/this.state.playSpeed);
                        this.handlerPlay = handlerPlay;
                    }
                };

                const handlerPlay = setTimeout(run, 2700/this.state.playSpeed);
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
        this.animation(0)
        const map = this.highlight(0)
        this.setState( {
            stageIndex: 0,
            stepInfoIndex: 0,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        })
        this.stepItem[0].current.scrollIntoView();
    }

    handleShowFinalGoalClick(){
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        const index = Number(steps.length) - 1;
        this.animation(index)
        const map = this.highlight(index)
        this.setState( {
            stageIndex: index,
            stepInfoIndex: index,
            selectedSubGoals: map,
            playButtonColor: 'primary',
            pauseButtonColor: 'default'
        })
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

    handleSpeedControllor(value){
        this.setState({
            playSpeed: value
        })
    }
    
    // prevent crash when jumping  to other pages during the animation playing
    componentWillUnmount(){
        if(this.handlerPlay) {
            clearInterval(this.handlerPlay);
        }
        this.refDom.removeEventListener('resize', this.updateWindowDimensions);
        
    }

    render() {
        // Get all sprites
        let sprites = this.state.drawSprites;
        // Sort sprites by their depth
        sprites && sprites.sort((itemA, itemB) => itemA.depth - itemB.depth)
    
        return (
            <div className={styles.container} ref={(ref)=>this.refDom=ref}>
                <div className={styles.left}>
                    <div className={styles.sub_title}> Steps </div>
                    <div className={styles.left_upper}>
                        {
                            steps && steps.map((step, i) => {
                                return <div className={styles.stage_item}
                                            style={{backgroundColor: i === this.state.stepInfoIndex ? '#eef': 'white'}}
                                            onClick={()=>{this.handleStepsClick(i);}}
                                            ref={this.stepItem[i]}
                                            key={i}>
                                    <ul><li className={styles.stage_li} >{i + '. ' + step}</li></ul>
                                </div>;
                            })
                        }
                    </div>
                    <div className={styles.sub_title}> Step Info </div>
                    <div className={styles.step_info}>
                    {
                        stepInfo[this.state.stepInfoIndex]
                    }
                    </div>
                    {/* <div>
                        <div className={styles.sub_title}> Step Info </div>
                        <div className={styles.step_info}>
                        {
                            stepInfo[this.state.stepInfoIndex]
                        }
                        </div>
                    </div> */}
                </div>
                <div className={styles.middle}>
                    <Stage width={this.state.canvasWidth} height={this.state.canvasHeight}
                           options={{backgroundColor: 0xffffff}} key={'main-graph'}>
                        {
                            
                            sprites && sprites.map((sprite, i) => {
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
                                var x = sprite.minX * this.state.canvasHeight
                                // Initialize the y-axis coordinate position of the sprite
                                var y = this.state.canvasHeight - sprite.maxY * this.state.canvasHeight
                                // Initialize the anchor (i.e. the origin point) of the sprite
                                var anchor = (0, 0)
                                // Update the anchor, rotation, (x,y) location if the sprite need to be rotated
                                if ('rotate' in sprite){
                                    anchor = (0.5, 0.5)
                                    rotation = sprite.rotate * Math.PI / 180;
                                    x = sprite.minX * this.state.canvasHeight + (sprite.maxX - sprite.minX) * this.state.canvasHeight/2
                                    y = this.state.canvasHeight - sprite.minY * this.state.canvasHeight
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
                                                width = {(sprite.maxX - sprite.minX) * this.state.canvasHeight}
                                                height = {(sprite.maxY - sprite.minY) * this.state.canvasHeight}
                                                tint = {color}
                                            />
                                            <Text
                                                // text on the sprite
                                                text = {sprite.name}
                                                style = {{fontFamily: 'Arial', fontSize: 16, fill: 0x000000}}
                                                anchor = {(0.5, 0.5)}
                                                x = {x + (sprite.maxX - sprite.minX) * this.state.canvasHeight / 2}
                                                y = {y + (sprite.maxY - sprite.minY) * this.state.canvasHeight / 2}
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
                                                width = {(sprite.maxX - sprite.minX) * this.state.canvasHeight}
                                                height = {(sprite.maxY - sprite.minY) * this.state.canvasHeight}
                                                tint = {color}
                                            />
                                        </>
                                    )
                                } 
                            })
                        }
                    </Stage>
                    <div className={styles.btn_box}>
                    <div>
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
                        <Slider onChange={(event, newValue) => {this.handleSpeedControllor(newValue);}}
                            defaultValue={3}
                            getAriaValueText={valuetext}
                            aria-labelledby="speed-slider"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            valueLabelDisplay="auto"
                            style={{width: '150px'}}
                           // onChangeCommitted={this.handleSpeedControllor()}
                        />
                    </div>
                    </div>
                </div>
                
                <div className={styles.right}>
                    <div style={{marginTop:'5px', marginBottom:'5px', width: '220px'}}>
                        <Button variant="contained" color="primary" size="small" onClick={()=> {this.handleShowFinalGoalClick()}}>
                            Show the Goal
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" color="primary" size="small" onClick={()=> {this.handleExportClick()}}>
                            Export
                        </Button>
                    </div>
                    <div className={styles.sub_title} style={{position: 'relative'}}>
                        <span className={styles.sub_title_key}>Subgoal</span>
                        <span className={styles.sub_title_selected}>{Object.keys(this.state.selectedSubGoals || {}).length}/{subGoal.size}</span>
                    </div>
                    <div className={styles.sub_list}>
                        {   sprites &&
                            [...subGoal.keys()].map(key => {
                                return <div className={styles.sub_item + ' ' + (this.state.selectedSubGoals[key] ? styles.highlight_item : ' ')}
                                            key={key} onClick={()=> {this.handleSubItemClick(key)}}>
                                        {key} 
                                        <div className={styles.sub_item_menu}
                                            style={{display: this.state.showKey === key ? 'block': 'none'}}>
                                            {subGoal.get(key).map(value => {
                                                return <div className={styles.sub_item_menu_item}
                                                            onClick={()=>this.handleSubgoalStepItemClick(value)}
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
