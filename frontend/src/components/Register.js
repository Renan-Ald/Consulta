import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrigido a importação
import { registerUser, getUserData } from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    nome_completo: '',
    cep: '',
    telefone: '',
    endereco: '',
    cpf: '',
    nivel_acesso: 'cliente',
  });

  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        if (userId) {
          getUserData(userId, token)
            .then(data => {
              setIsAdmin(data.nivel_acesso === 'administrador');
            })
            .catch(err => {
              console.error('Erro ao buscar dados do usuário:', err);
              setError('Não foi possível carregar os dados do usuário.');
            });
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        setIsAdmin(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtenha o token diretamente
      const response = await registerUser(userData, token);
      console.log('Register Response:', response);
      alert(response.message || 'Usuário registrado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setError(err.message || 'Erro ao registrar usuário');
    }
  };

  return (
    
    <div className="container mt-5">
        <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
      />
      <h2 className="text-center mb-4">Registrar Novo Usuário</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nome_completo" className="form-label">Nome Completo:</label>
              <input
                type="text"
                name="nome_completo"
                className="form-control"
                id="nome_completo"
                value={userData.nome_completo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cep" className="form-label">CEP:</label>
              <input
                type="text"
                name="cep"
                className="form-control"
                id="cep"
                value={userData.cep}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone:</label>
              <input
                type="text"
                name="telefone"
                className="form-control"
                id="telefone"
                value={userData.telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço:</label>
              <input
                type="text"
                name="endereco"
                className="form-control"
                id="endereco"
                value={userData.endereco}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF:</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                id="cpf"
                value={userData.cpf}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {isAdmin && (
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nivel_acesso" className="form-label">Nível de Acesso:</label>
                <select
                  name="nivel_acesso"
                  className="form-select"
                  id="nivel_acesso"
                  value={userData.nivel_acesso}
                  onChange={handleChange}
                >
                  <option value="cliente">Cliente</option>
                  <option value="funcionario">Funcionário</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
