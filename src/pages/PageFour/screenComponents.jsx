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

/**
 * Helper function to use in Slider MUI component
 * @param {*} value
 * @returns
 */
function valuetext(value) {
  return `${value}`;
}

/**
 * Function component that parse each sprite and adjust the VFG data to PixiJS format
 * and renders them into screen.
 * @param {Integer} canvasWidth
 * @param {Integer} canvasHeight
 * @param {Array} sprites
 * @param {Object} vfg file
 * @returns Main visualisation screen with all sprites
 */
export default function Screen({ canvasWidth, canvasHeight, sprites, vfg }) {
  return (
    <React.Fragment>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        options={{ backgroundColor: 0xffffff }}
        key={"main-graph"}
      >
        {sprites.map((sprite, i) => {
          // Initialize the rotation of the sprite
          let rotation = 0;
          // Initialize the x-axis coordinate position of the sprite
          let x = sprite.minX * canvasHeight;
          // Initialize the y-axis coordinate position of the sprite
          let y = canvasHeight - sprite.maxY * canvasHeight;
          // Initialize the anchor (i.e. the origin point) of the sprite
          let anchor = (0, 0);
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
          return (
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
                tint={
                  "color" in sprite
                    ? utils.rgb2hex([
                        sprite.color.r,
                        sprite.color.g,
                        sprite.color.b,
                      ])
                    : null
                }
                alpha={sprite.color.a}
              />
              <Text
                // text on the sprite
                text={sprite.showname ? sprite.name : ""}
                style={{ fontFamily: "Arial", fontSize: 16, fill: 0x000000 }}
                anchor={(0.5, 0.5)}
                x={x + ((sprite.maxX - sprite.minX) * canvasHeight) / 2}
                y={y + ((sprite.maxY - sprite.minY) * canvasHeight) / 2}
              />
            </React.Fragment>
          );
        })}
      </Stage>
    </React.Fragment>
  );
}

/**
 * Renders panel with buttons to control animation: play, stop,
 * previous and next step, restart from begining and speed
 * @param {Style} playButtonColor  from pageFour state
 * @param {Style} pauseButtonColor from pageFour state
 * @param {Integer} stepInfoIndex from pageFour state
 * @param {function} onPreviousClick to handle previous button click event
 * @param {function} onStartClick to handle play button click event
 * @param {function} onPauseClick to handle pause button click event
 * @param {function} onNextClick to handle next button click event
 * @param {function} onResetClick to handle reset button click event
 * @param {function} onSpeedControllor to handle speed slider change event
 * @returns Control panel
 */
export function ControlPanel({
  playButtonColor,
  pauseButtonColor,
  stepInfoIndex,
  onPreviousClick,
  onStartClick,
  onPauseClick,
  onNextClick,
  onResetClick,
  onSpeedControllor,
}) {
  return (
    <React.Fragment>
      <IconButton
        color="primary"
        style={{ float: "left", marginLeft: "6%", marginRight: "5%" }}
        onClick={() => {
          onPreviousClick(stepInfoIndex);
        }}
      >
        <SkipPreviousIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={playButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          onStartClick(stepInfoIndex);
        }}
      >
        <PlayCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={pauseButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          onPauseClick(stepInfoIndex);
        }}
      >
        <PauseCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          onNextClick(stepInfoIndex);
        }}
      >
        <SkipNextIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "10%", marginTop: "5px" }}
        onClick={() => {
          onResetClick(stepInfoIndex);
        }}
      >
        <ReplayIcon fontSize="medium" />
      </IconButton>
      <ul>Speed:</ul>
      <Slider
        onChange={(event, newValue) => {
          onSpeedControllor(newValue);
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

/**
 * Renders list of steps and step info on the left side of the screen
 * @param {Integer} stepInfoIndex from pageFour state
 * @param {Array} stepItem list of steps from dataUtils VFG parser
 * @param {Array} stepInfo list of steps info from dataUtils VFG parser
 * @param {function} onStepClick handle change current step click event
 * @returns list of steps and info
 */
export function StepScreen({ stepInfoIndex, stepItem, stepInfo, onStepClick }) {
  return (
    <React.Fragment>
      <div className={styles.sub_title}> Steps </div>
      <div className={styles.left_upper}>
        {steps &&
          steps.map((step, i) => (
            <div
              className={styles.stage_item}
              style={{
                backgroundColor: i === stepInfoIndex ? "#eef" : "white",
              }}
              onClick={() => {
                onStepClick(i);
              }}
              ref={stepItem[i]}
              key={i}
            >
              <ul>
                <li className={styles.stage_li}>{i + ". " + step}</li>
              </ul>
            </div>
          ))}
      </div>
      <div className={styles.sub_title}> Step Info </div>
      <div className={styles.step_info}>{stepInfo[stepInfoIndex]}</div>
    </React.Fragment>
  );
}

/**
 * Renders subgoal menu
 *
 * @param {Array} sprites list of sprites from dataUtils VFG parser
 * @param {Array} subGoal list of subgoals from dataUtils VFG parser
 * @param {Object} selectedSubGoals from pageFour state
 * @param {String} showKey from pageFour state
 * @param {function} onSubItemClick handle change current subgoal change event
 * @param {function} onSubgoalStepItemClick handle show subgoals step list event
 * @returns
 */
export function GoalScreen({
  sprites,
  subGoal,
  selectedSubGoals,
  showKey,
  onSubItemClick,
  onSubgoalStepItemClick,
}) {
  return (
    <React.Fragment>
      <div className={styles.sub_title} style={{ position: "relative" }}>
        <span className={styles.sub_title_key}>Subgoal</span>
        <span className={styles.sub_title_selected}>
          {Object.keys(selectedSubGoals || {}).length}/{subGoal.size}
        </span>
      </div>
      <div className={styles.sub_list}>
        {sprites &&
          [...subGoal.keys()].map((key) => {
            return (
              <div
                className={
                  styles.sub_item +
                  " " +
                  (selectedSubGoals[key] ? styles.highlight_item : " ")
                }
                key={key}
                onClick={() => {
                  onSubItemClick(key);
                }}
              >
                {key}
                <div
                  className={styles.sub_item_menu}
                  style={{ display: showKey === key ? "block" : "none" }}
                >
                  {subGoal.get(key).map((value) => {
                    return (
                      <div
                        className={styles.sub_item_menu_item}
                        onClick={() => onSubgoalStepItemClick(value)}
                        key={key + value}
                      >
                        Step {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}
