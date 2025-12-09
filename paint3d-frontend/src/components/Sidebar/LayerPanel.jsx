// src/components/Sidebar/LayerPanel.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaUnlock, FaClone, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './LayerPanel.css';

const LayerPanel = () => {
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true, locked: false, type: 'background' },
    { id: 2, name: 'Text Layer 1', visible: true, locked: false, type: 'text' },
    { id: 3, name: 'Image Layer', visible: true, locked: false, type: 'image' },
    { id: 4, name: '3D Object', visible: true, locked: true, type: '3d' },
    { id: 5, name: 'Drawing Layer', visible: true, locked: false, type: 'drawing' },
  ]);

  const [selectedLayer, setSelectedLayer] = useState(1);

  const toggleVisibility = (id) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (id) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const addLayer = () => {
    const newId = layers.length + 1;
    setLayers([...layers, {
      id: newId,
      name: `Layer ${newId}`,
      visible: true,
      locked: false,
      type: 'drawing'
    }]);
  };

  const deleteLayer = (id) => {
    if (layers.length > 1) {
      setLayers(layers.filter(layer => layer.id !== id));
    }
  };

  const duplicateLayer = (id) => {
    const layerToDuplicate = layers.find(layer => layer.id === id);
    if (layerToDuplicate) {
      const newId = Math.max(...layers.map(l => l.id)) + 1;
      setLayers([...layers, { ...layerToDuplicate, id: newId, name: `${layerToDuplicate.name} Copy` }]);
    }
  };

  const moveLayer = (id, direction) => {
    const index = layers.findIndex(layer => layer.id === id);
    if (direction === 'up' && index > 0) {
      const newLayers = [...layers];
      [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
      setLayers(newLayers);
    } else if (direction === 'down' && index < layers.length - 1) {
      const newLayers = [...layers];
      [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
      setLayers(newLayers);
    }
  };

  return (
    <div className="layer-panel">
      <div className="panel-header">
        <h3>Layers</h3>
        <button className="add-layer-btn" onClick={addLayer}>+ Add Layer</button>
      </div>
      
      <div className="layer-list">
        {layers.map((layer) => (
          <div 
            key={layer.id} 
            className={`layer-item ${selectedLayer === layer.id ? 'selected' : ''}`}
            onClick={() => setSelectedLayer(layer.id)}
          >
            <div className="layer-info">
              <div className={`layer-type-icon ${layer.type}`} />
              <span className="layer-name">{layer.name}</span>
            </div>
            
            <div className="layer-controls">
              <button 
                className="layer-btn" 
                onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
                title={layer.visible ? 'Hide' : 'Show'}
              >
                {layer.visible ? <FaEye /> : <FaEyeSlash />}
              </button>
              
              <button 
                className="layer-btn" 
                onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
                title={layer.locked ? 'Unlock' : 'Lock'}
              >
                {layer.locked ? <FaLock /> : <FaUnlock />}
              </button>
              
              <button 
                className="layer-btn" 
                onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, 'up'); }}
                title="Move Up"
              >
                <FaArrowUp />
              </button>
              
              <button 
                className="layer-btn" 
                onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, 'down'); }}
                title="Move Down"
              >
                <FaArrowDown />
              </button>
              
              <button 
                className="layer-btn" 
                onClick={(e) => { e.stopPropagation(); duplicateLayer(layer.id); }}
                title="Duplicate"
              >
                <FaClone />
              </button>
              
              <button 
                className="layer-btn delete" 
                onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="layer-properties">
        <h4>Layer Properties</h4>
        <div className="property-control">
          <label>Opacity</label>
          <input type="range" min="0" max="100" defaultValue="100" />
        </div>
        <div className="property-control">
          <label>Blend Mode</label>
          <select>
            <option>Normal</option>
            <option>Multiply</option>
            <option>Screen</option>
            <option>Overlay</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LayerPanel;