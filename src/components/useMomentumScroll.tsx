// useMomentumScroll.js
import { useEffect, useRef } from 'react';

const useMomentumScroll = () => {
  const containerRef = useRef(null);
  const isTouching = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    console.log('Momentum scroll hook initialized');
    let startY = 0;
    let momentum = 0;
    let lastTimestamp = 0;

    const handleTouchStart = (e) => {
      isTouching.current = true;
      startY = e.touches[0].pageY;
      momentum = 0.2;
    };

    const handleTouchMove = (e) => {
      if (!isTouching.current) return;

      const deltaY = e.touches[0].pageY - startY;
      startY = e.touches[0].pageY;

      const timestamp = Date.now();
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Calculate momentum
      momentum = (0.9 * momentum + (deltaY / elapsed)) / 2;

      // Apply momentum to the scroll position
      container.scrollTop += 15*deltaY;

      e.preventDefault();
    };

    const handleTouchEnd = () => {
      isTouching.current = false;

      // Apply momentum after touch ends
      const animate = () => {
        if (!isTouching.current && Math.abs(momentum) > 0.001) {
          container.scrollTop += momentum;
          momentum *= 0.9;
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return containerRef;
};

export default useMomentumScroll;


