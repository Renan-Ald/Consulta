import React, { useState } from 'react';
import { postParceiro, postEndereco, postPessoaFisica } from '../api';
import '../styles/Parceiros.css';

const Parceiros = ({ token }) => {
    const [tipoPessoa, setTipoPessoa] = useState('nenhum'); // Inicializa como 'nenhum'
    const [formData, setFormData] = useState({
        parceiro: {
            nome: '',
            banco: '',
            agencia: '',
            conta: '',
            telefone: '',
            horario_funcionamento: '',
            ciclo_pagamento: '',
            data_fechamento_ciclo: '',
            status: true,
            created_by: 1,
            id_endereco: null,
            id_pessoa: null
        },
        pessoaFisica: {
            nome: '',
            nome_social: '',
            sexo: '',
            data_nascimento: '',
            cpf: '',
            rg: '',
            telefone: '',
            telefone2: '',
            email: '',
            pai: '',
            mae: '',
            responsavel: ''
        },
        endereco: {
            nome: '',
            logradouro: '',
            bairro: '',
            numero: '',
            complemento: '',
            cep: '',
            localizacao: '',
            lat: -23.55052,
            lng: -46.633308
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [field]: value
            }
        });
    };

    const handleTipoPessoaChange = (e) => {
        setTipoPessoa(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const enderecoData = { ...formData.endereco };

            const enderecoResponse = await postEndereco(token, enderecoData);
            const enderecoId = enderecoResponse.id_endereco;

            let pessoaId = null;
            if (tipoPessoa === 'fisica') {
                const pessoaFisicaData = { ...formData.pessoaFisica };
                const pessoaResponse = await postPessoaFisica(token, pessoaFisicaData);
                pessoaId = pessoaResponse.id_pessoa_fisica;
            }

            const parceiroData = {
                ...formData.parceiro,
                id_endereco: enderecoId,
                id_pessoa: pessoaId
            };
            await postParceiro(token, parceiroData);
            alert('Parceiro criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar parceiro:', error);
            alert('Erro ao criar parceiro. Verifique os dados e tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="parceiro-form">
            <h1 className='titulo'><i class=" icon fa-solid fa-user-doctor"></i>Parceiros</h1>

            <h2></h2>
            <div className="form-group full-width">
                <div className="form-row">
                    <input type="text" name="parceiro.nome" placeholder="Nome do Parceiro" onChange={handleChange} required />
                    <select name="tipoPessoa" onChange={handleTipoPessoaChange} required className="form-control">
                        <option value="nenhum">Nenhum</option>
                        <option value="fisica">Pessoa Física</option>
                        <option value="juridica">Pessoa Jurídica</option>
                    </select>
                </div>
            </div>
            <h4>Dados Bancários</h4>
            <div className="form-row">
                <div className="form-group third-width">
                    <input type="text" name="parceiro.banco" placeholder="Banco" onChange={handleChange} />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="parceiro.agencia" placeholder="Agência" onChange={handleChange} />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="parceiro.conta" placeholder="Conta" onChange={handleChange} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group third-width">
                    <input type="text" name="parceiro.telefone" placeholder="Telefone" onChange={handleChange} />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="parceiro.horario_funcionamento" placeholder="Horário de Funcionamento" onChange={handleChange} />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="parceiro.ciclo_pagamento" placeholder="Ciclo de Pagamento" onChange={handleChange} />
                </div>
            </div>
            <div className="form-group full-width">
                <input type="date" name="parceiro.data_fechamento_ciclo" onChange={handleChange} />
            </div>

            {/* Renderiza o formulário de Pessoa Física se tipoPessoa for 'fisica' */}
            {tipoPessoa === 'fisica' && (
                <>
                    <h2>Dados da Pessoa Física</h2>
                    <div className="form-group full-width">
                        <input type="text" name="pessoaFisica.nome" placeholder="Nome" onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group large-width">
                            <input type="text" name="pessoaFisica.nome_social" placeholder="Nome Social" onChange={handleChange} />
                        </div>
                        <div className="form-group small-width">
                            <select name="pessoaFisica.sexo" onChange={handleChange} required className="form-control">
                                <option value="">Sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group third-width">
                            <input type="text" name="pessoaFisica.cpf" placeholder="CPF" onChange={handleChange} required />
                        </div>
                        <div className="form-group third-width">
                            <input type="text" name="pessoaFisica.rg" placeholder="RG" onChange={handleChange} required />
                        </div>
                        <div className="form-group third-width">
                            <input type="date" name="pessoaFisica.data_nascimento" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group third-width">
                            <input type="email" name="pessoaFisica.email" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div className="form-group third-width">
                            <input type="text" name="pessoaFisica.telefone" placeholder="Telefone" onChange={handleChange} required />
                        </div>
                        <div className="form-group third-width">
                            <input type="text" name="pessoaFisica.telefone2" placeholder="Telefone 2" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group half-width">
                            <input type="text" name="pessoaFisica.pai" placeholder="Nome do Pai" onChange={handleChange} />
                        </div>
                        <div className="form-group half-width">
                            <input type="text" name="pessoaFisica.mae" placeholder="Nome da Mãe" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <input type="text" name="pessoaFisica.responsavel" placeholder="Nome do Responsável" onChange={handleChange} />
                    </div>
                </>
            )}

            <h2>Endereço</h2>
            <div className="form-group full-width">
                <input type="text" name="endereco.nome" placeholder="Nome do Endereço" onChange={handleChange} required />
            </div>
            <div className="form-row">
                <div className="form-group half-width">
                    <input type="text" name="endereco.logradouro" placeholder="Logradouro" onChange={handleChange} required />
                </div>
                <div className="form-group half-width">
                    <input type="text" name="endereco.bairro" placeholder="Bairro" onChange={handleChange} required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group third-width">
                    <input type="text" name="endereco.numero" placeholder="Número" onChange={handleChange} required />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="endereco.complemento" placeholder="Complemento" onChange={handleChange} />
                </div>
                <div className="form-group third-width">
                    <input type="text" name="endereco.cep" placeholder="CEP" onChange={handleChange} required />
                </div>
            </div>
            <div className="form-group full-width">
                <input type="text" name="endereco.localizacao" placeholder="Localização" onChange={handleChange} />
            </div>

            <button className="submit-button" type="submit">Salvar</button>
        </form>
    );
};

export default Parceiros;
