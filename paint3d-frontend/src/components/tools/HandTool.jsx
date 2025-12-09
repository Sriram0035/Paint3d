// src/components/Tools/HandTool.jsx
import React, { useRef, useEffect, useState } from 'react';

const HandTool = ({ canvasRef }) => {
  const [isPanning, setIsPanning] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e) => {
      setIsPanning(true);
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!isPanning) return;
      
      const deltaX = e.clientX - lastPos.x;
      const deltaY = e.clientY - lastPos.y;
      
      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      // Apply transform to canvas
      canvas.style.transform = `translate(${offset.x + deltaX}px, ${offset.y + deltaY}px)`;
      
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [canvasRef, isPanning, lastPos, offset]);

  return null; // This component doesn't render anything
};

export default HandTool;