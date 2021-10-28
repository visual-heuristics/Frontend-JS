import React from "react";
import { Stage, Text, Sprite } from "@inlet/react-pixi";
import { utils } from "pixi.js";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ReplayIcon from "@material-ui/icons/Replay";
import Slider from "@material-ui/core/Slider";
import styles from "./index.less";
import { steps } from "./dataUtils";

function valuetext(value) {
  return `${value}`;
}

export default function ViScreen({ canvasWidth, canvasHeight, sprites, vfg }) {
  return (
    <React.Fragment>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        options={{ backgroundColor: 0xffffff }}
        key={"main-graph"}
      >
        {sprites.map((sprite, i) => {
          // Get the texture name
          let textureName = sprite.prefabimage;
          // Get the color of the sprite
          let color = null;
          if (sprite.color) {
            color = utils.rgb2hex([
              sprite.color.r,
              sprite.color.g,
              sprite.color.b,
            ]);
          }
          // Initialize the rotation of the sprite
          let rotation = 0;
          // Initialize the x-axis coordinate position of the sprite
          let x = sprite.minX * canvasHeight;
          // Initialize the y-axis coordinate position of the sprite
          let y = canvasHeight - sprite.maxY * canvasHeight;
          // Initialize the anchor (i.e. the origin point) of the sprite
          let anchor = (0, 0);
          let alpha = sprite.color.a;
          // Update the anchor, rotation, (x,y) location if the sprite need to be rotated
          if ("rotate" in sprite) {
            anchor = (0.5, 0.5);
            rotation = (sprite.rotate * Math.PI) / 180;
            x =
              sprite.minX * canvasHeight +
              ((sprite.maxX - sprite.minX) * canvasHeight) / 2;
            y = canvasHeight - sprite.minY * canvasHeight;
          }
          // Draw the sprite with a text
          <React.Fragment key={i}>
            <Sprite
              // the image texture of the sprite
              image={
                "data:image/png;base64," +
                vfg.imageTable.m_values[
                  vfg.imageTable.m_keys.indexOf(sprite.prefabimage)
                ]
              }
              name={sprite.name}
              anchor={anchor}
              rotation={rotation}
              x={x}
              y={y}
              width={(sprite.maxX - sprite.minX) * canvasHeight}
              height={(sprite.maxY - sprite.minY) * canvasHeight}
              tint={color}
              alpha={alpha}
            />
            ;
            <Text
              // text on the sprite
              text={sprite.showname ? sprite.name : ""}
              style={{ fontFamily: "Arial", fontSize: 16, fill: 0x000000 }}
              anchor={(0.5, 0.5)}
              x={x + ((sprite.maxX - sprite.minX) * canvasHeight) / 2}
              y={y + ((sprite.maxY - sprite.minY) * canvasHeight) / 2}
            />
            ;
          </React.Fragment>;
        })}
      </Stage>
    </React.Fragment>
  );
}

export function ControlPanel(props) {
  const { playButtonColor, pauseButtonColor, stepInfoIndex } = props;

  return (
    <React.Fragment>
      <IconButton
        color="primary"
        style={{ float: "left", marginLeft: "6%", marginRight: "5%" }}
        onClick={() => {
          this.handlePreviousClick(stepInfoIndex);
        }}
      >
        <SkipPreviousIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={playButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          this.handleStartClick(stepInfoIndex);
        }}
      >
        <PlayCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={pauseButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          this.handlePauseClick(stepInfoIndex);
        }}
      >
        <PauseCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          this.handleNextClick(stepInfoIndex);
        }}
      >
        <SkipNextIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "10%", marginTop: "5px" }}
        onClick={() => {
          this.handleResetClick(stepInfoIndex);
        }}
      >
        <ReplayIcon fontSize="medium" />
      </IconButton>
      <ul>Speed:</ul>
      <Slider
        onChange={(event, newValue) => {
          this.handleSpeedControllor(newValue);
        }}
        defaultValue={3}
        getAriaValueText={valuetext}
        aria-labelledby="speed-slider"
        step={1}
        marks
        min={1}
        max={5}
        valueLabelDisplay="auto"
        style={{ width: "150px" }}
      />
    </React.Fragment>
  );
}

export function StepScreen({ stepInfoIndex, stepItem, stepInfo }) {
  return (
    <React.Fragment>
      <div className={styles.sub_title}> Steps </div>
      <div className={styles.left_upper}>
        {steps &&
          steps.map((step, i) => {
            <div
              className={styles.stage_item}
              style={{
                backgroundColor: i === stepInfoIndex ? "#eef" : "white",
              }}
              onClick={() => {
                this.handleStepsClick(i);
              }}
              ref={stepItem[i]}
              key={i}
            >
              <ul>
                <li className={styles.stage_li}>{i + ". " + step}</li>
              </ul>
            </div>;
          })}
        <div className={styles.sub_title}> Step Info </div>
        <div className={styles.step_info}>{stepInfo[stepInfoIndex]}</div>
      </div>
    </React.Fragment>
  );
}

/*export function GoalScreen() {
    return ( 

     );
}
*/
