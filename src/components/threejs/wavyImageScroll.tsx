 "use client"
import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref } from "yup";

gsap.registerPlugin(ScrollTrigger);

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  `
  precision mediump float;

  varying vec2 vUv;
  varying float vWave;

  uniform float uTime;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float frequency = 5.0;
    float amplitude = 0.5;
    float phase = uTime;

    float wave = amplitude * sin(pos.x * frequency + phase);

    pos.z += wave;
    vWave = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
  }
`,
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

// const Wave = () => {
//   const ref = useRef();
//  // useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

//   const [image] = useLoader(THREE.TextureLoader, [
//     "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
//   ]);

//   return (
//     <mesh scale={[0.5, 0.5, 1]}>
//       <planeGeometry args={[0.4, 0.6, 10, 10]} />
//       <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
//     </mesh>
//   );
// };

// export const ShaderImage = () => {
//   const scroll = useRef();

//   useEffect(() => {
//     const updateWave = () => {
//       gsap.to(WaveShaderMaterial.uniforms.uTime, {
//         value: scroll.current.scrollTop / 100, // Adjust the division factor as needed
//         ease: "none",
//       });
//     };

//     ScrollTrigger.addEventListener("scroll", updateWave);

//     return () => {
//       ScrollTrigger.removeEventListener("scroll", updateWave);
//     };
//   }, []);

//   return (
//     <div
//       ref={scroll}
//       style={{ height: "200vh", overflowY: "scroll", position: "relative" }}
//     >
//       <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
//         <Wave />
//       </Canvas>
//     </div>
//   );
// };




const Wave = () => {
  const ref = useRef();
  const { size } = useThree();

  useEffect(() => {
    // Ensure the size is up to date
    const { width, height } = size;

    // GSAP timeline to control the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "ref", // You may need to adjust this
        scrub: true,
        start: "top top",
        end: "bottom bottom",
      },
    });

    // Add animation to the timeline
    // You may need to adjust the range and duration based on your needs
    tl.to(ref.current.uniforms.uTime, {
      value: 5, // Example value, adjust based on the effect you're aiming for
      ease: "none",
    });

    return () => {
      if (ScrollTrigger.getById('waveScroll')) {
        ScrollTrigger.getById('waveScroll').kill();
      }
    };
  }, [size]); // React to size changes

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  ]);

  return (
    <mesh scale={[0.5, 0.5, 1]}>
      <planeGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial ref={ref} uColor={"hotpink"} uTexture={image} />
    </mesh>
  );
};


export const ShaderImage = () => {
  return (
    <div id="#waveScroll" style={{ height: "200vh", overflowY: "scroll", position: "relative" }}>
      <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
        <Wave />
      </Canvas>
    </div>
  );
};


