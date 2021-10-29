import React from "react";
import {subGoal, stepInfo, allStages, steps, stepSubgoalMap, vfg, textContent,
        getAllStages, getSteps, getStepInfo, getSubGoal, getStepSubgoalMap} from './dataUtils';
import Button from '@material-ui/core/Button';
import styles from './index.less';
import Screen, { ControlPanel, StepScreen, GoalScreen } from "./screenComponents";


class PageFour extends React.Component {

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



    handleSubItemClick = (key) => {
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
        
    }



    receiveMessageFromPlugin ( event ) {
        if(event.origin!== "http://localhost:3000"){
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


    /**
     * Change the style of the highlighted subgoal
     * @param {Integer} index 
     * @returns 
     */
    highlight(index) {
        const highlightSubGoals = stepSubgoalMap.get(index) || [];
        const map = {};
        highlightSubGoals.forEach(item => {
            map[item]=true;
        });
        return map;
    }


    /**
     * Calculate and diplays interpolation animation between two stages
     * @param {Integer} index 
     */
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



    handleStepsClick = (index) =>{
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



    handleSubgoalStepItemClick = (value) => {
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



    handlePreviousClick = (value) => {
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



    handleNextClick = (value) => {
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



    handleStartClick = (value) => {
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



    handlePauseClick = () => {
        if(this.handlerPlay) {
            this.setState( {
                playButtonColor: 'primary',
                pauseButtonColor: 'default'
            })
            clearInterval(this.handlerPlay);
        }
    }



    handleResetClick = () => {
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



    handleShowFinalGoalClick = () =>{
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



    handleExportClick = () =>{
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



    handleSpeedControllor = (value) => {
        this.setState({
            playSpeed: value
        })
    }

    
    /**
     * prevent crash when jumping  to other pages during the animation playing
     *  */
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
                    <StepScreen stepInfoIndex={this.state.stepInfoIndex} stepItem={this.stepItem} stepInfo={stepInfo} onStepClick={this.handleStepsClick}/>
                </div>
                <div className={styles.middle}>
                    <Screen canvasWidth={this.state.canvasWidth} canvasHeight={this.state.canvasHeight}  sprites={this.state.drawSprites} vfg={vfg} />
                    <div className={styles.btn_box}>
                        <div>
                            <ControlPanel 
                            playButtonColor={this.state.playButtonColor} 
                            pauseButtonColor={this.state.pauseButtonColor}
                            stepInfoIndex={this.state.stepInfoIndex}
                            onPreviousClick={this.handlePreviousClick}
                            onStartClick={this.handleStartClick}
                            onPauseClick={this.handlePauseClick}
                            onNextClick={this.handleNextClick}
                            onResetClick={this.handleResetClick}
                            onSpeedControllor={this.handleSpeedControllor}></ControlPanel>
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
                    <GoalScreen sprites={sprites} subGoal={subGoal} selectedSubGoals={this.state.selectedSubGoals}
                      showKey={this.state.showKey} onSubItemClick={this.handleSubItemClick} onSubgoalStepItemClick={this.handleSubgoalStepItemClick}/>
                </div>
            </div>
    );
    }
}

export default PageFour;
