"use client"
// import React, { useRef } from 'react'
// import {Canvas,extend} from '@react-three/fiber'
// import { shaderMaterial } from '@react-three/drei'
// import * as THREE from 'three';

// const WaveShaderMaterial = shaderMaterial(
//   // Uniform
//   { uColor: new THREE.Color(0.0, 0.0, 0.0) },

//   // Vertex shader
//   `
// varying vec2 vUv;

// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `,

//   // Fragment shader
//  `
// uniform vec3 uColor;
// varying vec2 vUv;

// void main() {
//   gl_FragColor = vec4(uColor, 1.0);
// }
// `
// );
// extend({WaveShaderMaterial});


//   export const ShaderImage = () => {

//     return (
//       <Canvas>
//         <pointLight position={[10, 10, 10]} />
//         <mesh>
//           <planeBufferGeometry args={[3, 5]} />
//           <waveShaderMaterial uColor={new THREE.Color(0.0, 0.0, 0.0)} />
//         </mesh>
//       </Canvas>
//     );
//   };

import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
//import glsl from "babel-plugin-glsl/macro";

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  // `
  //   precision mediump float;

  //   varying vec2 vUv;
  //   varying float vWave;

  //   uniform float uTime;

  //   // #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


  //   void main() {
  //     vUv = uv;

  //     vec3 pos = position;
  //     float noiseFreq = 2.0;
  //     float noiseAmp = 0.4;
  //     vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  //    // pos.z += snoise3(noisePos) * noiseAmp;
  //     vWave = pos.z;

  //     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
  //   }
  // `,
  // Vertex Shader

// Vertex Shader
`
precision mediump float;

varying vec2 vUv;
varying float vWave;

uniform float uTime;

void main() {
  vUv = uv;

  vec3 pos = position;
  float frequency = 5.0; // Adjust this value to change the frequency of the waves
  float amplitude = 0.5; // Adjust this value to change the amplitude of the waves
  float phase = uTime;   // Use time as phase to animate the waves over time

  // Calculate sine wave displacement along the z-axis
  float wave = amplitude * sin(pos.x * frequency + phase);

  // Apply the sine wave displacement
  pos.z += wave;
  vWave = wave; // Pass wave value to fragment shader if needed

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
}
`

,
  // Fragment Shader
  `
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  ]);

  return (
    <mesh>
      <planeGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

export const ShaderImage = () => {
  return (
    <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

