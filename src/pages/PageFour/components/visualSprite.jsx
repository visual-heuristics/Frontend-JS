import React, { useState, useReducer } from 'react';
import { utils } from "pixi.js";

const parseVFG = (sprite, vfg, scaleFactor) => {
    const descriptor = {'key': sprite.name,
        'image':"data:image/png;base64," +
        vfg.imageTable.m_values[
        vfg.imageTable.m_keys.indexOf(sprite.prefabimage)
        ],
        'tint': utils.rgb2hex([
            sprite.color.r,
            sprite.color.g,
            sprite.color.b,
        ]), 
        'alpha':sprite.color.a, 'zIndex':sprite.depth,
        'rotation': "rotate" in sprite ? (sprite.rotate * Math.PI) / 180 : 0,
        'height':sprite.height * scaleFactor,
        'width':sprite.width * scaleFactor,
        'x':sprite.x * scaleFactor,
        'y':screenHeight - sprite.y * scaleFactor,
        'anchor':"rotate" in sprite ? [0.8, 0.5] : [0, 1],
        };
    return descriptor;
}

const distance = (key, current, prev) => {
    let x1 = vfg.visualStages[current].visualSprite.filter( el => el.name === key).x;
    let x2 = vfg.visualStages[prev].visualSprite.filter( el => el.name === key).x;
    let y1 = vfg.visualStages[current].visualSprite.filter( el => el.name === key).y;
    let y1 = vfg.visualStages[prev].visualSprite.filter( el => el.name === key).y;
    return {x: x1 - x2, y: y1 - y2}
}

const reducer = (_, { data }) => data

export const VisualSprite =({sprite, vfg, scaleFactor}) => {
    let description = parseVFG(sprite, vfg, scaleFactor);
    let move = distance();

    const [motion, update] = useReducer(reducer, description)
    const iter = useRef(0)

    useTick(delta => {
      const i = (iter.current += 0.05 * delta)
      update({
        type: 'update',
        data: {
          x: Math.sin(i) * 100,
          y: Math.sin(i / 1.5) * 100,
        },
      })
    })
    return (
    <React.Fragment>
      <Sprite
        {...motion}
      />
      <Text
        key={sprite.name + "name"}
        text={sprite.showname ? sprite.name : ""}
        anchor={[-0.75, 1.25]}
        x={sprite.x * scaleFactor}
        y={screenHeight - sprite.y * scaleFactor}
        />
    </React.Fragment>
    )
  }
}
