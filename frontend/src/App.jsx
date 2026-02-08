import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { api } from "./api";

import TopNav from './components/TopNav';
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import StyleGuide from './pages/StyleGuide';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const topbarRef = useRef(null);

  /* Test API */
  useEffect (() => {
    (async () => {
      try {
        const data = await api('/ping');
        console.log('API Response:', data);

      } catch (error) {
        console.error('Ping failed:', error);
      }
    })();
  }, []);


  /* Dynamically get Top Nav's height */
  useEffect(() => {
    function updateTopbarHeight() {
      if (topbarRef.current) {
        const height = topbarRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--top-nav-height",
          `${height}px`
        );
      }
    }

    // Call on mount
    updateTopbarHeight();

    // Listen for resize events
    window.addEventListener('resize', updateTopbarHeight);
    return () => window.removeEventListener('resize', updateTopbarHeight);
  }, []);

  return (
    <Router>
      <div className='app'>
        <div ref={topbarRef}>
          <TopNav isLoggedIn={isLoggedIn}/>
        </div>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:projectName" element={<Project />} />
          <Route path='/styleguide' element={<StyleGuide />} />
        </Routes>
      </div>
    </Router>
  );
}