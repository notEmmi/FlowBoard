import { useState } from 'react';
import { api } from "./lib/api";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

import './App.css';

function App() {
  set [loggedIn, setLoggedIn] = useState(false);
    
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
