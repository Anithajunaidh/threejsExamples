import { motion, useAnimation, useMotionValue, useScroll } from 'framer-motion';
import { useEffect } from 'react';

const SnakeLine = () => {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const imageY = useMotionValue(0);
  let drawLength = 0;

  useEffect(() => {
    const path = document.getElementById("scrollPath");
    const pathLength = path.getTotalLength();

    // Set the initial animation state for the line
    controls.start({ strokeDashoffset: pathLength, strokeDasharray: pathLength });

    // Update the stroke-dashoffset based on the scroll position for the line
    const updateScroll = () => {
      const drawLength = pathLength * scrollYProgress.get();
      controls.start({ strokeDashoffset: pathLength - drawLength });

      // Update the image position based on the scroll position
      imageY.set(scrollYProgress.get());
    };

    // Add scroll event listener using framer-motion
    controls.set({ strokeDasharray: pathLength });
    controls.start({ strokeDashoffset: pathLength });
    window.addEventListener("scroll", updateScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [controls, scrollYProgress, imageY]);

  return (
    <div >
    <motion.svg
      viewBox="0 0 1019 2098"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      animate={controls}
      className="fixed top-0 left-1/2 transform -translate-x-1/2 h-full z-50"
    >
      <motion.path
        id="scrollPath"
        d="M479 3C674.333 46.1667 1027.4 151.6 877 228C689 323.5 23 248.5 10.5 416C-1.99999 583.5 751 844 831.5 799C912 754 899 533 764 591C629 649 624 962 669 1034.5C714 1107 1042 1202.5 1014.5 1412.5C987 1622.5 -95 1642 10.5 1397C116 1152 371 1222 388.5 1309.5C406 1397 453.5 1619.5 283.5 1775C147.5 1899.4 492.167 2040.5 681.5 2095.5"
        stroke="transparent"
        strokeWidth="5"
        className="stroke-current"
      />
    </motion.svg>  
    <motion.img
        src='/assets/images/landing-page/rocket.svg'
        alt="rocket"
        style={{
          // position: "absolute",
          left: "50%",
          top:`${drawLength}px`,
          height: "auto",
          width: "50%", // Adjust the width based on your image dimensions
          opacity: 0.8, // Adjust the opacity as needed
          mixBlendMode: "multiply", // Blend mode to make it visually blend with the invisible line
          y:imageY, // Use the same controls as the line to move the image along the path
        }}
      />
    </div>
  );
};

export default SnakeLine;



