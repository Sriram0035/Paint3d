# Paint 3D - Advanced Web-Based Drawing & Editing Application

![Paint 3D](https://img.shields.io/badge/React-18.2.0-blue)
![Django](https://img.shields.io/badge/Django-4.2-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A comprehensive web-based drawing and editing application with both 2D and 3D capabilities, built with React.js, Three.js, and Django.

## 🎨 Features

### 🖌️ Drawing Tools
- **Brush Tool**: Freehand drawing with customizable size and color
- **Eraser Tool**: Remove parts of your drawing
- **Shapes**: Rectangle, Circle, Line with customizable stroke and fill
- **Text Tool**: Add and edit text with various fonts and sizes
- **Image Import**: Upload and edit images

### 🎯 Advanced Features
- **3D Mode**: Switch between 2D and 3D canvases
- **Layer Management**: Create, delete, reorder, and hide/show layers
- **Color Picker**: Advanced color selection with palettes
- **Undo/Redo**: Full history management
- **Multiple Pages**: Create and manage multiple canvas pages
- **Export Options**: Save your work in various formats

### 🛠️ Editing Tools
- **Select Tool**: Select and manipulate objects
- **Hand Tool**: Pan around the canvas
- **Adjustments**: Brightness, contrast, saturation controls
- **Filters**: Apply various image filters
- **Transform**: Scale, rotate, and flip objects

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ and pip
- PostgreSQL (optional, SQLite for development)

### Backend Setup (Django)

```bash
# Navigate to backend directory
cd paint3d_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers pillow

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run server
python manage.py runserver

# Navigate to frontend directory
cd paint3d-frontend

# Install dependencies
npm install

# Start development server
npm start


paint3d-project/
├── paint3d_backend/          # Django Backend
│   ├── editor_api/           # Main Django app
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # Data serializers
│   │   └── urls.py           # URL routing
│   ├── manage.py
│   └── settings.py
│
├── paint3d-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Canvas/       # 2D and 3D canvas
│   │   │   ├── Sidebar/      # Tool sidebar
│   │   │   ├── Toolbar/      # Main toolbar
│   │   │   └── Modals/       # Modal dialogs
│   │   ├── pages/            # Page components
│   │   ├── store/            # Redux store
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── public/
│
└── README.md                 # This file
