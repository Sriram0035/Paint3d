// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './slices/toolSlice';

export default configureStore({
  reducer: {
    tools: toolReducer,
  },
});