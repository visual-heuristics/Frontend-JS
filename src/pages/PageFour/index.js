import React from "react";
import {Stage, Container, Sprite, Text, useTick, Graphics} from '@inlet/react-pixi';
import {utils} from 'pixi.js';
import {subGoal, stepInfo, allBlocks, claw, steps} from './dataUtils';

import styles from './index.less';

const canvasWidth_Middle = 800
const canvasHeight_Middle = 800
const canvasWidth_Left = 400
const canvasHeight_Left = 800

console.info('subGoal', [...subGoal.keys()]);

class PageFour extends React.Component {
    // init data
    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function
            blockIndex: 0,
            stepInfoIndex: 0
        }
        // Every function that interfaces with UI and data used
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/')
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

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.left_upper}>
                        <div className={styles.sub_title}> Steps </div>
                        {
                            steps.map((step, i) => {
                                return <div onClick={()=>{this.handleSwitchStage(i);}} key={i}><ul><li className={styles.stage_li}>{i + '. ' + step}</li></ul></div>;
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
                    <div>
                        <button onClick={this.handleOnClick}>to homepage</button>
                    </div>
                    <Stage width={canvasWidth_Middle} height={canvasHeight_Middle}
                           options={{backgroundColor: 0xffffff}} key={'main-graph'}>
                        {
                            allBlocks[this.state.blockIndex].map((block, i) => {
                                const color = utils.rgb2hex([block.color.r, block.color.g, block.color.b])
                                //console.log(block)
                                return (
                                    <>
                                        <Graphics
                                            key={`${i}_graphic`}
                                            draw={g => {
                                                g.clear();
                                                g.lineStyle(0)
                                                g.beginFill(color, 1.0)
                                                g.drawRect(block.x, canvasHeight_Middle - block.y - block.height, block.height, block.width)
                                                g.endFill()
                                            }}
                                        />
                                        <Text
                                            key={`${i}_text`}
                                            text={block.name}
                                            anchor={0.5}
                                            x={block.x + block.width / 2}
                                            y={canvasHeight_Middle - block.y - block.height / 2}
                                        />
                                    </>
                                )
                            })
                        }
                        {
                            <Graphics
                                key={`${0}_claw`}
                                draw={g => {
                                    g.clear();
                                    g.lineStyle(4, 0x000000, 1)
                                    g.moveTo(claw[0].x, canvasHeight_Middle - claw[0].y + claw[0].height / 2 + 200)
                                    g.lineTo(claw[0].x, canvasHeight_Middle - claw[0].y + 200)
                                    g.lineTo(claw[0].x + claw[0].width, canvasHeight_Middle - claw[0].y + 200)
                                    g.lineTo(claw[0].x + claw[0].width, canvasHeight_Middle - claw[0].y + claw[0].height / 2 + 200)
                                    g.moveTo(claw[0].x + claw[0].width / 2, canvasHeight_Middle - claw[0].y + 200)
                                    g.lineTo(claw[0].x + claw[0].width / 2, canvasHeight_Middle - claw[0].y - claw[0].height / 2 + 200)
                                    g.moveTo(0, canvasHeight_Middle)
                                    g.lineTo(canvasWidth_Middle, canvasHeight_Middle)
                                }}
                            />
                        }

                    </Stage>
                </div>
                <div className={styles.right}>
                    <div className={styles.sub_title}>Subgoal</div>
                    <div className={styles.sub_list}>
                        {
                            [...subGoal.keys()].map(key => {
                                return <div className={styles.sub_item}>{key}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
    );
    }

}

export default PageFour;
// export default function () {
//     const [x, setX] = React.useState(0);
//     const mask = React.useRef();
//     const i = React.useRef(0);
//
//     useTick(delta => {
//         i.current += 0.05 * delta;
//         setX(Math.cos(i.current) * 100);
//     });
//
//     return (
//         <div>
//             <div>
//                 Hello Page four!
//             </div>
//             <div>
//                 <button onClick={this.handleOnClick}>to homepage</button>
//             </div>
//
//             <Stage>
//                 <Sprite
//                     image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
//                     scale={[4, 4]}
//                     anchor={0.5}
//                     mask={mask.current}
//                 />
//
//             </Stage>
//         </div>
//     );
// }
