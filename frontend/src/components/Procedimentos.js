import React, { useState, useEffect } from 'react';
import { postProcedimento, gettuss, getespecialidade } from '../api'; // Importa as funções necessárias
import Select from 'react-select'; // Importa a biblioteca react-select
import '../styles/ProcedimentoForm.css';

const ProcedimentoForm = ({ token }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    codigo_tuss: '',
    codigo_especialidade: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [tussOptions, setTussOptions] = useState([]);
  const [especialidadeOptions, setEspecialidadeOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tussData = await gettuss(token);
        const especialidadeData = await getespecialidade(token);
        
        setTussOptions(tussData.map(item => ({
          value: item.codigo_tuss,
          label: item.nome,
        })));

        setEspecialidadeOptions(especialidadeData.map(item => ({
          value: item.codigo_especialidade,
          label: item.nome,
        })));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value; // Pega o valor correto
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        descricao: 'None', // Define descricao como null antes de enviar
      };
      console.log("data", dataToSubmit); // Para verificação
      const response = await postProcedimento(token, dataToSubmit);
      setMensagem('Procedimento cadastrado com sucesso!');
      setFormData({
        nome: '',
        tipo: '',
        codigo_tuss: '',
        codigo_especialidade: '',
      });
    } catch (error) {
      setMensagem('Erro ao cadastrar o procedimento. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <form className="procedimento-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2><i className="fas fa-notes-medical"></i> Procedimentos</h2>
        <hr />
      </div>

      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={(e) => handleChange(e, 'nome')}
          placeholder="Digite o nome do procedimento"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label>Tipo:</label>
          <select name="tipo" value={formData.tipo} onChange={(e) => handleChange(e, 'tipo')} required>
            <option value="" disabled>Selecione o tipo</option>
            <option value="Consulta">Consulta</option>
            <option value="Procedimento">Procedimento</option>
            <option value="Exame">Exame</option>
          </select>
        </div>

        <div className="form-group half-width">
          <label>Código Especialidade:</label>
          <Select
            options={especialidadeOptions}
            onChange={(selectedOption) => handleChange(selectedOption, 'codigo_especialidade')}
            placeholder="Selecione a especialidade"
            isClearable
          />
        </div>
      </div>

      <div className="form-group">
        <label>Código TUSS:</label>
        <Select
          options={tussOptions}
          onChange={(selectedOption) => handleChange(selectedOption, 'codigo_tuss')}
          placeholder="Selecione o código TUSS"
          isClearable
        />
      </div>

      <button className="submit-button" type="submit">Cadastrar Procedimento</button>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </form>
  );
};

export default ProcedimentoForm;
