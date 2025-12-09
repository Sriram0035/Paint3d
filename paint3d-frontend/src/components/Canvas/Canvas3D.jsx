// src/components/Canvas/Canvas3D.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import './Canvas3D.css';

const Canvas3D = () => {
  const mountRef = useRef(null);
  const { activeTool } = useSelector((state) => state.tools);
  const [scene] = useState(() => new THREE.Scene());
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    // Initialize Three.js
    const initThreeJS = async () => {
      if (!mountRef.current) return;

      // Camera
      const newCamera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      newCamera.position.z = 5;
      setCamera(newCamera);

      // Renderer
      const newRenderer = new THREE.WebGLRenderer({ antialias: true });
      newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      newRenderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(newRenderer.domElement);
      setRenderer(newRenderer);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);

      // Grid helper
      const gridHelper = new THREE.GridHelper(10, 10);
      scene.add(gridHelper);

      // Axes helper
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Add initial cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Animation loop
      let animationId;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        // Rotate cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        if (newRenderer && newCamera) {
          newRenderer.render(scene, newCamera);
        }
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !newCamera || !newRenderer) return;
        
        newCamera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        newCamera.updateProjectionMatrix();
        newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        
        if (mountRef.current && newRenderer?.domElement) {
          mountRef.current.removeChild(newRenderer.domElement);
        }
        
        if (newRenderer) {
          newRenderer.dispose();
        }
        
        // Clear scene
        while(scene.children.length > 0) { 
          scene.remove(scene.children[0]); 
        }
      };
    };

    initThreeJS();
  }, [scene]); // Only depend on scene

  // Handle 3D tool changes
  useEffect(() => {
    if (activeTool === '3d' && scene) {
      // Add a sphere when in 3D mode
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(3, 0, 0);
      scene.add(sphere);
      
      return () => {
        scene.remove(sphere);
      };
    }
  }, [activeTool, scene]);

  return (
    <div 
      ref={mountRef} 
      className="canvas-3d-container"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Canvas3D;