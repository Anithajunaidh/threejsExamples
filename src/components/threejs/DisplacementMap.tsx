// // ThreeScene.tsx

'use client';

import { useRef } from 'react';
import * as THREE from 'three';

// // const vertexShader = `
// //   void main() {
// //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //   }
// // `;

// // const fragmentShader = `
// //   uniform float time;
// //   uniform vec2 resolution;
// //   uniform vec2 mouse;

// //   void main() {
// //     vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
// //     vec2 d = p - mouse;

// //     float a = atan(d.y, d.x);
// //     float r = length(d);
// //     float t = time * 0.2;

// //     vec3 color = vec3(0.0);
// //     color += vec3(sin(r * 10.0 - t), sin(a + t), cos(r * 10.0 + t));

// //     gl_FragColor = vec4(color, 1.0);
// //   }
// // `;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 newPosition = position + normal * sin(vUv.x * 10.0 + time) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D texture;
varying vec2 vUv;

void main() {
  vec4 texel = texture2D(texture, vUv);
 gl_FragColor = texture2D(texture, vUv) * texel;

}
`;

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let mouseX = 0;
  let mouseY = 0;

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
  const texture = loader.load('assets/images/fog.png', () => {
    // Update your rendering logic here if needed, once the image is loaded
    renderer.render(scene, camera);
  });
  // const uniforms = {
  //   time: { value: 0 },
  //   texture: { value: texture }, // Assuming 'texture' is loaded via THREE.TextureLoader as before
  // };
  const geometry = new THREE.PlaneGeometry(3, 3, 1, 1); // Adjust size to match your image aspect ratio
  const material = new THREE.MeshBasicMaterial({ map: texture });
  // const material = new THREE.ShaderMaterial({
  //   uniforms,
  //   vertexShader,
  //   fragmentShader,
  // });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);

    // Example of wave-like movement
    // plane.position.x = Math.sin(mouseX * 0.1) * 1;
    // plane.position.y = Math.sin(mouseY * 0.1) * 1;
    plane.position.x = mouseX * plane.geometry.parameters.width * 2;
    plane.position.y = mouseY * plane.geometry.parameters.height * 2;
    // uniforms.time.value += 0.05;
    renderer.render(scene, camera);
  };

  animate();

  const onDocumentMouseMove = (event: MouseEvent) => {
    // mouseX = event.clientX - window.innerWidth / 2;
    // mouseY = event.clientY - window.innerHeight / 2;
    mouseX = event.clientX / window.innerWidth - 1;
    mouseY = -(event.clientY / window.innerHeight - 0.5);
  };

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  return <div ref={containerRef} />;
};

export default ThreeScene;
