// src/components/Canvas/Canvas2D.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  startDrawing, 
  stopDrawing, 
  updateLastPosition, 
  addToHistory,
  setTool,
  undo,
  redo,
  clearCanvas
} from '../../store/slices/toolSlice';
import './Canvas2D.css';

const Canvas2D = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  
  const dispatch = useDispatch();
  const { activeTool, brushSize, brushColor, is3DMode } = useSelector((state) => state.tools);

  // Initialize canvas
  useEffect(() => {
    console.log('Initializing canvas with tool:', activeTool);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    } else {
      canvas.width = 800;
      canvas.height = 600;
    }

    // Get context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    // Set default styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.fillStyle = '#ffffff';
    
    // Fill background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    contextRef.current = ctx;
    
    // Save initial state
    saveCanvasState();
    
    console.log('Canvas initialized', { width: canvas.width, height: canvas.height });
  }, []);

  // Save canvas state for undo/redo
  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    dispatch(addToHistory(dataURL));
  }, [dispatch]);

  // Load canvas state from history
  const loadCanvasState = useCallback((dataURL) => {
    if (!canvasRef.current || !contextRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  }, []);

  // Handle mouse down
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    
    if (!contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set last position
    setLastPos({ x, y });
    
    // Start drawing based on tool
    if (activeTool === 'brush' || activeTool === 'eraser') {
      setIsDrawing(true);
      
      // Set drawing properties
      if (activeTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = brushSize * 2;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
      }
      
      // Start path
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Dispatch actions
      dispatch(startDrawing({ x, y }));
    } else if (activeTool === 'rectangle') {
      // Draw rectangle
      ctx.beginPath();
      ctx.rect(x - 50, y - 30, 100, 60);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.stroke();
      saveCanvasState();
    } else if (activeTool === 'circle') {
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.stroke();
      saveCanvasState();
    } else if (activeTool === 'line') {
      // Draw line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 100, y);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.stroke();
      saveCanvasState();
    }
    
    console.log('Mouse down at:', { x, y, tool: activeTool });
  }, [activeTool, brushColor, brushSize, dispatch, saveCanvasState]);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw line
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Update position
    setLastPos({ x, y });
    dispatch(updateLastPosition({ x, y }));
  }, [isDrawing, dispatch]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      dispatch(stopDrawing());
      
      // Save state after drawing
      saveCanvasState();
      
      // Reset composite operation
      if (contextRef.current) {
        contextRef.current.globalCompositeOperation = 'source-over';
      }
    }
  }, [isDrawing, dispatch, saveCanvasState]);

  // Clear canvas
  const clearCanvasHandler = useCallback(() => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    saveCanvasState();
    console.log('Canvas cleared');
  }, [saveCanvasState]);

  // Add event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('Adding event listeners for tool:', activeTool);

    // Mouse events
    const mouseDownHandler = (e) => handleMouseDown(e);
    const mouseMoveHandler = (e) => handleMouseMove(e);
    const mouseUpHandler = () => handleMouseUp();
    
    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('mouseout', mouseUpHandler);
    
    // Touch events for mobile
    const touchStartHandler = (e) => {
      e.preventDefault();
      if (e.touches[0]) handleMouseDown(e.touches[0]);
    };
    const touchMoveHandler = (e) => {
      e.preventDefault();
      if (e.touches[0]) handleMouseMove(e.touches[0]);
    };
    const touchEndHandler = (e) => {
      e.preventDefault();
      handleMouseUp();
    };
    
    canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
    canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });
    canvas.addEventListener('touchend', touchEndHandler);

    return () => {
      canvas.removeEventListener('mousedown', mouseDownHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('mouseup', mouseUpHandler);
      canvas.removeEventListener('mouseout', mouseUpHandler);
      
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
      canvas.removeEventListener('touchend', touchEndHandler);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, activeTool]);

  // Update cursor based on tool
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cursor = 'default';
    
    switch (activeTool) {
      case 'brush':
      case 'eraser':
        cursor = 'crosshair';
        break;
      case 'select':
        cursor = 'default';
        break;
      case 'hand':
        cursor = 'grab';
        break;
      case 'rectangle':
      case 'circle':
      case 'line':
        cursor = 'crosshair';
        break;
      default:
        cursor = 'default';
    }
    
    canvas.style.cursor = cursor;
  }, [activeTool]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key.toLowerCase()) {
        case 'b':
          dispatch(setTool('brush'));
          e.preventDefault();
          break;
        case 'e':
          dispatch(setTool('eraser'));
          e.preventDefault();
          break;
        case 'r':
          dispatch(setTool('rectangle'));
          e.preventDefault();
          break;
        case 'c':
          dispatch(setTool('circle'));
          e.preventDefault();
          break;
        case 'l':
          dispatch(setTool('line'));
          e.preventDefault();
          break;
        case 's':
          dispatch(setTool('select'));
          e.preventDefault();
          break;
        case 'h':
          dispatch(setTool('hand'));
          e.preventDefault();
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              // Ctrl+Shift+Z for redo
              dispatch(redo());
            } else {
              // Ctrl+Z for undo
              dispatch(undo());
            }
            e.preventDefault();
          }
          break;
        case 'delete':
        case 'backspace':
          clearCanvasHandler();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, clearCanvasHandler]);

  // Add control panel for testing
  const renderControlPanel = () => (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: '1000',
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Canvas Controls</h4>
      
      <div style={{ marginBottom: '5px' }}>
        <strong>Current Tool:</strong> {activeTool}
      </div>
      
      <div style={{ marginBottom: '5px' }}>
        <strong>Brush Size:</strong> {brushSize}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Brush Color:</strong> 
        <div style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          background: brushColor,
          marginLeft: '5px',
          border: '1px solid white'
        }} />
      </div>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <button 
          onClick={() => dispatch(setTool('brush'))}
          style={{ padding: '5px', background: activeTool === 'brush' ? '#3498db' : '#2c3e50' }}
        >
          Brush
        </button>
        <button 
          onClick={() => dispatch(setTool('eraser'))}
          style={{ padding: '5px', background: activeTool === 'eraser' ? '#3498db' : '#2c3e50' }}
        >
          Eraser
        </button>
        <button 
          onClick={() => dispatch(setTool('rectangle'))}
          style={{ padding: '5px', background: activeTool === 'rectangle' ? '#3498db' : '#2c3e50' }}
        >
          Rectangle
        </button>
        <button 
          onClick={() => dispatch(setTool('circle'))}
          style={{ padding: '5px', background: activeTool === 'circle' ? '#3498db' : '#2c3e50' }}
        >
          Circle
        </button>
      </div>
      
      <div style={{ fontSize: '10px', opacity: 0.7 }}>
        <div>Shortcuts: B=Brush, E=Eraser, R=Rectangle</div>
        <div>C=Circle, L=Line, S=Select, H=Hand</div>
        <div>Ctrl+Z=Undo, Ctrl+Shift+Z=Redo</div>
      </div>
    </div>
  );

  return (
    <div className="canvas-container">
      {renderControlPanel()}
      <canvas
        ref={canvasRef}
        className="html5-canvas"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: '#ffffff',
          border: '1px solid #ddd',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default Canvas2D;