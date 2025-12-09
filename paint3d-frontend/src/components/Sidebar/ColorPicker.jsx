// src/components/Sidebar/ColorPicker.jsx
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { setBrushColor } from '../../store/slices/toolSlice';
import './ColorPicker.css';

const ColorPicker = () => {
  const dispatch = useDispatch();
  const { brushColor } = useSelector((state) => state.tools);
  const [showPicker, setShowPicker] = useState(false);

  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff9500', '#ff2d55',
    '#5856d6', '#007aff', '#34c759', '#ffcc00', '#ff3b30',
  ];

  const handleColorChange = (color) => {
    dispatch(setBrushColor(color.hex));
  };

  return (
    <div className="color-picker-container">
      <div className="color-section">
        <h4>Color Palette</h4>
        <div className="preset-colors">
          {presetColors.map((color) => (
            <button
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => dispatch(setBrushColor(color))}
              title={color}
            />
          ))}
        </div>
        
        <div className="current-color">
          <h4>Current Color</h4>
          <div className="current-color-display">
            <div 
              className="color-preview" 
              style={{ backgroundColor: brushColor }}
              onClick={() => setShowPicker(!showPicker)}
            />
            <span className="color-value">{brushColor}</span>
          </div>
          
          {showPicker && (
            <div className="color-picker-popup">
              <ChromePicker
                color={brushColor}
                onChange={handleColorChange}
                disableAlpha={false}
              />
            </div>
          )}
        </div>

        <div className="color-actions">
          <button className="action-button">Save to Palette</button>
          <button className="action-button">Gradient</button>
          <button className="action-button">Texture</button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;