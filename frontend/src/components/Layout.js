import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Importa o Sidebar
import '../App.css'; // Importa o CSS global

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div id="wrapper">
      {!isLoginPage && <Sidebar />} {/* Exibe o Sidebar em páginas diferentes da de login */}

      <div id="page-content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Layout;
