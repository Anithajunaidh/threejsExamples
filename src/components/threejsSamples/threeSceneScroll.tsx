"use client";

// pages/threePage.js
import React, { useEffect } from "react";
import * as THREE from "three";
import redball from "../../../public/assets/images/red_ball.png";
import greenball from "../../../public/assets/images/greenball.jpg";
import blueball from "../../../public/assets/images/blueball.png";
import redbg from "../../../public/assets/images/redbg.webp";
import bluebg from "../../../public/assets/images/bluebg.jpg";
import greenbg from "../../../public/assets/images/greenbg.jpg";
import { GUI } from "dat.gui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const vertexShader = `
varying vec2 vUv; // Define a varying variable to pass texture coordinates to the fragment shader
varying vec3 vPosition; // Define a varying variable to pass vertex positions to the fragment shader

void main() {
  vUv = uv; // Pass texture coordinates to the fragment shader
  vPosition = position; // Pass vertex positions to the fragment shader

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Transform the vertex position to screen space
}
`;

const fragmentShader = `
uniform float time;
uniform float progress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec4 resolution; 
varying vec2 vUv;
varying vec3 vPosition;
const float PI = 3.141592653589;

void main() {
vec4 t=texture2D(uTexture1,vUv);
vec4 t1=texture2D(uTexture2,vUv);

float sweep=step(vUv.y,progress);
vec4 finalTexture=mix(t,t1,sweep);
 //gl_FragColor = vec4(vUv,0.0,1);
 gl_FragColor=finalTexture;
}
`;
interface SceneObject {
  bg: string;
  matcap: string;
  scene?: THREE.Scene; // Define optional scene property
}


const FirstThreeJS = () => {
  let settings = {
    progress: 0,
  };
  const scenes: SceneObject[] = [
    {
      bg: redbg.src,
      matcap: redball.src,
    },
    {
      bg: greenbg.src,
      matcap: greenball.src,
    },
    {
      bg: bluebg.src,
      matcap: blueball.src,
    },
  ];

  useEffect(() => {
    // Set up Three.js scene
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    let postscene = new THREE.Scene();
    let frustumSize = 1;
    let aspect = 1;
    const postcamera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );
  
    let time = 0;
    let current = 0;
   
    //Set up GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: ".trigger", // Selector for the trigger element (e.g., a scroll container)
      start: "top top", // Trigger animation when the top of the trigger element reaches the top of the viewport
      end: "bottom bottom", // Trigger animation when the bottom of the trigger element reaches the bottom of the viewport
      onEnter: () => {
        // This function will be called when the trigger element enters the viewport
        // Update progress value when trigger enters the viewport
        settings.progress = 1; // or any value you want to set
      },
      onLeaveBack: () => {
        // This function will be called when the trigger element leaves the viewport
        // Update progress value when trigger leaves the viewport
        settings.progress = 0; // or any value you want to set
      },
    });

    //create scene function
    const postmaterial = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives:enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        progress:{value:0},
        uTexture1: { value: new THREE.TextureLoader().load(redbg.src) },
        uTexture2: { value: new THREE.TextureLoader().load(bluebg.src) },
      },
      vertexShader,
      fragmentShader,
    });
    //gui progressbar
// const guisettings=()=>{
//   settings={
//    progress:0,
//  };
//  let gui=new GUI();
//  gui.add(settings,"progress",0,1,0.01).onChange((val)=>{})
//  }
const guisettings = () => {
  let gui = new GUI();
  gui.add(settings, "progress", 0, 1, 0.01).onChange((val) => {
    // Update progress value when the slider is changed
    settings.progress = val;
  });
};

 guisettings();
    const createScene = (bg: string, matcap: string) => {
      const scene = new THREE.Scene();
      let bgTexture = new THREE.TextureLoader().load(bg);
      scene.background = bgTexture;
      const material = new THREE.MeshMatcapMaterial({
        matcap: new THREE.TextureLoader().load(matcap),
      });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const mesh = new THREE.Mesh(geometry, material);

      for (let index = 0; index < 200; index++) {
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const distance = Math.random() * 10 + 5; // Random distance from center
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const z = Math.random() * 10 - 8; // Random z position within a range
        const position = new THREE.Vector3(x, y, z);
        const clone = mesh.clone();
        clone.position.copy(position);
        scene.add(clone);
      }

      return scene;
    };
    //const scene = createScene();
    scenes.forEach((sceneObj) => {
      const scene = createScene(sceneObj.bg, sceneObj.matcap);
      sceneObj.scene = scene;
    });
    scenes.forEach((sceneObj) => {
      const scene = createScene(sceneObj.bg, sceneObj.matcap);
      sceneObj.scene = scene;
      renderer.compile(scene, camera);
      sceneObj.target = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight
      );
    });
    const initPost = () => {
      
      let quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), postmaterial);
      postscene.add(quad);
    };
    initPost();
//update scene
scenes.forEach((sceneObj) => {
  sceneObj.scene.rotation.y = time*0.1;

});

    // Animation loop
    const animate = () => {
      time += 0.05;
    
      // Update progress value
      // settings.progress += 0.01; // Increment progress by a small amount
      // if (settings.progress > 1) {
      //   settings.progress = 0; // Reset progress if it exceeds 1
      //   current = (current + 1) % scenes.length; // Swap to the next scene
      // }
    
      // Render current scene to target texture
      renderer.setRenderTarget(scenes[current].target);
      renderer.render(scenes[current].scene, camera);
    
      // Render next scene to target texture
      let next = (current + 1) % scenes.length;
      renderer.setRenderTarget(scenes[next].target);
      renderer.render(scenes[next].scene, camera);
    
      // Reset render target to default (screen)
      renderer.setRenderTarget(null);
    
      // Update shader uniforms with textures and progress value
      postmaterial.uniforms.uTexture1.value = scenes[current].target.texture;
      postmaterial.uniforms.uTexture2.value = scenes[next].target.texture;
      postmaterial.uniforms.progress.value = settings.progress;
    
      // Request next animation frame
      requestAnimationFrame(animate);
    
      // Render the post scene
      renderer.render(postscene, postcamera);
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
    };
  }, []);

  return <div className="trigger"/>;
};

export default FirstThreeJS;
