// src/components/Toolbar/PageNavigation.jsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaClone, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './PageNavigation.css';

const PageNavigation = () => {
  const [pages, setPages] = useState([
    { id: 1, title: 'Page 1', active: true },
    { id: 2, title: 'Page 2', active: false },
    { id: 3, title: 'Page 3', active: false },
  ]);

  const [activePage, setActivePage] = useState(1);

  const addPage = () => {
    const newId = pages.length + 1;
    const newPages = pages.map(page => ({ ...page, active: false }));
    setPages([...newPages, { id: newId, title: `Page ${newId}`, active: true }]);
    setActivePage(newId);
  };

  const deletePage = (id) => {
    if (pages.length > 1) {
      const newPages = pages.filter(page => page.id !== id);
      setPages(newPages.map((page, index) => ({ 
        ...page, 
        title: `Page ${index + 1}` 
      })));
      setActivePage(newPages[0].id);
    }
  };

  const duplicatePage = (id) => {
    const pageToDuplicate = pages.find(page => page.id === id);
    if (pageToDuplicate) {
      const newId = pages.length + 1;
      const newPages = pages.map(page => ({ ...page, active: false }));
      setPages([...newPages, { 
        ...pageToDuplicate, 
        id: newId, 
        title: `${pageToDuplicate.title} Copy`, 
        active: true 
      }]);
      setActivePage(newId);
    }
  };

  const navigatePage = (direction) => {
    const currentIndex = pages.findIndex(page => page.id === activePage);
    if (direction === 'prev' && currentIndex > 0) {
      setActivePage(pages[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < pages.length - 1) {
      setActivePage(pages[currentIndex + 1].id);
    }
  };

  return (
    <div className="page-navigation">
      <div className="page-controls">
        <button 
          className="nav-btn" 
          onClick={() => navigatePage('prev')}
          disabled={pages.findIndex(page => page.id === activePage) === 0}
        >
          <FaArrowLeft />
        </button>
        
        <div className="page-thumbnails">
          {pages.map((page) => (
            <div 
              key={page.id} 
              className={`page-thumbnail ${page.id === activePage ? 'active' : ''}`}
              onClick={() => setActivePage(page.id)}
            >
              <div className="thumbnail-preview">
                <span>{page.id}</span>
              </div>
              <div className="page-info">
                <span className="page-title">{page.title}</span>
                <div className="page-actions">
                  <button 
                    className="page-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicatePage(page.id);
                    }}
                  >
                    <FaClone />
                  </button>
                  <button 
                    className="page-action-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePage(page.id);
                    }}
                    disabled={pages.length === 1}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="nav-btn" 
          onClick={() => navigatePage('next')}
          disabled={pages.findIndex(page => page.id === activePage) === pages.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
      
      <button className="add-page-btn" onClick={addPage}>
        <FaPlus /> Add Page
      </button>
    </div>
  );
};

export default PageNavigation;