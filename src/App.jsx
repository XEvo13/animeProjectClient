import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import axios from "axios";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import AnimeList from './components/AnimeListing'
import AnimeDetail from './components/AnimeDetail';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/anime/:id" element={<AnimeDetail />} />
    </Routes>
  </Router>
  )
}

export default App
