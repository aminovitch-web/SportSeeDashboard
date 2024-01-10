import React from 'react';
import './_App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';
import Header from './layouts/Header/Header';
import Sidebar from './layouts/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <Header />
      <div className="layout_wrapper">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}
