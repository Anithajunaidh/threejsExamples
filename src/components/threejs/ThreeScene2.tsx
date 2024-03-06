'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const fragmentShader = `
uniform sampler2D tDiffuse; // Input texture
uniform vec2 resolution;    // Resolution of the screen
uniform float time;         // Time for animation
uniform vec2 mouse;         // Mouse position in screen coordinates

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    // Calculate the distance from the current fragment to the mouse position
    float distanceToMouse = distance(uv, mouse);

    // Adjust the strength of the ripple effect based on distance to mouse
    float rippleStrength = 0.1 / distanceToMouse;

    // Calculate the displacement amount based on the distance to mouse and time
    float displacementX = sin((uv.y + time) * 10.0) * rippleStrength;
    float displacementY = cos((uv.x + time) * 10.0) * rippleStrength;

    // Apply displacement to UV coordinates
    uv.x += displacementX;
    uv.y += displacementY;

    // Sample the input texture with the distorted UV coordinates
    vec4 texel = texture2D(tDiffuse, uv);

    // Output the distorted texel
    gl_FragColor = texel;
}

`;


const ThreeScene: React.FC = () => {
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
