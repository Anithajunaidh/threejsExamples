import { useRef, useEffect } from 'react';

const Canvas = ({ width, height, onSetup, onRender }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      console.error('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }

    // Call the setup function passed as prop
    if (typeof onSetup === 'function') {
      onSetup(gl, canvas);
    }

    // Animation loop
    let requestId;
    const render = () => {
      if (typeof onRender === 'function') {
        onRender(gl, canvas);
      }
      requestId = requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [onSetup, onRender]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
