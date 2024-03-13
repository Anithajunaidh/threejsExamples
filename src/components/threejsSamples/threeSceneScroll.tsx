'use client';

// pages/threePage.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import redball from "../../../public/assets/images/red_ball.png";
import greenball from "../../../public/assets/images/greenball.jpg";
import blueball from "../../../public/assets/images/blueball.png";
import redbg from "../../../public/assets/images/redbg.webp";
import bluebg from "../../../public/assets/images/bluebg.jpg";
import greenbg from "../../../public/assets/images/greenbg.jpg";
import { StaticImageData } from 'next/image';

interface SceneObject {
  bg: StaticImageData;
  matcap: string;
  scene?: THREE.Scene; // Define optional scene property
}

const FirstThreeJS = () => {
  const scenes:SceneObject[]=[
    {
bg:redbg.src,
matcap:redball.src,
  },
  {
    bg:greenbg.src,
    matcap:greenball.src,
      },
      {
        bg:bluebg.src,
        matcap:blueball.src,
          },
]
  useEffect(() => {
    // Set up Three.js scene
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;


//create scene function

const createScene = (bg:string,matcap:string) => {
  const scene = new THREE.Scene();
  let bgTexture=new THREE.TextureLoader().load(bg);
  scene.background=bgTexture;
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
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scenes[2].scene, camera);
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
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div />;
};

export default FirstThreeJS;
