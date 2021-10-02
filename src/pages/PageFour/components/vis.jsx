import { Stage, Sprite, Text, Container } from "@inlet/react-pixi";
import React, { Component } from "react";
import { utils } from "pixi.js";
import { Application } from "pixi.js";

export const ViScreen = ({ vfg }) => {
  return (
    <div className={"cap"}>
      <Stage
        width={1080 / 2}
        height={900 / 2}
        options={{ backgroundColor: 0xffffff }}
      >
        <Container position={{ y: 900 / 2 }} scale={{ x: 1, y: -1 }}>
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
                scale={{ x: -0.5, y: 0.5 }}
                rotation={3.1416}
                x={sprite.x / 2}
                y={sprite.y / 2}
                width={sprite.width / 2}
                height={sprite.width / 2}
                anchor={(0, 1)}
              />
              <Text
                key={sprite.name + "name"}
                text={sprite.showname ? sprite.name : ""}
                anchor={(0.5, 1)}
                x={sprite.x / 2}
                y={sprite.y / 2}
                scale={{ x: -1, y: 1 }}
                rotation={3.1416}
              />
            </React.Fragment>
          ))}

          <Text
            // text on the block
            key={"test"}
            text={"test"}
            anchor={(1, 0)}
            x={0}
            y={0}
            scale={{ x: -1, y: 1 }}
            rotation={3.1416}
          />
        </Container>
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
  return (
    <div style={{ display: "block", width: "1080px", height: "50px" }}>
      <input type="button" value="Play" />
      <input type="button" value="Stop" />
    </div>
  );
};
