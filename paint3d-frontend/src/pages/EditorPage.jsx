// src/pages/EditorPage.jsx
import React, { useState } from 'react';
import ToolSidebar from '../components/Sidebar/ToolSidebar';
import ColorPicker from '../components/Sidebar/ColorPicker';
import ToolOptions from '../components/Sidebar/ToolOptions'; // Add this
import LayerPanel from '../components/Sidebar/LayerPanel';
import Canvas2D from '../components/Canvas/Canvas2D';
import Canvas3D from '../components/Canvas/Canvas3D';
import MainToolbar from '../components/Toolbar/MainToolbar';
import PageNavigation from '../components/Toolbar/PageNavigation';
import { useSelector } from 'react-redux';
import './EditorPage.css';

const EditorPage = () => {
  const { is3DMode } = useSelector((state) => state.tools);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  return (
    <div className="editor-container">
      <MainToolbar />
      
      <div className="editor-content">
        <div className="left-panel">
          <ToolSidebar />
          <ColorPicker />
          <ToolOptions /> {/* Add this line */}
        </div>
        
        <div className="canvas-wrapper">
          <PageNavigation />
          <div className="canvas-area">
            {is3DMode ? <Canvas3D /> : <Canvas2D />}
          </div>
        </div>
        
        <div className={`right-panel ${rightPanelOpen ? 'open' : 'closed'}`}>
          <button 
            className="panel-toggle"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          >
            {rightPanelOpen ? '◀' : '▶'}
          </button>
          
          {rightPanelOpen && (
            <>
              <LayerPanel />
              <div className="additional-tools">
                <h3>Properties</h3>
                {/* Add more property controls here */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;