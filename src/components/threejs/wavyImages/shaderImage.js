"use client"
import React from "react";
import { Canvas } from "@react-three/fiber";
import texture1 from "../../../../public/assets/images/landing-page/abraham.svg";
import texture2 from "../../../../public/assets/images/landing-page/abraham.svg";
import texture3 from "../../../../public/assets/images/landing-page/abraham.svg";
import Block from "./block"
import Plane from "./plane"

const textures = [texture1, texture2, texture3];

function ShaderImage() {
  return (
    <Block factor={1}>
      <Canvas>
        {textures.map((texture, index) => (
          <Plane key={index} texture={texture} />
        ))}
      </Canvas>
    </Block>
  );
}

export default ShaderImage;