import React from 'react';

import ThreeScene from '@/components/threejs/ThreeScene5';
import ThreeBrain from '@/components/threejs/brainTubes';
import ThreeSceneRipple from '@/components/threejs/RippleAnimation';
import FloatingImage from '@/components/threejs/floatingImage';
import { ShaderImage } from '@/components/threejs/shaderImage';
import RippleEffect from '@/components/threejs/RippleEffect';
import WavyImage from '@/components/threejs/wavyImageScroll';

const Animation = () => (
  <div>
    {/* <FirstThreeJS /> */}
    {/* <RippleAnimation /> */}
    {/* <ThreeBrain /> */} 
    {/* <TextOutline/> */}
    {/* <RippleEffect /> */}
    {/* <ThreeSceneRipple/> */}
  <ShaderImage/>
  <WavyImage src="/assets/images/texture.jpg" />
  </div>
);

export default Animation;
