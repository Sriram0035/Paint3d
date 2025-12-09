// src/components/Toolbar/MainToolbar.jsx
import React from 'react';
import { 
  FaSave, FaFolderOpen, FaUndo, FaRedo, FaPrint, 
  FaShareAlt, FaCrop, FaFilter, FaAdjust, 
  FaCopy, FaPaste, FaCut, FaTrash, FaEyeDropper
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo, clearCanvas } from '../../store/slices/toolSlice';
import './MainToolbar.css';

const MainToolbar = () => {
  const dispatch = useDispatch();
  const { activeTool } = useSelector((state) => state.tools);

  const handleFileAction = (action) => {
    switch (action) {
      case 'save':
        console.log('Save project');
        break;
      case 'open':
        console.log('Open project');
        break;
      case 'undo':
        dispatch(undo());
        break;
      case 'redo':
        dispatch(redo());
        break;
      case 'clear':
        if (window.confirm('Clear the entire canvas?')) {
          dispatch(clearCanvas());
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="main-toolbar">
      <div className="toolbar-section">
        <div className="toolbar-group">
          <button className="toolbar-btn" onClick={() => handleFileAction('save')}>
            <FaSave /> Save
          </button>
          <button className="toolbar-btn" onClick={() => handleFileAction('open')}>
            <FaFolderOpen /> Open
          </button>
          <button className="toolbar-btn" onClick={() => handleFileAction('undo')}>
            <FaUndo /> Undo
          </button>
          <button className="toolbar-btn" onClick={() => handleFileAction('redo')}>
            <FaRedo /> Redo
          </button>
        </div>

        <div className="toolbar-group">
          <button className="toolbar-btn">
            <FaCopy /> Copy
          </button>
          <button className="toolbar-btn">
            <FaPaste /> Paste
          </button>
          <button className="toolbar-btn">
            <FaCut /> Cut
          </button>
          <button className="toolbar-btn" onClick={() => handleFileAction('clear')}>
            <FaTrash /> Clear
          </button>
        </div>

        <div className="toolbar-group">
          <button className="toolbar-btn">
            <FaCrop /> Crop
          </button>
          <button className="toolbar-btn">
            <FaFilter /> Filters
          </button>
          <button className="toolbar-btn">
            <FaAdjust /> Adjustments
          </button>
          <button className="toolbar-btn">
            <FaEyeDropper /> Color Picker
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <div className="tool-info">
          <span className="current-tool">Current Tool: <strong>{activeTool}</strong></span>
        </div>
      </div>

      <div className="toolbar-section">
        <button className="toolbar-btn">
          <FaShareAlt /> Share
        </button>
        <button className="toolbar-btn">
          <FaPrint /> Print
        </button>
      </div>
    </div>
  );
};

export default MainToolbar;