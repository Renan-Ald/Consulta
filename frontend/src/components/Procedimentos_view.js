import React, { useState, useEffect } from 'react';
import { getprocedimentos, getespecialidade } from '../api'; // Importa a função de API
import '../styles/ProcedimentosTable.css'; // Estilo para a tabela

const ProcedimentosTable = ({ token }) => {
  const [procedimentos, setProcedimentos] = useState([]);
  const [filteredProcedimentos, setFilteredProcedimentos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filter, setFilter] = useState({
    nome: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtém procedimentos e especialidades
        const procedimentosData = await getprocedimentos(token);
        const especialidadesData = await getespecialidade(token);

        // Armazena procedimentos e especialidades no estado
        setProcedimentos(procedimentosData);
        setEspecialidades(especialidadesData);
        setFilteredProcedimentos(procedimentosData); // Inicialmente, todos os dados são exibidos
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [token]);

  // Filtra procedimentos com base no filtro
  useEffect(() => {
    const filteredData = procedimentos.filter(procedimento => {
      return (
        procedimento.nome.toLowerCase().includes(filter.nome.toLowerCase())
      );
    });
    setFilteredProcedimentos(filteredData);
  }, [filter, procedimentos]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Função para obter o nome da especialidade a partir do código
  const getEspecialidadeNome = (codigo) => {
    const especialidade = especialidades.find(especialidade => especialidade.codigo_especialidade === codigo);
    return especialidade ? especialidade.nome : 'Desconhecido';
  };

  return (
    <div className="procedimentos-table-container">
      <div className="form-header">
        <h2><i className="fas fa-notes-medical"></i> Procedimentos</h2>
        <hr />
      </div>
      <div className="filters">
        <div className="search-container">
          <input
            type="text"
            name="nome"
            placeholder="Buscar por Nome"
            value={filter.nome}
            onChange={handleFilterChange}
          />
          <i className="fas fa-search search-icon"></i> {/* Ícone de busca */}
        </div>
      </div>
      <table className="procedimentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Código TUSS</th>
            <th>Especialidade</th>
          </tr>
        </thead>
        <tbody>
          {filteredProcedimentos.map((procedimento) => (
            <tr key={procedimento.id_procedimento}>
              <td>{procedimento.nome}</td>
              <td>{procedimento.tipo}</td>
              <td>{procedimento.codigo_tuss}</td>
              <td>{getEspecialidadeNome(procedimento.codigo_especialidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcedimentosTable;
