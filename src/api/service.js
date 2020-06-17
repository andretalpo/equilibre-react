import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000',
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
        await axios.get('http://localhost:5000/api/private/verify-token', { headers: { Authorization: `${type} ${token}` } });

        config.headers.Authorization = `${type} ${token}`;
        return config;
      } catch (error) {
        const { message } = error.response.data;
        const { status } = error.response;

        if (status === 401 && (message === 'jwt expired' || message === 'Token not found')) {
          try {
            const { data } = await axios.get('http://localhost:5000/api/private/refresh-token', { headers: { Authorization: `${type} ${refresh_token}` } })

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
    console.log(email);
    const { data } = await this.api.get(`/api/private/user?email=${email}`);
    console.log(data);
    return data.user || {};
  };

  test = async () => {
    const { data } = await this.api.get('/api/private/test',);

    return data;
  };
}

export default new ApiService();