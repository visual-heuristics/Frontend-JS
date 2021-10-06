import { Stage, Sprite, Text, Container } from "@inlet/react-pixi";
import React, { Component, useState } from "react";
import { utils } from "pixi.js";
import { Application } from "pixi.js";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ReplayIcon from "@material-ui/icons/Replay";
import Slider from "@material-ui/core/Slider";

export const ViScreen = ({ vfg, onUpdateStep, currentStep }) => {
  const screenWidth = 600;
  const screenHeight = 500;
  const scaleFactor = 0.5;
  //const [currentStep, setStep] = useState(0);

  return (
    <div className={"cap"}>
      <Stage
        width={screenWidth}
        height={screenHeight}
        options={{ backgroundColor: 0xffffff }}
      >
        <Container sortableChildren={true}>
          {vfg.visualStages[currentStep].visualSprites.map((sprite, i) => (
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
                zIndex={sprite.depth}
                rotation={
                  "rotate" in sprite ? (sprite.rotate * Math.PI) / 180 : 0
                }
                {...sprite}
                height={sprite.height * scaleFactor}
                width={sprite.width * scaleFactor}
                x={sprite.x * scaleFactor}
                y={screenHeight - sprite.y * scaleFactor}
                anchor={"rotate" in sprite ? [0.8, 0.5] : [0, 1]}
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
        </Container>
      </Stage>
    </div>
  );
};

export const StepsList = ({ vfg, currentStep, onUpdateStep }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>
        <h4>Steps</h4>
        {vfg.visualStages.map((stages, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i === currentStep ? "#eef" : "white",
            }}
            onClick={() => {
              onUpdateStep(i);
            }}
          >
            {stages.stageName}
          </div>
        ))}
      </div>
      <div style={{ width: "120px" }}>
        <h4>Step Info</h4>
        {vfg.visualStages[currentStep].stageInfo}
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

  function handlePreviousClick(value) {}

  function handleNextClick(value) {}

  function handleStartClick(value) {}

  function handlePauseClick() {}

  function handleSpeedScroll(value) {}

  function handleResetClick() {}

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
        style={{ width: "200px" }}
      />
    </div>
  );
};
