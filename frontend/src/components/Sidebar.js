import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.getElementById('wrapper').classList.toggle('menuDisplayed');
  };

  const toggleMenu = (menuName) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuName]: !prevOpenMenus[menuName],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleClienteClick = () => {
    toggleMenu('cliente'); // Abre ou fecha o submenu
    navigate('/cliente'); // Redireciona para a página de clientes
  };
  const handleParceirosClick = () => {
    toggleMenu('parceiros'); // Abre ou fecha o submenu
    navigate('/parceiro/view'); // Redireciona para a página de clientes
  };
  const handleProcedimentosClick = () => {
    toggleMenu('procedimentos'); // Abre ou fecha o submenu
    navigate('/procedimento/view'); // Redireciona para a página de clientes
  };
  const handleAgendamentoClick = () => {
    toggleMenu('agendamento'); // Abre ou fecha o submenu
    navigate('/agendamento/view'); // Redireciona para a página de clientes
  };

  return (
    <>
      <button id="menu-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div id="sidebar-wrapper" className={isOpen ? 'menuDisplayed' : ''}>
        <ul className="sidebar-nav">
          <li><a href="/"><i className="fas fa-home icone"></i>Home</a></li>

          <li>
            <button className='bnt_sidebar' onClick={handleAgendamentoClick}>
              <i className="fas fa-calendar-alt icone"></i>  Agendamento
            </button>
            {openMenus['agendamento'] && (
              <ul className='bnt_ad'>
                <li><a href="/agendamento">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('caixa')}>
              <i className="fas fa-cash-register icone"></i> Caixa
            </button>
            {openMenus['caixa'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Transação</a></li>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={handleClienteClick}>
              <i className="fas fa-users icone"></i>Cliente</button>
            {openMenus['cliente'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('financeiro')}>
              <i className="fas fa-chart-line icone"></i> Financeiro
            </button>
            {openMenus['financeiro'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('funcionario')}>
              <i className="fas fa-user-tie icone"></i>  Funcionário
            </button>
            {openMenus['funcionario'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={handleParceirosClick}>
              <i className="fas fa-handshake icone"></i>Parceiros
            </button>
            {openMenus['parceiros'] && (
              <ul className='bnt_ad'>
                <li><a href="/parceiro">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={handleProcedimentosClick}>
              <i className="fas fa-tasks icone"></i>  Procedimentos
            </button>
            {openMenus['procedimentos'] && (
              <ul className='bnt_ad'>
                <li><a href="/procedimento">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('relatorio')}>
              <i className="fas fa-file-alt icone"></i>   Relatório
            </button>
            {openMenus['relatorio'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('representante')}>
              <i className="fas fa-user-tag icone"></i>Representante
            </button>
            {openMenus['representante'] && (
              <ul className='bnt_ad'> 
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li>
            <button className='bnt_sidebar' onClick={() => toggleMenu('usuario')}>
              <i className="fas fa-user icone"></i> Usuário
            </button>
            {openMenus['usuario'] && (
              <ul className='bnt_ad'>
                <li><a href="/register">Adicionar</a></li>
              </ul>
            )}
          </li>

          <li><a href="/register"><i className="fas fa-user-plus"></i> Register</a></li>
          <li><a href="/contact"><i className="fas fa-envelope"></i>  Contact</a></li>
          <li onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>  Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
