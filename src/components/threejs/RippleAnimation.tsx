"use client"
import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import award_gradient from "../../../public/assets/images/texture.jpg";
import brush from "../../../public/assets/images/brush.png";

const vertexShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;
uniform sampler2D u_displacement;
varying vec3 vPosition; // Declare vPosition if you intend to use it in the fragment shader
void main(){
  vUv=uv;
 // float displacementScale = 0.1; // Adjust the scale as needed
 // vec3 newPosition = position + normal * texture2D(u_displacement, vUv).r * displacementScale;
 // newPosition.y += 4.0 * sin((position.z) / 4.0 + u_time); // Apply waving effect
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_displacement;
uniform sampler2D u_texture;

varying vec2 vUv;
varying vec3 vPosition;
float PI=3.141592;

void main() {
  vec4 displacement=texture2D(u_displacement,vUv);
  float theta=displacement.r*2.0*PI;
  vec2 dir=vec2(sin(theta),cos(theta));
  vec2 uv=vUv+dir*displacement.r*0.1;
  vec4 color=texture2D(u_texture,uv);
gl_FragColor=color;

}

`;

const ThreeSceneFog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const max = 100;
  const meshes = [];
  const mouse = new THREE.Vector2(0, 0);
  const prevMouse = useRef(new THREE.Vector2());
  // const [currentWave, setCurrentWave] = useState(0);
  let currentWave = 0;

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const scene1 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    const baseTexture = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      }
    );

   const material1 = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        u_time: {
          value: 0,
        },
        u_displacement: {
          value: null,
        },
        u_texture: {
          value: new THREE.TextureLoader().load(award_gradient),
        },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 2, 5);
    orbit.update();

    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const geometryFullscreen = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight,
      1,
      1
    );

    for (let i = 0; i < max; i++) {
      const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(brush),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      // mesh.visible = false;
      //  mesh.rotation.z = 2 * Math.PI * Math.random();
      scene.add(mesh);
      meshes.push(mesh);
    }

    const plane = new THREE.Mesh(geometryFullscreen, material1);
    scene1.add(plane);

    const clock = new THREE.Clock();

    const setNewWave = (x:number, y:number, index:number) => {
      console.log(index, x, y);
      let mesh = meshes[index];
      // mesh.visible = true;
      // mesh.position.x = x * 2;
      // mesh.position.y = y * 2;
      mesh.scale.x = mesh.scale.y = 1;
      mesh.material.opacity = 1;
      console.log(mesh.position);
    };

    const trackMouseMove = () => {
      if (
        Math.abs(mouse.x - prevMouse.current.x) > 0.01 ||
        Math.abs(mouse.y - prevMouse.current.y) > 0.01
      ) {
        setNewWave(mouse.x, mouse.y, currentWave);
        currentWave = (currentWave + 1) % max;
      }
      prevMouse.current.x = mouse.x; // Update previous mouse position
      prevMouse.current.y = mouse.y;
    };

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      trackMouseMove();
      meshes.forEach((mesh) => {
        mesh.position.x = mouse.x * 5; // Adjust multiplier for sensitivity
        mesh.position.y = -mouse.y * 5; // Invert y-axis and adjust multiplier
        // mesh.rotation.z -= 0.2;
        // mesh.material.opacity *= 0.98;
        // mesh.scale.x = 0.98 * mesh.scale.x + 0.1;
        // mesh.scale.y = mesh.scale.x;
      });
      //merging  two scenes
      renderer.setRenderTarget(baseTexture);
      renderer.render(scene, camera);
      material1.uniforms.u_displacement.value = baseTexture.texture;
      // renderer.setRenderTarget(null);
      // renderer.clear();
      // renderer.render(scene1, camera);
    };

    window.addEventListener("mousemove", handleMouseMove);
    renderer.setAnimationLoop(animate);
    // requestAnimationFrame(animate);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeSceneFog;
