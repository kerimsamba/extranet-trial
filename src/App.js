import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import GigList from './components/GigList';
import GigDetail from './components/GigDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gigs" element={<GigList />} />
          <Route path="/gigs/:id" element={<GigDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;