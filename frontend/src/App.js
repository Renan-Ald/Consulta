import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Cliente from './components/Cliente';
import './App.css';

const App = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/login';
  const token = localStorage.getItem('token'); // Obtenha o token diretamente

  return (
    <div id="wrapper">
      {showSidebar && <Sidebar />}
      <div id="page-content-wrapper" className={showSidebar ? 'with-sidebar' : ''}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cliente" element={<Cliente token={token} />} />
          <Route path="/register" element={<Register token={token} />} />
          <Route path="/login" element={<Login />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
