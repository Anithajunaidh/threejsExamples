"use client"

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { data } from "./data";
import { useRef } from "react";

const PATHS = data.economics[0].paths;
const randomRange = (min, max) => Math.random() * (max - min) + min;

//create a set of curves
let curves = [];
//loop for curves
for (let i = 0; i < 100; i++) {
  let points = [];
  let length = randomRange(0.5, 1);
  //loop for points
  for (let j = 0; j < 100; j++) {
    points.push(
      new THREE.Vector3().setFromSphericalCoords(
        0.2,
        Math.PI - (j / 100) * Math.PI * length,
        (i / 100) * Math.PI * 2
      )
    );
    let tempcurve = new THREE.CatmullRomCurve3(points);
    curves.push(tempcurve);
  }
}

let brainCurves=[]
PATHS.forEach((path)=>{
  let points=[]
  for(let i=0;i<path.length;i+=3){
    points.push(new THREE.Vector3(path[i],path[i+1],path[i+2]))
  }
  let tempCurve=new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempCurve);
})

const Tube = ({ curve }) => {
  const brainmat=useRef();
useFrame(({clock})=>{
  brainmat.current.uniforms.time.value=clock.getElapsedTime();
})

  const BrainMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6),mouse:new THREE.Vector3(0,0,0) },
    `varying vec2 vUv;
    uniform float time;
    uniform vec3 mouse;
    varying float vProgress;
        void main(){
            vUv=uv;
            vProgress=smoothstep(-1.0,1.0,sin(vUv.x*8.0 + time*3.0));
vec3 p =position;
float maxDist=0.5;
float dist=length(mouse-p);
if(dist<maxDist){
  vec3 dir=normalize(mouse-p);
  dir*=(1.0-dist/maxDist);
  p-=dir*0.01;
}

            gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
            }

        `,
//fragment shader

    `
    uniform float time;
       uniform vec3 color;
       varying vec2 vUv;
       varying float vProgress;
       void main() {
        // vec3 color1=vec3(1,0,0);
        // vec3 color2=vec3(1,1,0);
        // vec3 finalColor=mix(color1,color2,vProgress);
        vec3 finalColor=mix(color,color*0.25,vProgress);
        float hideCorners=smoothstep(1.0,0.9,vUv.x);
        float hideCorners1=smoothstep(0.0,0.1,vUv.x);
        gl_FragColor.rgba = vec4(vec3(vProgress),1.0);
        gl_FragColor.rgba = vec4(finalColor,hideCorners*hideCorners1);
       }
       `
  );

  extend({ BrainMaterial });
  
  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
        {/* <meshStandardMaterial color="hotpink" /> */}
        <brainMaterial 
        ref={brainmat} 
        side={THREE.DoubleSide}
        transparent={true}
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};

const Tubes = ({allCurves}) => {
  return (
    <>
      {allCurves.map((curve, index) => (
        <Tube curve={curve} key={index} />
      ))}
    </>
  );
};

const ThreeBrain = () => {
  const containerRef=useRef();
  return (
    <div
    ref={containerRef}
    style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
  >
    <Canvas camera={{position:[0,0,0.3]}}>
      <color attach="background" args={["black"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
      <Tubes allCurves={brainCurves} />
      <OrbitControls />
    </Canvas>
    </div>
  );
};
export default ThreeBrain;
