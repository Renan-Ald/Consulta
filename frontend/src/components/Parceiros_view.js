import React, { useState, useEffect } from 'react';
import '../styles/Parceiro_view.css'; // Importar o CSS
import { getParceiro } from '../api'; // Importar a função de API

const ParceiroView = ({ token }) => {
    const [parceiros, setParceiros] = useState([]);
    const [filteredParceiros, setFilteredParceiros] = useState([]);
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('nome'); // Default: busca por nome

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Chame a função getParceiros passando o token
                const data = await getParceiro(token);
                setParceiros(data);
                setFilteredParceiros(data);
            } catch (error) {
                console.error('Erro ao buscar dados de parceiros', error);
            }
        };
        fetchData();
    }, [token]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
 
    const handleSearch = () => {
        const filteredData = parceiros.filter((parceiro) =>
            parceiro[searchCriteria].toString().toLowerCase().includes(search.toLowerCase())
        );
        setFilteredParceiros(filteredData);
    };

    const handleSearchCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    return (
        <div className="parceiro-view">
            <h2>Lista de Parceiros</h2>
            <div className="search-bar">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={`Buscar por ${searchCriteria}`}
                />
                <select onChange={handleSearchCriteriaChange}>
                    <option value="nome">Nome</option>
                    <option value="cpf_cnpj">CPF/CNPJ</option>
                </select>
                <button onClick={handleSearch}>Pesquisar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>Tipo</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredParceiros.map((parceiro) => (
                        <tr key={parceiro.id_parceiro}>
                            <td>{parceiro.nome}</td>
                            <td>xxx.xxx.xxx-xx</td>
                            <td>xxxxx</td>
                            <td>{parceiro.status ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParceiroView;
