"use client"
import React, { createContext, useRef, useContext, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const offsetContext = createContext(0);
gsap.registerPlugin(ScrollTrigger);

function Block({ children, factor, ...props }) {
  const ref = useRef(); // Initialize ref as a mutable ref

  // Register ScrollTrigger with GSAP
  useEffect(() => {
    // Check if ref.current exists before using it
    if (ref.current) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        animation: gsap.to(ref.current.position, {
          y: window.innerHeight * factor,
          ease: "none",
        }),
      });
    }
  }, [ref.current, factor]); // Include ref.current and factor in the dependency array

  return (
    <offsetContext.Provider value={factor}>
      <group ref={ref} {...props}>
        {children}
      </group>
    </offsetContext.Provider>
  );
}

export default Block;
