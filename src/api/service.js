import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://equilibre-app.herokuapp.com/',
    });

    this.api.interceptors.request.use(async config => {
      if (config.url.includes('public')) return config;
      // pegar a token do localStorage
      // chamar serviço /verify-token
      // SE verify-token OK -> seta os headers com a token return config (continua com o request normal)
      // SE verify-token NÃO OK --> tenta bater no refresh-token
      // /refresh-token ---> entrega novas token e refresh_token
      // Se o refresh-token OK --> atualiza o localStorage e seta os headers com a nova token e return config
      // Se o refresh-token NÃO OK --> limpa localStorage e redireciona para o /login

      const tokenInfo = JSON.parse(localStorage.getItem('logged-user-info'));

      if (!tokenInfo) {
        window.location = '/login';

        return;
      }

      const { type, token, refresh_token } = tokenInfo;
      try {
        await axios.get('https://equilibre-app.herokuapp.com/api/private/verify-token', { headers: { Authorization: `${type} ${token}` } });

        config.headers.Authorization = `${type} ${token}`;
        return config;
      } catch (error) {
        const { message } = error.response.data;
        const { status } = error.response;

        if (status === 401 && (message === 'jwt expired' || message === 'Token not found')) {
          try {
            const { data } = await axios.get('https://equilibre-app.herokuapp.com/api/private/refresh-token', { headers: { Authorization: `${type} ${refresh_token}` } })

            localStorage.setItem('logged-user-info', JSON.stringify(data));

            config.headers.Authorization = `${data.type} ${data.token}`;

            return config;
          } catch (error) {
            localStorage.removeItem('logged-user-info');
            localStorage.removeItem('user-info');

            window.location = '/login';

            return;
          }
        }
      }
      return config;
    });
  }

  signUpUser = async values => {

    const { data } = await this.api.post('/api/public/auth/signup', values);
    return data;
  };

  loginUser = async values => {

    const { data } = await this.api.post('/api/public/auth/login', values);
    return data;
  };

  getUser = async (email) => {
    const { data } = await this.api.get(`/api/private/user?email=${email}`);
    return data;
  };

  listAllCategories = async (userId) => {
    try {
      const { data } = await this.api.get(`/api/private/category/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  deleteCategory = async (category) => {
    
    try {
      await this.api.delete('/api/private/category', { data: { _id: category._id } });

    } catch (error) {
      return error.response.data.message;
    }
  

  };

  editCategory = async (category) => {
    const { data } = await this.api.put('/api/private/category', category);
    return data;
  };

  addCategory = async (category) => {
    const { data } = await this.api.post('/api/private/category', category);
    return data;
  };

  addExpense = async (expense) => {
    try {
      Object.keys(expense).forEach(key => {
        if (!expense[key]) delete expense[key];
      });
      const { data } = await this.api.post('/api/private/expense/', expense);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  getExpenses = async (cardId, startDate, endDate) => {
    try {
      const { data } = await this.api.get(`/api/private/expense/${cardId}?startDate=${startDate}&endDate=${endDate}`);
      return data.expenses;
    } catch (error) {
      console.log(error);
    }
  }

  deleteExpense = async id => {
    try {
      await this.api.delete(`/api/private/expense/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  editExpense = async (id, expense) => {
    try {
      Object.keys(expense).forEach(key => {
        if (!expense[key]) delete expense[key];
      });
      await this.api.put(`/api/private/expense/${id}`, expense);
    } catch (error) {
      console.log(error);
    }
  }

  getCards = async (userId) => {
    try {
      const { data } = await this.api.get(`/api/private/card/${userId}`);
      return data.cards;
    } catch (error) {
      console.log(error);
    }
  }

  deleteCard = async (id) => {
    try {
      await this.api.delete(`/api/private/card/${id}`);
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  editCard = async (id, card) => {
    try {
      Object.keys(card).forEach(key => {
        if (!card[key]) delete card[key];
      });
      await this.api.put(`/api/private/card/${id}`, card);
    } catch (error) {
      console.log(error);
    }
  }

  addCard = async (card) => {
    try {
      Object.keys(card).forEach(key => {
        if (!card[key]) delete card[key];
      });
      await this.api.post(`/api/private/card`, card);
    } catch (error) {
      console.log(error);
    }
  }

  getTotalValue = async (userId, startDate, endDate, cardId) => {
    try {
      const { data } = await this.api.get(`/api/private/totalValue?userId=${userId}&startDate=${startDate}&endDate=${endDate}&cardId=${cardId ? cardId : ''}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  getValueByCategory = async (userId, startDate, endDate, cardId) => {
    try {
      const { data } = await this.api.get(`/api/private/valueByCategory?userId=${userId}&startDate=${startDate}&endDate=${endDate}&cardId=${cardId ? cardId : ''}`);
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  getTopTenExpenses = async (userId, startDate, endDate, cardId) => {
    try {
      const { data } = await this.api.get(`/api/private/topTenExpenses?userId=${userId}&startDate=${startDate}&endDate=${endDate}&cardId=${cardId ? cardId : ''}`);
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ApiService();