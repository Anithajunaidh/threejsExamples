import React from 'react';
import ThreeSceneRipple from '@/components/threejsSamples/rippleAnimation';
import FirstThreeJS from '@/components/threejsSamples/threeSceneScroll';
import Parallax from '@/components/gsap/parallax';


const RipplePage = () => {
  return (
    <div className="p-16 flex flex-col w-full items-center justify-center">
{/* <ThreeSceneRipple/> */}
{/* <FirstThreeJS/> */}
<Parallax/>
</div>
  );
};

export default RipplePage;
