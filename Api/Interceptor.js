import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://localhost:5000', // URL de nuestra API
  timeout: 5000, // Timeout opcional
});

// Interceptor para las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = 'KEEPITSECRET'; //Bearer Token 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejar el error antes de enviar la petición
    return Promise.reject(error);
  }
);

// Interceptor para las respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log('Datos recibidos de la API:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error en la respuesta:', error.response);
    } else if (error.request) {
      console.error('Error en la petición:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
