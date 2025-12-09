// src/store/slices/toolSlice.js
import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
  name: 'tools',
  initialState: {
    activeTool: 'select',
    brushSize: 5,
    brushColor: '#000000',
    secondaryColor: '#ffffff',
    fillColor: '#ffffff',
    opacity: 1,
    smoothing: 0.5,
    fontSize: 16,
    fontFamily: 'Arial',
    lineType: 'solid',
    shapeType: 'rectangle',
    is3DMode: false,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    canvasHistory: [],
    historyIndex: -1,
  },
  reducers: {
    setTool: (state, action) => {
      state.activeTool = action.payload;
    },
    setBrushSize: (state, action) => {
      state.brushSize = action.payload;
    },
    setBrushColor: (state, action) => {
      state.brushColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setSmoothing: (state, action) => {
      state.smoothing = action.payload;
    },
    toggle3DMode: (state) => {
      state.is3DMode = !state.is3DMode;
    },
    startDrawing: (state, action) => {
      state.isDrawing = true;
      state.lastX = action.payload.x;
      state.lastY = action.payload.y;
    },
    stopDrawing: (state) => {
      state.isDrawing = false;
    },
    updateLastPosition: (state, action) => {
      state.lastX = action.payload.x;
      state.lastY = action.payload.y;
    },
    addToHistory: (state, action) => {
      if (state.historyIndex < state.canvasHistory.length - 1) {
        state.canvasHistory = state.canvasHistory.slice(0, state.historyIndex + 1);
      }
      state.canvasHistory.push(action.payload);
      state.historyIndex = state.canvasHistory.length - 1;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.canvasHistory.length - 1) {
        state.historyIndex += 1;
      }
    },
    clearCanvas: (state) => {
      state.canvasHistory = [];
      state.historyIndex = -1;
    },
  },
});

export const { 
  setTool, 
  setBrushSize, 
  setBrushColor, 
  setSecondaryColor,
  setOpacity,
  setSmoothing,
  toggle3DMode,
  startDrawing,
  stopDrawing,
  updateLastPosition,
  addToHistory,
  undo,
  redo,
  clearCanvas
} = toolSlice.actions;
export default toolSlice.reducer;