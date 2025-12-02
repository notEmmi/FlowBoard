import { useState } from 'react';
import { api } from "./lib/api";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Dashboard";
import Registration from "./pages/Dashboard";




import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
