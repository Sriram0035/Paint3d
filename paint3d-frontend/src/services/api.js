// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Project API
export const projectAPI = {
  getAll: () => api.get('/projects/'),
  getById: (id) => api.get(`/projects/${id}/`),
  create: (data) => api.post('/projects/', data),
  update: (id, data) => api.put(`/projects/${id}/`, data),
  delete: (id) => api.delete(`/projects/${id}/`),
};

// Canvas Page API
export const pageAPI = {
  getAll: (projectId) => api.get(`/pages/?project_id=${projectId}`),
  getById: (id) => api.get(`/pages/${id}/`),
  create: (data) => api.post('/pages/', data),
  update: (id, data) => api.put(`/pages/${id}/`, data),
  delete: (id) => api.delete(`/pages/${id}/`),
};

// Asset API
export const assetAPI = {
  upload: (formData) => api.post('/assets/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getAll: () => api.get('/assets/'),
  delete: (id) => api.delete(`/assets/${id}/`),
};

// Export API instance
export default api;