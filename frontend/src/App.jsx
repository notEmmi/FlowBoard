import { useState } from 'react'
import { api } from "./lib/api";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>

      <Routes>
        <Route path="/" element="" />
      </Routes>
    </div>
  )
}

export default App
