 "use client"
// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Text } from '@react-three/drei';
// import * as THREE from 'three';

// const TextOutline: React.FC = () => {
//   const textRef = useRef<THREE.Mesh>(null);
//   const outlineRef = useRef<THREE.Mesh>(null);

//   return (
//     <Canvas style={{ background: 'black' }}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <TextPositionUpdater textRef={textRef} outlineRef={outlineRef} />
//       <Text
//         ref={outlineRef}
//         color="black"
//         fontSize={2}
//         position={[0, 0, 0]}
//       >
//         Hello World
//       </Text>
//       <Text
//         ref={textRef}
//         color="white"
//         fontSize={2}
//         position={[0, 0, 0]}
//       >
//         Hello World
//       </Text>
//     </Canvas>
//   );
// };

// const TextPositionUpdater: React.FC<{ textRef: React.MutableRefObject<THREE.Mesh | null>, outlineRef: React.MutableRefObject<THREE.Mesh | null> }> = ({ textRef, outlineRef }) => {
//   useFrame(() => {
//     if (textRef.current && outlineRef.current) {
//       outlineRef.current.position.copy(textRef.current.position);
//       outlineRef.current.rotation.copy(textRef.current.rotation);
//     }
//   });

//   return null; // This component doesn't render any additional DOM elements
// };

// export default TextOutline;


// TextScene.js
// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// const TextScene = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Setup the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Create a plane geometry for the text
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     context.font = '48px Arial';
//     const text = 'Your Text Here';
//     const textWidth = context.measureText(text).width;
//     const textHeight = 48; // Assuming font size 48px
//     canvas.width = textWidth + 20; // Add some padding
//     canvas.height = textHeight + 20; // Add some padding
//     context.font = '48px Arial'; // Reset font after resizing canvas
//     context.fillStyle = 'white';
//     context.fillText(text, 10, 48); // Adjust position based on padding

//     const texture = new THREE.CanvasTexture(canvas);
//     const geometry = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const plane = new THREE.Mesh(geometry, material);
//     scene.add(plane);

//     camera.position.z = 5;

//     // Render loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       document.body.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={containerRef} />;
// };

// export default TextScene;

// TextScene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TextScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Setup the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a plane geometry for the text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
     context.font = '96px Arial';
    const text = 'Your Text Here';
    const textWidth = context.measureText(text).width;
    const textHeight = 96; // Assuming font size 48px
    canvas.width = textWidth + 40; // Add some padding
    canvas.height = textHeight + 20; // Add some padding
    context.font = '48px Arial'; // Reset font after resizing canvas
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Draw outline
    context.strokeStyle = 'white';
    context.lineWidth = 2; // Adjust thickness as needed
    context.strokeText(text, canvas.width / 2, canvas.height / 2);

    // Draw transparent text
    context.fillStyle = 'transparent'; // Transparent fill
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default TextScene;

