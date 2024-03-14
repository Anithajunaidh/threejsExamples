import FirstThreeJS from "@/components/threejs/FirstThreeJS";
import ThreeBrain from "@/components/threejs/brainTubes";
import TerrainThreeJS from "@/components/threejs/terrainThree";
import InnoText from "@/components/threejsSamples/innogenio";

const YourPage = () => {
  return (
    <>
     <InnoText/>
     {/* <ThreeBrain/> */}
     {/* <FirstThreeJS/> */}
     {/* <TerrainThreeJS/> */}
    </>
  );
};

export default YourPage;

// 'use client';
// import App from 'next/app';
// import { useEffect, useRef } from 'react';
// import webGLFluidEnhanced from 'webgl-fluid-enhanced';

// const AppPage = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     webGLFluidEnhanced.simulation(canvasRef.current!, {
//       PRESSURE: 0.2,
//       SUNRAYS: false,
//       START_SPLATS: 10,
//       DENSITY_DISSIPATION: 3,
//       CURL: 100,
//       COLOR_PALETTE: ['#0000ff', '#111111', '#1d1d1d', '#eaeaea', '#4dba87'],
//     });
//   }, []);

//   return <canvas ref={canvasRef} className="w-[100%] h-screen" />;
// };

// export default AppPage;