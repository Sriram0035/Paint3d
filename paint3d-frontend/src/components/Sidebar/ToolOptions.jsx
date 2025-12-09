// src/components/Sidebar/ToolOptions.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setOpacity, 
  setSmoothing, 
  setSecondaryColor, 
  setBrushColor, 
  setBrushSize 
} from '../../store/slices/toolSlice';
import './ToolOptions.css';

const ToolOptions = () => {
  const dispatch = useDispatch();
  const { 
    activeTool, 
    opacity, 
    smoothing, 
    brushColor, 
    secondaryColor,
    brushSize 
  } = useSelector((state) => state.tools);

  if (activeTool === 'brush' || activeTool === 'eraser') {
    return (
      <div className="tool-options">
        <h3>Brush Options</h3>
        
        <div className="option-group">
          <label>Opacity: {Math.round(opacity * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => dispatch(setOpacity(parseFloat(e.target.value)))}
          />
        </div>

        <div className="option-group">
          <label>Smoothing: {smoothing}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={smoothing}
            onChange={(e) => dispatch(setSmoothing(parseFloat(e.target.value)))}
          />
        </div>

        <div className="option-group">
          <label>Brush Size: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => dispatch(setBrushSize(parseInt(e.target.value)))}
          />
        </div>

        <div className="color-palette">
          <h4>Colors</h4>
          <div className="color-options">
            <div className="primary-color">
              <label>Primary</label>
              <div 
                className="color-preview" 
                style={{ backgroundColor: brushColor }}
              />
            </div>
            <div className="secondary-color">
              <label>Secondary</label>
              <div 
                className="color-preview" 
                style={{ backgroundColor: secondaryColor }}
                onClick={() => {
                  // Swap colors
                  const newSecondary = brushColor;
                  dispatch(setBrushColor(secondaryColor));
                  dispatch(setSecondaryColor(newSecondary));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTool === 'text') {
    return (
      <div className="tool-options">
        <h3>Text Options</h3>
        <div className="option-group">
          <label>Font Size</label>
          <input type="number" min="8" max="72" defaultValue="16" />
        </div>
        <div className="option-group">
          <label>Font Family</label>
          <select defaultValue="Arial">
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            <option>Georgia</option>
          </select>
        </div>
      </div>
    );
  }

  if (activeTool === 'rectangle' || activeTool === 'circle' || activeTool === 'line') {
    return (
      <div className="tool-options">
        <h3>Shape Options</h3>
        <div className="option-group">
          <label>Stroke Width: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => dispatch(setBrushSize(parseInt(e.target.value)))}
          />
        </div>
        <div className="option-group">
          <label>Fill Color</label>
          <input 
            type="color" 
            defaultValue="#ffffff" 
            onChange={(e) => dispatch(setSecondaryColor(e.target.value))}
          />
        </div>
        <div className="option-group">
          <label>Stroke Color</label>
          <input 
            type="color" 
            defaultValue={brushColor}
            onChange={(e) => dispatch(setBrushColor(e.target.value))}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="tool-options">
      <h3>Tool Options</h3>
      <p>Select a tool to see options here.</p>
    </div>
  );
};

export default ToolOptions;