"use client"

import React, { useEffect, useRef } from 'react';
import Fluid from 'webgl-fluid';


const InnoText = () => {
  const canvas = useRef(null);

  useEffect(() => {
    Fluid(canvas.current, {
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
  }, []);
  useEffect(() => {
    // Paint the text on the canvas
    const canvasText = document.getElementById('canvasText');
    const ctxText = canvasText.getContext('2d');
    ctxText.fillStyle = 'transparent';
    ctxText.strokeStyle = '#fff'; // White outline
    ctxText.lineWidth = 2; // Outline width
    ctxText.font = 'italic bold 100px sans-serif';
    ctxText.textBaseline = 'middle'; // Center text vertically
    ctxText.textAlign = 'center'; // Center text horizontally
    const x = canvasText.width/2 ;
    const y = canvasText.height/2;
    ctxText.strokeText('INNOGENIO', x, y);
    ctxText.globalAlpha = 0.0;
   // ctxText.fillText('Your Text!!', x, y);
  }, []);


  return (
    <div >
      <canvas ref={canvas} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background:'transparent'}} />
      <canvas  id="canvasText" width="600" height="100" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />    </div>
  );
};

export default InnoText;

