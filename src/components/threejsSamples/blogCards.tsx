import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';
gsap.registerPlugin(ScrollTrigger, Flip);

const BlogCards = () => {
  const wheelRef = useRef(null);
  const headerRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    setup();
    gsap.to(wheelRef.current, {
      rotation: -360,
      ease: "none",
      duration: images.length,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1
      }
    });
    window.addEventListener('resize', setup);
    return () => window.removeEventListener('resize', setup);
  }, []);

  const setup = () => {
    let radius = wheelRef.current.offsetWidth / 2;
    let center = radius;
    let slice = 360 / images.length;
    const DEG2RAD = Math.PI / 180;
    gsap.set(images, {
      x: i => center + radius * Math.sin(i * slice * DEG2RAD),
      y: i => center - radius * Math.cos(i * slice * DEG2RAD),
      rotation: i => i * slice,
      xPercent: -50,
      yPercent: -50
    });
  };

  const closeCurrentCard = () => {
    if (currentCard) {
      let img = headerRef.current.querySelector("img");
      let state = Flip.getState(img);
      currentCard.appendChild(img);
      Flip.from(state, {
        ease: "power1.inOut",
        scale: true
      });
      setCurrentCard(null);
    }
  };

  const onClickCard = (e) => {
    let card = e.target;
    let image = card.querySelector("img");
    if (card !== currentCard) {
      closeCurrentCard();
      setCurrentCard(card);
      let state = Flip.getState(image);
      headerRef.current.appendChild(image);
      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: "power1.inOut"
      });
    } else {
      closeCurrentCard();
    }
  };

  const images = [
    'https://assets.codepen.io/756881/amys-1.jpg',
    // Add all your images here
  ];

  return (
    <div className="overflow-hidden p-0 m-0 h-[600vh] w-full font-sans bg-[#1d1e22] text-white">
      <div className="fixed top-0 left-0 w-full h-[60vh] flex items-center justify-center cursor-pointer header" ref={headerRef}>
        {/* Adapt header content here */}
      </div>
      <section className="fixed bottom-0 w-full h-[22vh]">
        <div ref={wheelRef} className="absolute top-0 flex items-center justify-center w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2 wheel">
          {images.map((src, index) => (
            <div key={index} className="absolute top-0 left-0 w-[6%] max-w-[200px] aspect-square cursor-pointer wheel__card" onClick={onClickCard}>
              <img src={src} className="w-full absolute z-50 cursor-pointer will-change-transform" />
            </div>
          ))}
        </div>
      </section>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 text-white font-normal uppercase text-sm">
        Scroll down
        {/* Adapt arrow icon here */}
      </div>
    </div>
  );
};

export default BlogCards;
