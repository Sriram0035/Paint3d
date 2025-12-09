// Create a new component for advanced tools: src/components/Sidebar/AdvancedTools.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../../store/slices/toolSlice';
import './AdvancedTools.css';

const AdvancedTools = () => {
  const dispatch = useDispatch();
  const { activeTool } = useSelector((state) => state.tools);
  const [tolerance, setTolerance] = useState(30);

  const handleFillClick = () => {
    dispatch(setTool('fill'));
    alert('Click on an area to fill it with color. Tolerance: ' + tolerance);
  };

  return (
    <div className="advanced-tools">
      <h3>Advanced Tools</h3>
      
      <div className="tool-options">
        <button 
          className={`tool-option-btn ${activeTool === 'fill' ? 'active' : ''}`}
          onClick={handleFillClick}
        >
          Fill Tool
        </button>
        
        <div className="option-control">
          <label>Tolerance:</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
          />
          <span>{tolerance}%</span>
        </div>
        
        <button className="tool-option-btn">
          Gradient Fill
        </button>
        
        <button className="tool-option-btn">
          Pattern Fill
        </button>
      </div>
    </div>
  );
};

export default AdvancedTools;