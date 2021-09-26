import d from './blockWorld.js';
// let contentObject = d;
let contentObject = {};

const content = localStorage.getItem('fileContent');
if(content) {
    contentObject = JSON.parse(content);
}

function getAllBlocks() {
    const stages = contentObject.visualStages || [];

    const blocks = stages.map(stage => {
        return stage.visualSprites.filter(s => s.prefabimage === "img-block");
    })

    return blocks;
}

function getClaw() {
    return contentObject.visualStages ? contentObject.visualStages[0].visualSprites.filter(s => s.prefabimage === "img-claw") : [];
}

function getSteps() {
    return contentObject.visualStages ? contentObject.visualStages.map((s =>s.stageName)) : [];
}

function getStepInfo() {
    return contentObject.visualStages ? contentObject.visualStages.map((s =>s.stageInfo)) : [];
}

function getSubGoal() {
    if( !contentObject.subgoalMap) {
        return {};
    }
    let map = new Map();
    const subgoal = contentObject.subgoalMap.m_values;
    const step = contentObject.subgoalMap.m_keys;
    subgoal.map((subgoalList, i) => {
        const currentStep = subgoalList[subgoalList.length-1];
        if (!map.has(currentStep)) {
            let vidualSteps = []
            for(var i=0;i<step.length;i++){
                for(var j=0;j<subgoal[i].length;j++){
                    if(currentStep==subgoal[i][j]){
                        vidualSteps.push(step[i]);
                    }
                }
            }
            map.set(currentStep, vidualSteps)
         }
    })
    return map;
}

function getStepSubgoalMap() {
    if( !contentObject.subgoalMap) {
        return {};
    }
    let map = new Map();
    const steps = contentObject.subgoalMap.m_keys;
    const subgoalList = contentObject.subgoalMap.m_values;
    steps.map((step, i) => {
        map.set(step, subgoalList[i])
    })
    return map;
}


function getInitialBlocksPos() {
    if( !contentObject.visualStages) {
        return {};
    }
    const initialPos = {}
    const blocks = contentObject.visualStages[0].visualSprites.filter(s => s.prefabimage === "img-block");
    blocks.map((block, i) => {
        initialPos[block.name] = [block.x/2, block.y/2]
    })
    return initialPos;
}

export const allBlocks = getAllBlocks();
export const claw = getClaw();
export const steps = getSteps();
export const stepInfo =  getStepInfo();
export const subGoal = getSubGoal();
export const stepSubgoalMap = getStepSubgoalMap();
//export default null;

export const initialPos = getInitialBlocksPos();

