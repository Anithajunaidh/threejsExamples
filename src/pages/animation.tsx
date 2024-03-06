
import { useEffect } from 'react';
import gsap from 'gsap';
import  { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
//import useSmoothScroll from '@/components/useMomentumScroll';

gsap.registerPlugin(MotionPathPlugin,ScrollTrigger  );

const PlaneAnimation: React.FC = () => {
  //const containerRef = useSmoothScroll();
  useEffect(() => {
    const animationContainer = document.querySelector('.animation-container');
    const plane = document.querySelector('.plane');
    const path = document.getElementById("path")!;
    const path2 = document.getElementById("path2")!;
    const pathLength = path.getTotalLength();
    const topPath = document.getElementById("topPath")!;
    const toppathLength = topPath.getTotalLength();
    const tailLength = 250;
  
      let newPath = window.innerWidth < 768 ? path2 : path;

    // Define the animation timeline
const tl = gsap.timeline();

// Add motion path animation
tl.to(plane, {
  duration:10, // Adjust this value for slower or faster animation
  ease: 'none',
  motionPath:{
path:newPath,
  autoRotate:true,
  align:newPath,
  alignOrigin:[0.5,0.5],
  },
  scrollTrigger: {
    trigger: animationContainer,
    start: 'top top',
    end: 'bottom bottom', // Extend the trigger to cover the entire animation duration
    pin:true,
    scrub: 1,
}
});

gsap.set(path, {
  strokeDasharray:`${tailLength} ${pathLength - tailLength}`,
  strokeDashoffset: ` ${pathLength +300}`,

});
gsap.set(topPath, {
  strokeDasharray: `200 ${toppathLength-200}`,
  strokeDashoffset: `${toppathLength+200}`
});
tl.to(path, {
  strokeDashoffset:0,
  scrollTrigger: {
    trigger: animationContainer,
    start: "top top+=0.1%",
    end: "bottom top-=50%",
    scrub:1,
   
  },
  duration:10,
  ease:  "none",
 // delay:20,
},0);

tl.to(topPath, {
  strokeDashoffset:0,
  scrollTrigger: {
    trigger: animationContainer,
    start: "top top+=0.1%",
    end: "bottom top-=50%",
    scrub:1,
    pin:true
  },
  duration: 10,
  ease:  "none",
  // delay:1,
},0);


// Update paths on window resize
const handleResize = () => {
  newPath = window.innerWidth < 768 ? path2 : path;
};

window.addEventListener('resize', handleResize);



return () => {
  window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div >
    <div className="animation-container"  >  
      {/* Your SVG code for the plane */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="none"
        viewBox="0 0 309 152"
        aria-hidden="true"
        width={50}
        className="plane z-100  absolute top-0 transform -translate-x-1/2"
      >
        {/* SVG paths and gradients go here */}
        <g transform="matrix(1,0,0,1,0,0)" style={{ transform: 'none', transformOrigin: '0px 0px' }}>
        <path fill="#F5A9FF" d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"></path>
        <path fill="url(#paint0_linear_2272_56525)" d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"></path>
        <path fill="url(#pattern-scroll-smooth-plane-0)" fillOpacity=".34" d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"></path>
        <path fill="url(#paint1_linear_2272_56525)" d="m82.781 35.085 52.044-23.564 163.833 118.123-215.877-94.56Z"></path>
        <path fill="url(#pattern-scroll-smooth-plane-1)" fillOpacity=".6" d="m82.781 35.085 52.044-23.564 163.833 118.123-215.877-94.56Z" style={{ mixBlendMode: 'multiply' }}></path>
  </g>
  <g data-svg-origin="298.77699303627014 130.95899963378906" transform="matrix(1,0,0,1,0,0)" style={{transform: 'none', transformOrigin: '0px 0px' }}>
    <path fill="url(#paint2_linear_2272_56525)" d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"></path>
    <path fill="#000" fillOpacity=".2" d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"></path>
    <path fill="url(#paint3_linear_2272_56525)" d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"></path>
    <path fill="url(#pattern-scroll-smooth-plane-2)" fillOpacity=".34" d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"></path>
    <path fill="url(#paint4_linear_2272_56525)" d="M298.777 130.425 1.903 103.302l53.998-44.957 242.876 72.08Z"></path>
    <path fill="url(#pattern-scroll-smooth-plane-3)" fillOpacity=".6" d="M298.777 130.425 1.903 103.302l53.998-44.957 242.876 72.08Z" style={{ mixBlendMode: 'multiply' }}></path>
  </g>
  
  <defs>
    <linearGradient id="paint0_linear_2272_56525" x1="154.593" x2="160.643" y1="48.892" y2="131.658" gradientUnits="userSpaceOnUse">
      <stop offset=".199" stopColor="#6F4D70"></stop>
      <stop offset="1" stopColor="#12195A"></stop>
    </linearGradient>
    <linearGradient id="paint1_linear_2272_56525" x1="66.623" x2="112.939" y1="2.042" y2="199.069" gradientUnits="userSpaceOnUse">
      <stop offset=".27" stopColor="#FEC5FB"></stop>
      <stop offset=".838" stopColor="#00BAE2"></stop>
    </linearGradient>
    <linearGradient id="paint2_linear_2272_56525" x1="112.454" x2="109.954" y1="132.998" y2="94.498" gradientUnits="userSpaceOnUse">
      <stop stopColor="#2F3CC0"></stop>
      <stop offset=".706" stopColor="#FFD6EC"></stop>
    </linearGradient>
    <linearGradient id="paint3_linear_2272_56525" x1="246.499" x2="260.599" y1="203" y2="92.441" gradientUnits="userSpaceOnUse">
      <stop offset=".199" stopColor="#6F4D70"></stop>
      <stop offset=".845" stopColor="#12195A"></stop>
    </linearGradient>
    <linearGradient id="paint4_linear_2272_56525" x1="-18.792" x2="-15.789" y1="49.95" y2="152.351" gradientUnits="userSpaceOnUse">
      <stop offset=".27" stopColor="#FEC5FB"></stop>
      <stop offset=".838" stopColor="#00BAE2"></stop>
    </linearGradient>
    <pattern id="pattern-scroll-smooth-plane-0" width="1" height="1" patternContentUnits="objectBoundingBox">
      <use href="#svg-noise" transform="matrix(.00075 0 0 .00225 0 -1)"></use>
    </pattern>
    <pattern id="pattern-scroll-smooth-plane-1" width=".895" height="1.947" patternContentUnits="objectBoundingBox">
      <use href="#svg-noise" transform="scale(.00179 .0039)"></use>
    </pattern>
    <pattern id="pattern-scroll-smooth-plane-2" width="1" height="1" patternContentUnits="objectBoundingBox">
      <use href="#svg-noise" transform="matrix(.00075 0 0 .00676 0 -4)"></use>
    </pattern>
    <pattern id="pattern-scroll-smooth-plane-3" width=".671" height="4.025" patternContentUnits="objectBoundingBox">
      <use href="#svg-noise" transform="scale(.00134 .00805)"></use>
    </pattern>
  </defs>
      </svg>
      <div>
      <svg className='absolute w-1/2 left-1/2 top-0 transform -translate-x-1/2 z-100' viewBox="0 0 1019 3000" width="100%" fill='none' preserveAspectRatio="xMidYMax meet ">           
       <path id='path' d="M479 3C674.333 46.1667 1027.4 151.6 877 228C689 323.5 23 248.5 10.5 416C-1.99999 583.5 751 844 831.5 799C912 754 899 533 764 591C629 649 624 962 669 1034.5C714 1107 1042 1202.5 1014.5 1412.5C987 1622.5 -95 1642 10.5 1397C116 1152 371 1222 388.5 1309.5C406 1397 453.5 1619.5 283.5 1775C147.5 1899.4 492.167 2040.5 681.5 2095.5" stroke="#642ad1" strokeWidth="5" strokeDashoffset={9999} strokeDasharray={0}/>
         <path id= 'topPath'  d = "M479 13C674.333 56.1667 1027.4 161.6 877 238C689 333.5 23 258.5 10.5 426C-1.99999 593.5 751 854 831.5 809C912 764 899 543 764 601C629 659 624 972 669 1044.5C714 1117 1042 1212.5 1014.5 1422.5C987 1632.5 -95 1652 10.5 1407C116 1162 371 1232 388.5 1319.5C406 1407 453.5 1629.5 283.5 1785C147.5 1909.4 492.167 2050.5 681.5 2105.5"  stroke="#0DF3F3" strokeWidth="5" strokeDashoffset={99} strokeDasharray={999}/>
         </svg>
         <svg className='absolute w-1/2 top-10'  viewBox="0 0 1366 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id='path2' d="M691.233 0C340.72 29.5476 -262.657 122.368 127.938 257.268C616.183 425.893 1760.48 44.8309 1225.86 536.952C798.157 930.648 666.497 1025.68 654.129 1023.98" stroke="#642ad1" strokeWidth="5"/>
</svg>
    </div>
<div className='h-screen bg-black'></div>
<div className='h-screen bg-yellow-700'></div>
<div className='h-screen bg-blue-950'></div>
<div className='h-screen bg-yellow-700'></div>
<div className='h-screen bg-blue-950'></div>
<div className='h-screen bg-yellow-700'></div>
<div className='h-screen bg-blue-950'></div>
</div>
</div>
  );
};

export default PlaneAnimation;


