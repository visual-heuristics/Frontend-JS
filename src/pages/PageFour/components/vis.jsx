import { Stage, Sprite, Text, Container } from "@inlet/react-pixi";
import React, { Component } from "react";
import { utils } from "pixi.js";
import { Application } from "pixi.js";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ReplayIcon from "@material-ui/icons/Replay";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}`;
}

export const ViScreen = ({ vfg }) => {
  const screenWidth = 600;
  const screenHeight = 500;
  const scaleFactor = 0.5;
  return (
    <div className={"cap"}>
      <Stage
        width={screenWidth}
        height={screenHeight}
        options={{ backgroundColor: 0xffffff }}
      >
        {vfg.visualStages[0].visualSprites.map((sprite, i) => (
          <React.Fragment key={i}>
            <Sprite
              key={sprite.name}
              image={
                "data:image/png;base64," +
                vfg.imageTable.m_values[
                  vfg.imageTable.m_keys.indexOf(sprite.prefabimage)
                ]
              }
              tint={utils.rgb2hex([
                sprite.color.r,
                sprite.color.g,
                sprite.color.b,
              ])}
              alpha={sprite.color.a}
              height={sprite.height * scaleFactor}
              width={sprite.width * scaleFactor}
              x={sprite.x * scaleFactor}
              y={screenHeight - sprite.y * scaleFactor}
              anchor={[0, 1]}
            />

            <Text
              key={sprite.name + "name"}
              text={sprite.showname ? sprite.name : ""}
              anchor={[-0.75, 1.25]}
              x={sprite.x * scaleFactor}
              y={screenHeight - sprite.y * scaleFactor}
            />
          </React.Fragment>
        ))}
      </Stage>
    </div>
  );
};

export const StepsList = (props) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>
        <h4>Steps</h4>
        {props.vfg.visualStages.map((stages, i) => (
          <li
            key={i}
            style={{
              backgroundColor: i === props.currentStep ? "#eef" : "white",
            }}
          >
            {stages.stageName}
          </li>
        ))}
      </div>
      <div>
        <h4>Step Info</h4>
        {props.vfg.visualStages[props.currentStep].stageInfo}
      </div>
    </div>
  );
};

export const SubGoals = (props) => {
  return (
    <div style={{ display: "inline-block" }}>
      {props.vfg.subgoalMap.m_values.map((stages, i) => (
        <li key={i}>{stages}</li>
      ))}
    </div>
  );
};

export const PlayControl = (props) => {
  const pauseButtonColor = "primary";
  const steps = 0;

  function handlePreviousClick(value) {
    //console.info("handlePreviousClick", value);
    const previousIndex = Number(value) - 1;
    if (previousIndex < 0) {
      alert("It's already the initial state!");
    } else {
      this.diff(previousIndex);
      const map = this.highlight(previousIndex);
      this.setState({
        blockIndex: previousIndex,
        stepInfoIndex: previousIndex,
        selectedSubGoals: map,
      });
      //console.info('DOM:', this.stepItem[index]);
      this.stepItem[previousIndex].current.scrollIntoView();
    }
  }

  function handleNextClick(value) {
    //console.info("handleNextClick", value);
    const nextIndex = Number(value) + 1;
    if (nextIndex >= steps.length) {
      alert("It's already the final state!");
    } else {
      this.diff(nextIndex);
      const map = this.highlight(nextIndex);
      this.setState({
        blockIndex: nextIndex,
        stepInfoIndex: nextIndex,
        selectedSubGoals: map,
      });
      // console.info('DOM:', this.stepItem[index]);
      this.stepItem[nextIndex].current.scrollIntoView();
    }
  }
  function handleStartClick(value) {}

  function handlePauseClick() {
    if (this.handlerPlay) {
      this.setState({
        playButtonColor: "primary",
        pauseButtonColor: "default",
      });
      clearInterval(this.handlerPlay);
    }
  }
  function handleSpeedScroll(value) {
    // console.info(value);
    this.setState({
      playSpeed: value,
    });
  }

  function handleResetClick() {
    if (this.handlerPlay) {
      clearInterval(this.handlerPlay);
    }
    this.diff(0);
    const map = this.highlight(0);
    this.setState({
      blockIndex: 0,
      stepInfoIndex: 0,
      selectedSubGoals: map,
      playButtonColor: "primary",
      pauseButtonColor: "default",
    });
    this.stepItem[0].current.scrollIntoView();
  }

  return (
    <div style={{ display: "block", width: "1080px", height: "50px" }}>
      <IconButton
        color="primary"
        style={{ float: "left", marginLeft: "6%", marginRight: "5%" }}
        onClick={() => {
          handlePreviousClick(props.stepInfoIndex);
        }}
      >
        <SkipPreviousIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={props.playButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          handleStartClick(props.stepInfoIndex);
        }}
      >
        <PlayCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color={pauseButtonColor}
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          handlePauseClick(props.stepInfoIndex);
        }}
      >
        <PauseCircleFilledIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "6%" }}
        onClick={() => {
          handleNextClick(props.stepInfoIndex);
        }}
      >
        <SkipNextIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        style={{ float: "left", marginRight: "10%", marginTop: "5px" }}
        onClick={() => {
          handleResetClick(props.stepInfoIndex);
        }}
      >
        <ReplayIcon fontSize="medium" />
      </IconButton>
      <ul>Speed:</ul>
      <Slider
        onChange={(event, newValue) => {
          handleSpeedScroll(newValue);
        }}
        defaultValue={3}
        getAriaValueText={valuetext}
        aria-labelledby="speed-slider"
        step={1}
        min={1}
        max={5}
        valueLabelDisplay="auto"
        style={{ width: "150px" }}
      />
    </div>
  );
};
