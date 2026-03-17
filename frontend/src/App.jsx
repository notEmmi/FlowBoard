// Root app component: owns auth state, defines all client-side routes, and renders the top nav.
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { api, clearAccessToken, getAccessToken, onAuthExpired } from "./api";

import TopNav from './components/TopNav';
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Backlog from "./pages/Backlog";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";
import StyleGuide from './pages/StyleGuide';
import ResetPassword from './pages/ResetPassword';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));
  const topbarRef = useRef(null);

  function handleAuthSuccess() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    clearAccessToken();
    setIsLoggedIn(false);
  }

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

  // Keep UI auth state in sync when API detects an expired/invalid token.
  useEffect(() => {
    const unsubscribe = onAuthExpired(() => {
      setIsLoggedIn(false);
      if (window.location.pathname !== '/landing') {
        window.location.assign('/landing');
      }
    });

    return unsubscribe;
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
          <TopNav isLoggedIn={isLoggedIn} onAuthSuccess={handleAuthSuccess} onLogout={handleLogout} />
        </div>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/landing" element={<Landing onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:projectName" element={<Project />} />
          <Route path="/project/:projectName/backlog" element={<Backlog />} />
          <Route path="/project/:projectName/timeline" element={<Timeline />} />
          <Route path="/project/:projectName/settings" element={<Settings />} />
          <Route path='/styleguide' element={<StyleGuide />} />
        </Routes>
      </div>
    </Router>
  );
}