import React, { useState } from 'react';
import '../styles/Agendamento.css';

const Agendamento = () => {
  const [procedimentos, setProcedimentos] = useState([
    { id: 1, nome: 'Procedimento A', valor: 100 },
    { id: 2, nome: 'Procedimento B', valor: 150 },
    { id: 3, nome: 'Procedimento C', valor: 200 },
  ]);

  const [parceiros, setParceiros] = useState([
    { id: 1, nome: 'Parceiro X', valor: 100 },
    { id: 2, nome: 'Parceiro Y', valor: 150 },
    { id: 3, nome: 'Parceiro Z', valor: 200 },
  ]);

  const [resumo, setResumo] = useState([]);
  const [valoresPagamento, setValoresPagamento] = useState({
    especie: 0,
    cartao: 0,
    troco: 0,
  });

  // Função para formatar valores como moeda
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAddProcedimento = () => {
    const procedimentoSelect = document.getElementById('procedimento');
    const parceiroSelect = document.getElementById('parceiro');
    const quantidadeInput = document.getElementById('quantidade');

    const procedimento = procedimentos.find(p => p.id == procedimentoSelect.value);
    const parceiro = parceiros.find(p => p.id == parceiroSelect.value);
    const quantidade = parseInt(quantidadeInput.value);

    if (procedimento && parceiro && quantidade > 0) {
      const novoItem = {
        procedimento: procedimento.nome,
        parceiro: parceiro.nome,
        quantidade: quantidade,
        valorUnitario: parceiro.valor,
        desconto: 0,  // Podemos implementar lógica de desconto posteriormente
      };

      setResumo([...resumo, novoItem]);
      procedimentoSelect.value = "";
      parceiroSelect.value = "";
      quantidadeInput.value = 1;
    }
  };

  const handleValorChange = (e) => {
    const { id, value } = e.target;
    const novoValor = parseFloat(value) || 0;
    const novoValoresPagamento = { ...valoresPagamento, [id]: novoValor };

    // Calcular o troco conforme os valores são digitados
    const total = resumo.reduce((acc, item) => acc + (item.valorUnitario * item.quantidade), 0);
    novoValoresPagamento.troco = novoValoresPagamento.especie + novoValoresPagamento.cartao - total;

    setValoresPagamento(novoValoresPagamento);
  };

  const handleSave = () => {
    // Aqui você pode adicionar lógica para salvar os dados no backend, se necessário
    alert('Agendamento salvo com sucesso!');
  };

  return (
    <div className="agendamento-container">
      <h2><i className="fa-solid fa-file-circle-plus"></i>Agendamentos</h2>

      <div className="section">
        <h3>Cliente</h3>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" value="123.456.789-00" disabled />
          </div>
          <div className="input-item">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" value="João da Silva" disabled />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Procedimento</h3>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="procedimento">Nome do procedimento</label>
            <select id="procedimento">
              <option value="">Selecione...</option>
              {procedimentos.map(proc => (
                <option key={proc.id} value={proc.id}>{proc.nome}</option>
              ))}
            </select>
          </div>
          <div className="input-item">
            <label htmlFor="quantidade">Qnt.</label>
            <input type="number" id="quantidade" defaultValue="1" />
          </div>
        </div>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="parceiro">Parceiro / Valor</label>
            <select id="parceiro">
              <option value="">Selecione...</option>
              {parceiros.map(parc => (
                <option key={parc.id} value={parc.id}>{parc.nome} - {formatCurrency(parc.valor)}</option>
              ))}
            </select>
          </div>
          <button className="add-btn" onClick={handleAddProcedimento}>+</button>
        </div>
      </div>

      <div className="section resumo-agendamento">
        <h3>Resumo do agendamento</h3>
        <table>
          <thead>
            <tr>
              <th>Procedimento</th>
              <th>Parceiro</th>
              <th>Qnt.</th>
              <th>Valor Unit.</th>
              <th>Desconto</th>
            </tr>
          </thead>
          <tbody>
            {resumo.map((item, index) => (
              <tr key={index}>
                <td>{item.procedimento}</td>
                <td>{item.parceiro}</td>
                <td>{item.quantidade}</td>
                <td>{formatCurrency(item.valorUnitario)}</td>
                <td>{item.desconto}%</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">TOTAL {formatCurrency(resumo.reduce((acc, item) => acc + (item.valorUnitario * item.quantidade), 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Representante</h3>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="representante">Nome do representante</label>
            <select id="representante">
              <option value="">Selecione...</option>
              <option value="1">Teste Representante</option>
            </select>
          </div>
          <div className="input-item">
            <label htmlFor="valorRepresentante">Valor representante</label>
            <input type="text" id="valorRepresentante" onChange={handleValorChange} />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Dados do pagamento</h3>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="especie">Valor em espécie</label>
            <input type="text" id="especie" onChange={handleValorChange} />
          </div>
          <div className="input-item">
            <label htmlFor="cartao">Valor cartão</label>
            <input type="text" id="cartao" onChange={handleValorChange} />
          </div>
        </div>
        <div className="input-group">
          <div className="input-item">
            <label htmlFor="troco">Troco</label>
            <input type="text" id="troco" value={formatCurrency(valoresPagamento.troco)} disabled />
          </div>
        </div>
        <div className="input-group">
          <div className="input-item">
            <label>
              <input type="radio" name="pagamento" value="credito" />
              Crédito
            </label>
            <label>
              <input type="radio" name="pagamento" value="debito" defaultChecked />
              Débito
            </label>
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>Salvar</button>
    </div>
  );
}

export default Agendamento;
