"use client";

import dat from "dat.gui";
// pages/threePage.js
import React, { useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";


const vertexShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;
void main(){
  vUv=uv;
  vec3 newPosition = position;
  newPosition.y += 4.0 * sin((position.z) / 4.0 + u_time); // Apply waving effect
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image;

varying vec2 vUv;

void main() {
  
  vec2 coord = 6.0 * vUv;
  for (int n = 1; n < 8; n++) {
    float i = float(n);
    coord += vec2(0.7 / i * sin(i * coord.y + u_time + 0.3) * i + 0.8, 0.4 / i * sin(coord.x + u_time + 0.3) + 1.6);
  }
  vec3 color = vec3(0.5 * vec3(0.5 * sin(coord.x) + 0.5, 0.5 * sin(coord.y) + 0.5, sin(coord.x + coord.y)));
  gl_FragColor = vec4(color, 1.0);
}`;


const TerrainThreeJS = () => {
  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const gui = new dat.GUI();
    const mouse = new THREE.Vector2(0, 0);
    const raycaster=new THREE.Raycaster();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //texture loader
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/assets/images/award_gradient.png");
    const displacement=loader.load("/assets/images/terrain_shadow_light_height.webp")
    // Create a cube
    const geometry = new THREE.PlaneGeometry(12, 12, 14, 14);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      //displacementMap:displacement,
    });

    const shadermaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        image: { value: texture }
      },
      vertexShader,
      fragmentShader,
      opacity:0,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
  
    // Set up camera position
    camera.position.z = 5;
   // lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.x = .1;
    pointLight.position.y = .1;
    pointLight.position.z = 0.5;
    scene.add(pointLight);

  //gui.add(plane);
  const controls = {
    pointLightPositionX: pointLight.position.x,
    pointLightPositionY: pointLight.position.y,
    pointLightPositionZ: pointLight.position.z,
    pointLightRadius: pointLight.distance, 
  };
  const lightFolder = gui.addFolder('Point Light Position');
  lightFolder.add(controls, 'pointLightPositionX', -10, 10).onChange((value) => {
    pointLight.position.x = value;
  });
  lightFolder.add(controls, 'pointLightPositionY', -10, 10).onChange((value) => {
    pointLight.position.y = value;
  });
  lightFolder.add(controls, 'pointLightPositionZ', -10, 10).onChange((value) => {
    pointLight.position.z = value;
  });
  lightFolder.add(controls, 'pointLightRadius', 0, 20).onChange((value) => {
    pointLight.distance = value;
  });

    const updateLightPosition = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // Update point light position
      // Here we map the mouse coordinates; you might need to adjust the scaling
      pointLight.position.x = mouse.x * 5; // Scale factor for x-coordinate
      pointLight.position.y = mouse.y * 5; // Scale factor for y-coordinate
       raycaster.setFromCamera(mouse,camera);
       const intersects=raycaster.intersectObjects(scene.children);
       for (let i=0;i<intersects.length;i++){
        console.log(intersects);
        //intersects[i].object.material.color.set(0xff0000);
       }
    };
    window.addEventListener('mousemove', updateLightPosition);


    //Add post-processing
    // const composer = new EffectComposer(renderer);
    // const renderPass = new RenderPass(scene, camera);
    // composer.addPass(renderPass);

    // const bloomPass = new UnrealBloomPass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight), // Resolution
    //   1.5, // Strength
    //   0.1, // Radius
    //   0.1 // Threshold
    // );
    // composer.addPass(bloomPass);
    // renderer.toneMapping=THREE.LinearToneMapping;
    // renderer.toneMappingExposure=1.5;

//adding text 
     const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const textGeometry = new TextGeometry("INNOGENIO", {
          font: font,
          size: 1,
          height: 1,
        });

        // Adjust position
        textGeometry.computeBoundingBox();
        const textWidth =
          textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textGeometry.translate(-0.5 * textWidth, 0, 0); // Center the text
        // Text material setup
        const textMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          transparent: true, // Enable transparency
          opacity: 0.1, // Set opacity to half
          side: THREE.DoubleSide, // Render both sides of the geometry
          wireframe: true, // Render as wireframe
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            // Apply scale transformation to make the text smaller
    textMesh.scale.set(0.5, 0.5, 1);
        // textMesh.position.set(-30, 0, 0);
        scene.add(textMesh);
      }
    );




    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    // composer.render();
    shadermaterial.uniforms.u_time.value += 0.01;
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

    window.addEventListener("resize", handleResize);

    // Clean up Three.js objects on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('mousemove', updateLightPosition); 
    };
  }, []);

  return <div></div>;
};

export default TerrainThreeJS;



