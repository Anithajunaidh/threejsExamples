"use client"
import SecondThreeJS from '@/components/threejs/SecondThreeJS';
import { ShaderImage } from '@/components/threejs/wavyImageScroll';
//import  ShaderImage  from '@/components/threejs/wavyImages/shaderImage';

import React from 'react';

const AnimatedImagePage = () => {
  return (
    <>
<SecondThreeJS/>
<ShaderImage/>
</>
  );
};

export default AnimatedImagePage;
