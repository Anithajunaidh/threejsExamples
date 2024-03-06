"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const fragmentShader = `
// Custom fragment shader for distortion effects
uniform sampler2D tDiffuse; // Input texture
uniform vec2 resolution;    // Resolution of the screen
uniform float time;         // Time for animation
uniform vec2 mouse;         // Mouse position in screen coordinates

varying vec2 vUv;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 1.5 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = vUv;

    // Calculate the displacement amount based on time and UV coordinates
    float displacementX = (fbm(uv * 10.0 + time) - 0.5) * 0.4; // Adjust the strength as needed
    float displacementY = (fbm(uv * 10.0 + time) - 0.5) * 0.3 ; // Adjust the strength as needed

    // Apply displacement to UV coordinates
    uv.x += displacementX;
    uv.y += displacementY;

    // Sample the input texture with the distorted UV coordinates
    vec4 texel = texture2D(tDiffuse, uv);

    // Output the texel with applied displacement
    gl_FragColor = texel;
}
`;

const ThreeScene: React.FC=()=> {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let mouseMoved = false; // Flag to track mouse movement

    // Setup the scene, camera, and renderer as usual
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load an image as a texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/images/award_gradient.png', () => {
      // Update your rendering logic here if needed, once the image is loaded
      renderer.render(scene, camera);
    });

    const geometry = new THREE.PlaneGeometry(3, 3, 1, 1); // Adjust size to match your image aspect ratio
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Example of wave-like movement
      plane.position.x = mouseX * plane.geometry.parameters.width * 2;
      plane.position.y = mouseY * plane.geometry.parameters.height * 2;

      if (mouseMoved) { // Only render when mouse moves
        renderer.render(scene, camera);
        mouseMoved = false; // Reset flag
      }
    };

    animate();

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 1;
      mouseY = -(event.clientY / window.innerHeight - 0.5);
      mouseMoved = true; // Set flag to true when mouse moves
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Custom shader pass for distortion effects
    const distortionPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        time: { value: 0.0 }, // You may want to animate this over time
        mouse: { value: new THREE.Vector2(0, 0) }, // Mouse position
      },
      
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader, // Your custom fragment shader
    });
     // Update the mouse uniform in the distortionPass ShaderPass

    composer.addPass(distortionPass);

    // Render loop for the composer
    const postProcessingAnimate = () => {
      if (mouseMoved) { // Only animate distortion when mouse moves
        distortionPass.uniforms.time.value += 0.05; // Example of animating time in the shader
      }
      composer.render();
      requestAnimationFrame(postProcessingAnimate);
    };

    postProcessingAnimate();

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
