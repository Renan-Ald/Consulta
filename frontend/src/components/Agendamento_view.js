import React, { useState } from 'react';
import '../styles/AgendamentoView.css'; // Importar o CSS

const AgendamentoView = () => {
    // Dados fictícios para agendamentos
    const [agendamentos, setAgendamentos] = useState([
        { id: 1, parceiro: 'Parceiro X', clienteCpf: '123.456.789-00', totalProcedimentos: 3, status: true },
        { id: 2, parceiro: 'Parceiro Y', clienteCpf: '987.654.321-00', totalProcedimentos: 2, status: false },
        { id: 3, parceiro: 'Parceiro Z', clienteCpf: '111.222.333-44', totalProcedimentos: 5, status: true },
    ]);
    
    const [filteredAgendamentos, setFilteredAgendamentos] = useState(agendamentos);
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('parceiro'); // Default: busca por parceiro

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        const filteredData = agendamentos.filter((agendamento) =>
            agendamento[searchCriteria].toString().toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAgendamentos(filteredData);
    };

    const handleSearchCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    return (
        <div className="parceiro-view">
            <h2>Lista de Agendamentos</h2>
            <div className="search-bar">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={`Buscar por ${searchCriteria}`}
                />
                <select onChange={handleSearchCriteriaChange}>
                    <option value="parceiro">Parceiro</option>
                    <option value="clienteCpf">Cliente CPF</option>
                </select>
                <button onClick={handleSearch}>Pesquisar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Parceiro</th>
                        <th>Cliente CPF</th>
                        <th>Total Procedimentos</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAgendamentos.map((agendamento) => (
                        <tr key={agendamento.id}>
                            <td>{agendamento.id}</td>
                            <td>{agendamento.parceiro}</td>
                            <td>{agendamento.clienteCpf}</td>
                            <td>{agendamento.totalProcedimentos}</td>
                            <td>{agendamento.status ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AgendamentoView;
