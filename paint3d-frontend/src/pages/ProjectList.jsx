// src/pages/ProjectList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Projects</h1>
      <button onClick={() => navigate('/editor')}>
        Create New Project
      </button>
    </div>
  );
};

export default ProjectList;