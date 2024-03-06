'use client';

// RippleEffect.tsx
import * as dat from 'dat.gui';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

interface ImageInfo {
  img: HTMLImageElement;
  mesh: THREE.Mesh;
  top: number;
  left: number;
  width: number;
  height: number;
}

const vertex: string = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment: string = `
precision highp float;

uniform sampler2D uTexture; // Ocean texture
uniform sampler2D uDisplacement; // Colorful brush displacement map

uniform float time;
uniform float progress;
uniform float shiftx;
uniform float shifty;
uniform float damp;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    // Get the color from the ocean texture
    vec3 oceanColor = texture2D(uTexture, uv).rgb;

    // Get the displacement value from the colorful brush displacement map
    vec4 displacement = texture2D(uDisplacement, uv);

    // Adjust the displacement based on time and progress
    vec2 distortedUV = uv + progress * damp * displacement.xy;

    // Get the color from the colorful brush image
    vec3 brushColor = texture2D(uTexture, distortedUV).rgb;

    // Combine the ocean color and the colorful brush color based on displacement
    vec3 finalColor = mix(oceanColor, brushColor, displacement.a);

    // Apply additional color shifts
    finalColor.r += shiftx;
    finalColor.g += shifty;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const RippleEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  let scene: THREE.Scene;
  let scene1: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let composer: EffectComposer;
  let width: number;
  let height: number;
  let mouse: THREE.Vector2;
  let prevMouse: THREE.Vector2;
  let currentWave: number = 0;
  let isPlaying: boolean = true;
  let time: number = 0;
  let meshes: THREE.Mesh[] = [];
  const meshImages: THREE.Mesh[] = [];
  const imageStore: ImageInfo[] = [];
  let base: THREE.WebGLRenderTarget;

  const setupThree = () => {
    // Set up Three.js
    scene = new THREE.Scene();
    scene1 = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, 1, 0.001, 1000);
    composer = new EffectComposer(rendererRef.current!);
    base = new THREE.WebGLRenderTarget(width, height, {
      stencilBuffer: true,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    // ...
  };

  const initPost = () => {
    // Initialize post-processing
    const renderOne = new RenderPass(scene1, camera);
    const effect1 = new ShaderPass({
      vertex,
      fragment,
      uniforms: {
        time: { value: 0 },
        progress: { value: 1 },
        shiftx: { value: -0.5 },
        shifty: { value: -0.5 },
        damp: { value: 2.0 },
        uTexture: { value: null },
        uDisplacement: { value: null },
      },
    });
    effect1.renderToScreen = true;
    composer.addPass(renderOne);
    composer.addPass(effect1);
  };
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / width) * 2 - 1;
    mouse.y = -(e.clientY / height) * 2 + 1;
  };

  const mouseEvents = () => {
    // Mouse event handling
    window.addEventListener('mousemove', handleMouseMove);
  };

  const settings = () => {
    // GUI settings
    const gui = new dat.GUI();
    const guiSettings = {
      progress: 1,
      scale: 0.9,
    };
    gui.add(guiSettings, 'progress', 0, 1, 0.01);
    gui.add(guiSettings, 'scale', 0, 1, 10);
  };
  const handleResize = () => {
    width = containerRef.current!.clientWidth;
    height = containerRef.current!.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    rendererRef.current!.setSize(width, height);
  };
  const setupResize = () => {
    window.addEventListener('resize', handleResize);
  };

  const addObjects = () => {
    const textureLoader = new THREE.TextureLoader();

    imageStore.forEach((o) => {
      const bounds = o.img.getBoundingClientRect();
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            0,
            0,
            0,
            bounds.width,
            0,
            0,
            bounds.width,
            bounds.height,
            0,
            0,
            bounds.height,
            0,
          ]),
          3,
        ),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const materials = new THREE.ShaderMaterial({
        extensions: {
          derivatives: true,
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: { value: 0 },
          progress: { value: 1 },
          uDisplacement: { value: null },
          uTexture: { value: textureLoader.load(o.img.src) },
          shiftx: { value: -0.5 },
          shifty: { value: -0.5 },
          damp: { value: 2.0 },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      });

      const mainMesh = new THREE.Mesh(geometry, materials);
      scene1.add(mainMesh);
      meshImages.push(mainMesh);
    });

    meshes = [];

    const max = 100;
    const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);

    for (let i = 0; i < max; i++) {
      const m = new THREE.MeshBasicMaterial({
        map: textureLoader.load('/assets/images/brush.png'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, m);
      mesh.visible = false;
      mesh.rotation.z = 2 * Math.PI * Math.random();
      scene.add(mesh);
      meshes.push(mesh);
    }

    console.log(base);
  };

  const setPosition = () => {
    imageStore.forEach((o) => {
      o.mesh.position.y = -o.top + height / 2 - o.height / 2;
      o.mesh.position.x = o.left - width / 2 + o.width / 2;
    });
  };

  const stop = () => {
    isPlaying = false;
  };

  const play = () => {
    if (!isPlaying) {
      render();
      isPlaying = true;
    }
  };

  const newWave = (x: number, y: number, index: number) => {
    const m = meshes[index];
    if (m) {
      m.visible = true;
      m.position.x = x;
      m.position.y = y;
      m.scale.x = m.scale.y = 1;
      const material = m.material as THREE.Material;
      if ('opacity' in material) {
        material.opacity = 1;
      }
    }
  };

  const trackMouse = () => {
    if (
      Math.abs(mouse.x - prevMouse.x) < 4 &&
      Math.abs(mouse.y - prevMouse.y) < 4
    ) {
      /* do nothing */
    } else {
      currentWave = (currentWave + 1) % 100; // Assuming max is 100
      newWave(mouse.x, mouse.y, currentWave);
    }
    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;
  };

  const render = () => {
    trackMouse();
    if (!isPlaying) return;
    time += 0.003;
    if (meshImages) {
      for (let index = 0; index < meshImages.length; index++) {
        meshImages[index].material.uniforms.uDisplacement.value = base.texture;
      }
    }
    rendererRef.current!.setRenderTarget(base);
    rendererRef.current!.render(scene, camera);
    rendererRef.current!.setRenderTarget(null);
    rendererRef.current!.clear();
    composer.render();

    meshes.forEach((m) => {
      if (m.visible) {
        const material = m.material as THREE.Material;
        m.rotation.z += 0.02;
        if ('opacity' in material) {
          material.opacity *= 0.98;
        }
        m.scale.x = 0.9 * m.scale.x + 1.0;
        m.scale.y = m.scale.x;
        if (material.opacity < 0.002) {
          m.visible = false;
        }
      }
    });

    requestAnimationFrame(render);
  };

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    rendererRef.current = renderer;
    setupThree();
    initPost();
    mouseEvents();
    settings();
    setupResize();
    addObjects();
    setPosition();
    render();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return <div ref={containerRef} />;
};

export default RippleEffect;
