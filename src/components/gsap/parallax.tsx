"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Parallax = () => {
  const images = [
    {
      src: 'https://picsum.photos/600/400?random=1',
      width: 600,
      height: 400
    },
    {
      src: 'https://picsum.photos/600/400?random=2',
      width: 600,
      height: 400
    },
    {
      src: 'https://picsum.photos/400/600?random=3',
      width: 400,
      height: 600
    },
    {
      src: 'https://picsum.photos/600/400?random=4',
      width: 600,
      height: 400
    },
    {
      src: 'https://picsum.photos/600/400?random=5',
      width: 600,
      height: 400
    }
  ];

  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current.forEach((image, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          pin:true,
          pinSpacing:true,
          invalidateOnRefresh:true,
          //anticipatePin:1,
         
        }
      });

      tl.to(image, {
        yPercent:()=> -100 * (index-1),
        ease: 'none'
      });
    });
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <Image
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          src={image.src}
          alt={`Image ${index + 1}`}
          width={image.width}
          height={image.height}
          priority
          sizes="50vw"
        />
      ))}
    </div>
  );
};

export default Parallax;
