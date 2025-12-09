// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/store';
import EditorPage from './pages/EditorPage';
import ProjectList from './pages/ProjectList';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;