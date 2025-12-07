import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav'; // Add this import


import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Project from "./pages/Project";
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect (() => {
    setIsLoggedIn(true);
  }, []); // Add empty dependency array to run only once

  return (
    <Router>
      <div className='app'>
        <TopNav isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/project/:projectName" element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
}