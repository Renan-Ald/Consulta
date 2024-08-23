import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUserData } from '../api';
import { Chart, registerables } from 'chart.js';
import '../styles/Dashboard.css';

Chart.register(...registerables);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [barChartInstance, setBarChartInstance] = useState(null);
  const [pieChartInstance, setPieChartInstance] = useState(null);
  const [lineChartInstance, setLineChartInstance] = useState(null); // Novo estado para o gráfico de linha

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        getUserData(userId, token)
          .then(userData => {
            setUserData(userData);
            if (userData.nivel_acesso !== 'administrador' && userData.nivel_acesso !== 'funcionario') {
              handleLogout();
            }
          })
          .catch(err => {
            console.error('Erro ao buscar dados do usuário:', err);
            handleLogout();
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        handleLogout();
      }
    } else {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (!loading && userData) {
      drawBarChart();
      drawPieChart();
      drawLineChart(); // Chame a função de gráfico de linha aqui
    }
  }, [loading, userData]);

  const drawBarChart = () => {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // Se já existir uma instância do gráfico, destrua-a
    if (barChartInstance) {
      barChartInstance.destroy();
    }

    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
    const customerData = [30, 20, 40, 50, 60, 80];
    const procedureData = [20, 30, 25, 40, 50, 70];

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cria uma nova instância do gráfico
    const newBarChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Clientes',
            data: customerData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Azul
          },
          {
            label: 'Procedimentos',
            data: procedureData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Vermelho
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setBarChartInstance(newBarChartInstance);
  };

  const drawPieChart = () => {
    const canvas = document.getElementById('myPieChart');
    const ctx = canvas.getContext('2d');

    // Se já existir uma instância do gráfico, destrua-a
    if (pieChartInstance) {
      pieChartInstance.destroy();
    }

    const pieData = {
      labels: ['Clientes', 'Procedimentos', 'Outros'],
      datasets: [{
        data: [300, 150, 100],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Azul
          'rgba(255, 99, 132, 0.6)', // Vermelho
          'rgba(75, 192, 192, 0.6)'  // Verde
        ],
      }]
    };

    const newPieChartInstance = new Chart(ctx, {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribuição de Clientes e Procedimentos'
          }
        }
      }
    });

    setPieChartInstance(newPieChartInstance);
  };

  // Função para desenhar o gráfico de linha
  const drawLineChart = () => {
    const canvas = document.getElementById('myLineChart');
    const ctx = canvas.getContext('2d');

    // Se já existir uma instância do gráfico, destrua-a
    if (lineChartInstance) {
      lineChartInstance.destroy();
    }

    const lineData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [
        {
          label: 'Crescimento Mensal',
          data: [15, 25, 35, 45, 55, 75],
          borderColor: 'rgba(75, 192, 192, 1)', // Verde
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Verde claro
          fill: true,
        },
      ],
    };

    const newLineChartInstance = new Chart(ctx, {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setLineChartInstance(newLineChartInstance);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData && (userData.nivel_acesso === 'cliente' || userData.nivel_acesso === 'nao_autorizado')) {
    return (
      <div>
        <h1>Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo, {userData ? userData.nome_completo : 'Usuário'}</h1>
      <div className="chart-container">
        <div className="chart">
          <canvas id="myChart"></canvas>
        </div>
        <div className="chart">
          <canvas id="myPieChart"></canvas>
        </div>
        <div className="line-chart-container"> {/* Esta div para o gráfico de linha */}
          <canvas id="myLineChart"></canvas>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
