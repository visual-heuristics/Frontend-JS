let contentObject = {};

const content = localStorage.getItem('fileContent');
if(content) {
    contentObject = JSON.parse(content);
}

export function getAllStages() {
    const visualStages = contentObject.visualStages || [];
    const stages = visualStages.map(stage => {
        return stage.visualSprites;
    })
    return stages;
}

export function getSteps() {
    return contentObject.visualStages ? contentObject.visualStages.map((s =>s.stageName)) : [];
}

export function getStepInfo() {
    return contentObject.visualStages ? contentObject.visualStages.map((s =>s.stageInfo)) : [];
}


export function getSubGoal() {
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

export function getStepSubgoalMap() {
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

// function getInitialBlocksPos() {
//     if( !contentObject.visualStages) {
//         return {};
//     }
//     const initialPos = {}
//     const blocks = contentObject.visualStages[0].visualSprites.filter(s => s.prefabimage === "img-block");
//     blocks.map((block, i) => {
//         initialPos[block.name] = [block.x/2, block.y/2]
//     })
//     return initialPos;
// }

export const allStages = getAllStages();
export const steps = getSteps();
export const stepInfo =  getStepInfo();
export const subGoal = getSubGoal();
export const stepSubgoalMap = getStepSubgoalMap();
export const vfg = contentObject;
export const textContent = content
//export const initialPos = getInitialBlocksPos();
//export default null;
