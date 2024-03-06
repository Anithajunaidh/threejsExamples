"use client"
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import images from '@/constants/images';

const FloatingImage = () => {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) => start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  useEffect(() => {
    gsap.set(plane1.current, { position: 'absolute', top: 0, left: 0 });
    gsap.set(plane2.current, { position: 'absolute', top: 0, left: 0 });
    gsap.set(plane3.current, { position: 'absolute', top: 0, left: 0 });
  }, []);

  return (

    <div onMouseMove={(e) => manageMouseMove(e)} >
      <div ref={plane1}>
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
      </div>

      <div ref={plane2}>
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
      </div>

      <div ref={plane3}>
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
      </div>
    </div>

  );
};

export default FloatingImage;
