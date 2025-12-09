// src/components/Sidebar/ToolSidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, toggle3DMode, setBrushSize } from '../../store/slices/toolSlice';
import {
  FaMousePointer,
  FaPencilAlt,
  FaEraser,
  FaSquare,
  FaCircle,
  FaFont,
  FaImage,
  FaCube,
  FaSlidersH,
  FaFillDrip,
  FaMagic,
  FaVectorSquare,
  FaHandPaper,
  FaMinus,
  FaArrowsAlt,
} from 'react-icons/fa';
import './ToolSidebar.css';

const ToolSidebar = () => {
  const dispatch = useDispatch();
  const { activeTool, is3DMode, brushSize } = useSelector((state) => state.tools);

  const tools = [
    { id: 'select', icon: <FaMousePointer />, label: 'Select', shortcut: 'V' },
    { id: 'hand', icon: <FaHandPaper />, label: 'Hand', shortcut: 'H' },
    { id: 'brush', icon: <FaPencilAlt />, label: 'Brush', shortcut: 'B' },
    { id: 'eraser', icon: <FaEraser />, label: 'Eraser', shortcut: 'E' },
    { id: 'line', icon: <FaMinus />, label: 'Line', shortcut: 'L' },
    { id: 'rectangle', icon: <FaSquare />, label: 'Rectangle', shortcut: 'R' },
    { id: 'circle', icon: <FaCircle />, label: 'Circle', shortcut: 'C' },
    { id: 'text', icon: <FaFont />, label: 'Text', shortcut: 'T' },
    { id: 'image', icon: <FaImage />, label: 'Image', shortcut: 'I' },
    { id: '3d', icon: <FaCube />, label: '3D Objects', shortcut: 'O' },
    { id: 'shapes', icon: <FaVectorSquare />, label: 'Shapes', shortcut: 'S' },
    { id: 'fill', icon: <FaFillDrip />, label: 'Fill', shortcut: 'F' },
    { id: 'effects', icon: <FaMagic />, label: 'Effects', shortcut: 'M' },
    { id: 'adjust', icon: <FaSlidersH />, label: 'Adjust', shortcut: 'A' },
    { id: 'move', icon: <FaArrowsAlt />, label: 'Move', shortcut: 'M' },
  ];

  const handleToolClick = (toolId) => {
    console.log('Tool clicked:', toolId);
    
    if (toolId === '3d') {
      dispatch(toggle3DMode());
    } else {
      dispatch(setTool(toolId));
    }
    
    // Set default brush size for different tools
    if (toolId === 'brush') {
      dispatch(setBrushSize(5));
    } else if (toolId === 'eraser') {
      dispatch(setBrushSize(10));
    } else if (toolId === 'line') {
      dispatch(setBrushSize(2));
    }
  };

  const handleBrushSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (!isNaN(size)) {
      dispatch(setBrushSize(size));
    }
  };

  return (
    <div className="tool-sidebar">
      <div className="tool-section">
        <h3>Basic Tools</h3>
        <div className="tool-grid">
          {tools.slice(0, 8).map((tool) => (
            <button
              key={tool.id}
              className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => handleToolClick(tool.id)}
              title={`${tool.label} (${tool.shortcut})`}
            >
              {tool.icon}
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h3>Advanced Tools</h3>
        <div className="tool-grid">
          {tools.slice(8).map((tool) => (
            <button
              key={tool.id}
              className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => handleToolClick(tool.id)}
              title={`${tool.label} (${tool.shortcut})`}
            >
              {tool.icon}
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h3>Brush Settings</h3>
        <div className="brush-controls">
          <label>Size: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
            className="brush-slider"
          />
          <div className="brush-preview">
            <div 
              className="brush-preview-circle"
              style={{
                width: `${brushSize}px`,
                height: `${brushSize}px`,
                backgroundColor: activeTool === 'eraser' ? '#ffffff' : '#000000'
              }}
            />
          </div>
        </div>
      </div>

      <div className="mode-toggle">
        <button
          className={`mode-button ${is3DMode ? 'active' : ''}`}
          onClick={() => {
            console.log('Toggle 3D mode');
            dispatch(toggle3DMode());
          }}
        >
          {is3DMode ? 'Switch to 2D' : 'Switch to 3D'}
        </button>
      </div>
      
      <div className="tool-section" style={{ marginTop: '20px' }}>
        <h3>Quick Help</h3>
        <div style={{
          fontSize: '11px',
          background: 'rgba(0,0,0,0.2)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <p><strong>Click & Drag:</strong> Draw with brush/eraser</p>
          <p><strong>Click:</strong> Draw shapes</p>
          <p><strong>B:</strong> Brush | <strong>E:</strong> Eraser</p>
          <p><strong>R:</strong> Rectangle | <strong>C:</strong> Circle</p>
          <p><strong>Current:</strong> {activeTool}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolSidebar;