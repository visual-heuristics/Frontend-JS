import React from "react";
import { Stage, Container, Sprite, Text,useTick,Graphics } from '@inlet/react-pixi';
import { utils } from 'pixi.js';
import {initBlocks, claw} from './dataUtils'
const canvasWidth = 800
const canvasHeight = 920
class PageFour extends React.Component {
    // init data
    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function
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

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.handleOnClick}>to homepage</button>
                </div>

                <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xffffff }}>
                    {
                        initBlocks.map((block, i) => {
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
                                            g.drawRect(block.x, canvasHeight - block.y - block.height, block.height, block.width)
                                            g.endFill()
                                        }}
                                    />
                                    <Text
                                        key={`${i}_text`}
                                        text={block.name}
                                        anchor={0.5}
                                        x={block.x + block.width/2}
                                        y={canvasHeight - block.y - block.height/2}
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
                                g.moveTo(claw[0].x, canvasHeight - claw[0].y + claw[0].height/2)
                                g.lineTo(claw[0].x, canvasHeight - claw[0].y)
                                g.lineTo(claw[0].x + claw[0].width, canvasHeight - claw[0].y)
                                g.lineTo(claw[0].x + claw[0].width, canvasHeight - claw[0].y + claw[0].height/2)
                                g.moveTo(claw[0].x + claw[0].width/2, canvasHeight - claw[0].y)
                                g.lineTo(claw[0].x + claw[0].width/2, canvasHeight - claw[0].y - claw[0].height/2)
                                g.moveTo(0, canvasHeight)
                                g.lineTo(canvasWidth, canvasHeight)
                            }}
                        />
                    }

                </Stage>
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
