import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api'; // Importe a função correta de `api.js`
import '../styles/Cliente.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage
        const users = await getAllUsers(token);
        setClientes(users);
      } catch (error) {
        console.error('Erro ao buscar os clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  // Função para filtrar os clientes com base no termo de busca
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clientes-container">
      <h1>Lista de Clientes</h1>
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome_completo}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
