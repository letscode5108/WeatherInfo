import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <div>
        <header className= "bg-blue-500 p-4 shadow-lg">
          <h1  className="text-white text-2xl font-bold">Weather Dashboard</h1>
          <nav className="bg-blue-300 p-3">
          <ul className="flex space-x-4">
          <li>
            <Link to="/"  className="text-black hover:text-gray-300">Home</Link>
            </li>
            <li>
            <Link to="/favorites" className="text-black hover:text-gray-300">Favorites</Link>
            </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



















