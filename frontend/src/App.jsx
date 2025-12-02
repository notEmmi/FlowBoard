import { useState } from 'react';
import { api } from "./lib/api";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

import './App.css'

function App() {

  return (
    <div className='main'>
      <h1>FlowBodrterard</h1>
      <Routes>
        <Route path="/" element={ <Home />} />
      </Routes>
    </div>
  );
}

export default App
