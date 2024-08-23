import React, { useState } from 'react';
import { loginUser } from '../api';
import '../styles/Login.css'; // Certifique-se de que o caminho está correto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password); // Passando email e password diretamente
      localStorage.setItem('token', response.access); // Salva o token no localStorage
      console.log('Token salvo:', localStorage.getItem('token')); // Verifica se o token está sendo salvo
    
      // Pausa a execução para inspecionar o estado
      window.location.href = '/'; // Redireciona para o dashboard após o login bem-sucedido
    } catch (error) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div id="app">
        <h4 className='header_h4'>Bem vindo!</h4>
        <div className="app-header">Login</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <button type="submit" className="app-button">Entrar</button>
          {error && <p>{error}</p>}
        </form>
        <div className="app-register">
          Esqueceu sua senha? <a href="/#">aqui</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
