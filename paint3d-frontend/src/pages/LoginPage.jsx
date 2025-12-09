// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, just navigate to editor
    navigate('/editor');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>Paint 3D</h1>
        <button
          onClick={handleLogin}
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Enter Editor
        </button>
      </div>
    </div>
  );
};

export default LoginPage;