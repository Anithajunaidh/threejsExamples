// import React, { useRef } from 'react';
// import { extend, useFrame } from 'react-three-fiber';
// import { ShaderMaterial } from 'three';

// // Extend Three.js with the ShaderMaterial
// extend({ ShaderMaterial });

// const ShaderComponent = () => {
//   const material = useRef();

//   // Use the useFrame hook for animation
//   useFrame(() => {
//     if (material.current) {
//       // You can add custom logic for shader animations here
//     }
//   });

//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <shaderMaterial
//         ref={material}
//         vertexShader={`
//           void main() {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
//         fragmentShader={`
//           void main() {
//             gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
//           }
//         `}
//       />
//     </mesh>
//   );
// };

// export default ShaderComponent;
