'use client';

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// const vertexShader = `
// varying vec2 vUv;
// varying vec3 vPosition;
// void main() {
//   vUv = uv;
//   vPosition = position;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;
// const fragmentShader = `
// uniform float progress;
// uniform vec2 mouse;
// uniform sampler2D uTexture;
// uniform sampler2D uDisplacement;
// varying vec2 vUv;
// varying vec3 vPosition;  // Added semicolon here
// const float PI = 3.141592653589;
// void main() {
//   vec4 displacement = texture2D(uDisplacement, vUv);
//   float sum = displacement.r + displacement.g + displacement.b + displacement.a;
// float theta = sum * 2.0 * PI + mouse.x * 2.0;
//   // float theta = displacement.g* 2.0 * PI + mouse.x * 2.0; // Example usage of mouse.x
//   //vec2 dir = vec2(sin(theta), cos(theta));
//   vec2 dir = normalize(vec2(mouse.x - vUv.x, mouse.y - vUv.y));
//   vec4 color = texture2D(uTexture, vUv + dir * progress);
//   gl_FragColor = color;
// }
// `;
// const ThreeScene: React.FC = () => {
//   const sceneRef = useRef<HTMLDivElement>(null);
//   const mouseX = useRef<number>(0);
//   const mouseY = useRef<number>(0);
//   const isMouseMoving = useRef<boolean>(false);
//   useEffect(() => {
//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000,
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // Append renderer to the DOM
//     sceneRef.current?.appendChild(renderer.domElement);
//     // Plane setup with ShaderMaterial
//     const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
//     const textureLoader = new THREE.TextureLoader();
//     const displacementMap = textureLoader.load(
//       'assets/images/flip_texture.png',
//       () => {
//         renderer.render(scene, camera);
//       },
//     );
//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         progress: { value: 0.0 },
//         uTexture: {
//           value: textureLoader.load('assets/images/flip_texture.png'),
//         },
//         uDisplacement: { value: displacementMap },
//         mouse: { value: new THREE.Vector2(0, 0) },
//       },
//       vertexShader,
//       fragmentShader,
//     });
//     const plane = new THREE.Mesh(geometry, material);
//     scene.add(plane);
//     // Event listeners for mouse interaction
//     const handleMouseMove = (event: MouseEvent) => {
//       isMouseMoving.current = true;
//       mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
//       mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
//       // Update the material's mouse uniform directly here
//       material.uniforms.mouse.value.x = mouseX.current;
//       material.uniforms.mouse.value.y = mouseY.current;
//     };
//     const handleMouseStop = () => {
//       isMouseMoving.current = false;
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseStop);
//     // Camera position
//     camera.position.z = 5;
//     // Animation logic
//     const animate = () => {
//       requestAnimationFrame(animate);
//       if (isMouseMoving.current) {
//         material.uniforms.progress.value += 0.01;
//         material.uniforms.mouse.value.x = mouseX.current;
//         material.uniforms.mouse.value.y = mouseY.current;
//       }
//       renderer.render(scene, camera);
//     };
//     animate();
//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);
//     // Clean up Three.js scene on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       sceneRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);
//   return <div ref={sceneRef} />;
// };
// export default ThreeScene;

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// const ThreeScene: React.FC = () => {
//   const sceneRef = useRef<HTMLDivElement>(null);
//   const mouseX = useRef<number>(0);
//   const mouseY = useRef<number>(0);
//   const fogImagePath = 'assets/images/fog.png';
//   useEffect(() => {
//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       90,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000,
//     );
//     camera.position.z = 1;
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // Append renderer to the DOM
//     sceneRef.current?.appendChild(renderer.domElement);
//     // Create a square geometry
//     const squareGeometry = new THREE.PlaneGeometry(
//       window.innerWidth,
//       window.innerHeight,
//     );
//     const textureLoader = new THREE.TextureLoader();
//     const fogTexture = textureLoader.load(fogImagePath);
//     const squareMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         uMouse: { value: new THREE.Vector2(0, 0) },
//         resolution: {
//           value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//         },
//         uTexture: { value: fogTexture }, // Pass the fog image texture
//       },
//       vertexShader: `
//         void main() {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//       uniform vec2 uMouse;
//       uniform vec2 resolution;
//       void main() {
//           // Calculate the position of the current fragment in normalized device coordinates
//           vec2 fragCoord = ((gl_FragCoord.xy - uMouse) / resolution) * 2.0 - 1.0;
//           // Calculate the aspect ratio
//           float aspectRatio = resolution.x / resolution.y;
//           // Scale the fragment coordinates to correct for aspect ratio
//           fragCoord.x *= aspectRatio;
//           // Calculate the radial distance from the center of the circle
//           float distance = length(fragCoord);
//           // Create a blurry effect based on the radial distance
//           float blur = smoothstep(-.21, 2.0, distance);
//           // Define the starting color (center color) and ending color (black)
//           vec3 startColor = vec3(0.188, 0.161, 0.247); // Corresponds to #30293f
//           vec3 endColor = vec3(0.0, 0.0, 0.0);
//           // Interpolate between start and end colors based on blur
//           vec3 color = mix(startColor, endColor, blur);
//           gl_FragColor = vec4(color, 1.0);
//       }
//       `,
//     });
//     const square = new THREE.Mesh(squareGeometry, squareMaterial);
//     scene.add(square);
//     // Handle window resize
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       const newHeight = window.innerHeight;
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(newWidth, newHeight);
//       square.scale.set(newWidth, newHeight, 1);
//       squareMaterial.uniforms.resolution = {
//         value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//       };
//     };
//     window.addEventListener('resize', handleResize);
//     // Update mouse position
//     const updateMousePosition = (event: MouseEvent) => {
//       mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
//       mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener('pointermove', updateMousePosition);
//     // Animation loop
//     const animate = () => {
//       squareMaterial.uniforms.uMouse.value.x +=
//         (-mouseX.current * 0.5 - squareMaterial.uniforms.uMouse.value.x) * 0.01;
//       squareMaterial.uniforms.uMouse.value.y +=
//         (-mouseY.current * 0.5 - squareMaterial.uniforms.uMouse.value.y) * 0.01;
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();
//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('pointermove', updateMousePosition);
//       sceneRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);
//   return <div ref={sceneRef} />;
// };
// export default ThreeScene;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

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
uniform float progress;
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 resolution; 
varying vec3 vPosition;
const float PI = 3.141592653589;

void main() {
  vec4 displacement=texture2D(uDisplacement, vUv);
  float theta=displacement.r * 2.0 * PI;
  vec2 dir=vec2(sin(theta), cos(theta)); 
  vec4 color=texture(uTexture, vUv); // Change 'uv' to 'vUv' or ensure 'uv' is defined
  gl_FragColor=color;
 // gl_FragColor=displacement;
}
`;

const ThreeScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.Camera>();
  const controlsRef = useRef<OrbitControls>();
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const meshes: THREE.Mesh[] = [];
  const currentWave = useRef<number>(0);
  const mouse = { value: new THREE.Vector2(0, 0) };

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const scene1 = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    );
    // const camera1 = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);

    // baseTexture

    // const base = new THREE.WebGLRenderTarget(
    //   window.innerWidth,
    //   window.innerHeight,
    //   {
    //     stencilBuffer: true,

    //     minFilter: THREE.LinearFilter,

    //     magFilter: THREE.LinearFilter,

    //     format: THREE.RGBAFormat,
    //   },
    // );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    // cameraRef.current = camera1;

    // Append renderer to the DOM
    sceneRef.current?.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);
    // Plane setup with ShaderMaterial
    const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    const displacementMap = textureLoader.load('assets/images/fog.png', () => {
      renderer.render(scene, camera);
    });

    const material = new THREE.ShaderMaterial({
      // uniforms: {
      //   progress: { value: 0.0 },
      //   uTexture: {
      //     value: textureLoader.load('assets/images/flip_texture.png'),
      //   },
      //   uDisplacement: { value: displacementMap },
      //   mouse: { value: new THREE.Vector2(0, 0) },
      // },
      // vertexShader,
      // fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        progress: { value: 1 },
        uDisplacement: { value: null },
        uTexture: {
          value: new THREE.TextureLoader().load(
            'assets/images/black_texture.avif',
          ),
        },
        shiftx: { value: -0.5 },
        shifty: { value: -0.5 },
        damp: { value: 2.0 },
        mouse,
      },
      vertexShader,
      fragmentShader,
    });

    for (let i = 0; i < 50; i++) {
      const material1 = new THREE.MeshBasicMaterial({
        map: displacementMap,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material1);
      // mesh.visible = false;
      mesh.rotation.z = 2 * Math.PI * Math.random();
      scene.add(mesh);
      meshes.push(mesh);
    }

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    const plane1 = new THREE.Mesh(geometry, material);
    scene1.add(plane1);
    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // Camera position
    camera.position.z = 5;

    // creating new waves
    const setNewWave = (x: number, y: number, index: number) => {
      const mesh = meshes[index];
      mesh.visible = true;
      mesh.position.x = x;
      mesh.position.y = y;
      // Asserting the material type as MeshBasicMaterial
      const m = mesh.m as THREE.MeshBasicMaterial;

      // Setting opacity
      if (m) {
        m.opacity = 1;
      }
    };
    const handleMouseMove = (event: MouseEvent) => {
      // mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      // mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseX.current = event.clientX / window.innerWidth - 0.5;
      mouseY.current = event.clientY / window.innerHeight - 0.5;
      material.uniforms.mouse.value.x = mouseX.current;
      material.uniforms.mouse.value.y = mouseY.current;
      currentWave.current = (currentWave.current + 1) % 50;
      setNewWave(mouseX.current, mouseY.current, currentWave.current);
    };

    // Add event listener to call handleMouseMove when the mouse moves
    window.addEventListener('mousemove', handleMouseMove);

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls in each frame
      renderer.render(scene1, camera);
      meshes.forEach((mesh) => {
        // mesh.position.x = mouseX.current;
        // mesh.position.y = mouseY.current;
        const { rotation, material } = mesh;
        if (material instanceof THREE.MeshBasicMaterial) {
          rotation.z += 0.02;
          material.opacity *= 0.98;
        }
      });
      // renderer.setRenderTarget(base);
      renderer.render(scene, camera);
      // material.uniforms.uDisplacement.value = base.texture;
      // renderer.setRenderTarget(null);
      // renderer.clear();
      // renderer.render(scene1, camera1);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up Three.js scene on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.removeChild(renderer.domElement);
      // Dispose resources to prevent memory leaks
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default ThreeScene;
