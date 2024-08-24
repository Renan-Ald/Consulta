import axios from 'axios';

// Defina a URL base da sua API
const API_URL = 'http://localhost:8000/api/';

// Configuração do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para deslogar o usuário
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login'; // Redireciona para a página de login
};

// Interceptor de resposta para verificar a expiração do token
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Se o status for 401 (não autorizado), o token pode ter expirado
      logoutUser(); // Função para deslogar o usuário
    }
    return Promise.reject(error);
  }
);

// Função para registrar um novo usuário
export const registerUser = async (userData, token) => {
  try {
    const response = await api.post('register/', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response ? error.response.data : error;
  }
};

// Função para fazer login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('login/', { email, password });
    localStorage.setItem('token', response.data.access);
    console.log('token:',response.data )
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error.response ? error.response.data : error;
  }
};

// Função para buscar dados do usuário
export const getUserData = async (userId, token) => {
  try {
    const response = await api.get(`users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error.response ? error.response.data : error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await api.get('users/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a lista de usuários:', error);
    throw error.response ? error.response.data : error;
  }
};  

//procedimentos////////////////////////////////
export const getprocedimentos = async (token) => {
  try {
    const response = await api.get('procedimentos/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a lista de procedimentos:', error);
    throw error.response ? error.response.data : error;
  }
};  

export const postProcedimento = async (token, procedimentoData) => {
  try {
    const response = await api.post('procedimentos/', procedimentoData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o procedimento:', error);
    throw error.response ? error.response.data : error;
  }
};
//fim procedimentos////////////////////////////////
// tuss/////////////////////////////////////////
export const gettuss = async (token) => {
  try {
    const response = await api.get('tuss/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a lista de procedimentos:', error);
    throw error.response ? error.response.data : error;
  }
}; 

//fim tuss////////////////////////////////////////
///especialidade/////////////////////////////////
export const getespecialidade = async (token) => {
  try {
    const response = await api.get('especialidade/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a lista de procedimentos:', error);
    throw error.response ? error.response.data : error;
  }
}; 

//////Pessoa Fisica////////
export const postPessoaFisica = async (token, PessoafisicaData) => {
  try {
    const response = await api.post('pessoa_fisica/', PessoafisicaData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o Pessoa fisica:', error);
    throw error.response ? error.response.data : error;
  }
};
export const getPessoaFisica = async (token) => {
  try {
    const response = await api.get('pessoa_fisica/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Pessoa fisica:', error);
    throw error.response ? error.response.data : error;
  }
}; 
///// fim/////////////
//////Endereco////////
export const postEndereco = async (token, Endereco) => {
  try {
    const response = await api.post('endereco/', Endereco, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o Pessoa fisica:', error);
    throw error.response ? error.response.data : error;
  }
};
///// fim/////////////
export const postParceiro = async (token, Parceirodata) => {
  try {
    const response = await api.post('parceiros/', Parceirodata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o Pessoa fisica:', error);
    throw error.response ? error.response.data : error;
  }
};
///// fim/////////////
export const getParceiro = async (token) => {
  try {
    const response = await api.get('parceiros/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a lista de parceiros:', error);
    throw error.response ? error.response.data : error;
  }
}; 
///// fim/////////////
export const postAgendamento = async (token, Agendamentodata) => {
  try {
    const response = await api.post('parceiros/', Agendamentodata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o Agendamento:', error);
    throw error.response ? error.response.data : error;
  }
};
///// fim/////////////

export default api;