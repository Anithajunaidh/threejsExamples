'use client';

// pages/threePage.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import WebGLFluid from 'webgl-fluid';
import canvas from '../threejsSamples/innogenio';

const FirstThreeJS = () => {
  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
   // document.body.appendChild(renderer.domElement);

// Create an off-screen canvas for the fluid simulation (assuming you have a setupFluid function)
const fluidCanvas = canvas;
fluidCanvas.width = 256; // Set the desired resolution
fluidCanvas.height = 256;

WebGLFluid(fluidCanvas, {
  TRIGGER: 'hover',
  SIM_RESOLUTION: 256,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 4,
  VELOCITY_DISSIPATION: 0.5,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.1,
  SPLAT_FORCE: 6000,
  SPLAT_COUNT: 0,
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 1.0,
});
// Create a dynamic texture from the off-screen canvas
const fluidTexture = new THREE.CanvasTexture(fluidCanvas);
// Temporarily append the fluid simulation canvas to the document to check its output
document.body.appendChild(fluidCanvas);

    // Create a cube
    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,map:fluidTexture});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      fluidTexture.needsUpdate = true;
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up Three.js objects on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
     // document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div />;
};

export default FirstThreeJS;
