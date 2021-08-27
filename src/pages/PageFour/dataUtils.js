import d from './test.js';

//console.log(d);

function getInitBlocks() {
    return d.visualStages[0].visualSprites.filter(s => s.prefabimage === "img-block");
}

function getClaw() {
    return d.visualStages[0].visualSprites.filter(s => s.prefabimage === "img-claw");
}


export const initBlocks = getInitBlocks();
export const claw = getClaw();


export default null;


