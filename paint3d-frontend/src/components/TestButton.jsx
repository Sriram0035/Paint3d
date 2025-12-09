// src/components/TestButton.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../store/slices/toolSlice';

const TestButton = () => {
  const dispatch = useDispatch();
  const { activeTool } = useSelector((state) => state.tools);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 10000
    }}>
      <h4>Test Panel</h4>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <button onClick={() => dispatch(setTool('brush'))}>Brush</button>
        <button onClick={() => dispatch(setTool('rectangle'))}>Rectangle</button>
        <button onClick={() => dispatch(setTool('circle'))}>Circle</button>
        <button onClick={() => dispatch(setTool('select'))}>Select</button>
      </div>
      <div style={{ fontSize: '12px' }}>
        Current Tool: <strong>{activeTool}</strong>
      </div>
    </div>
  );
};

export default TestButton;