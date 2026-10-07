import axios from 'axios';

// Instância do axios com a URL base da Fake Store API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
});

// Converte erros do axios em mensagens amigáveis para o usuário
export function getErrorMessage(error, fallback = 'Ocorreu um erro inesperado.') {
  if (error?.response) {
    if (error.response.status === 401) return 'Usuário ou senha inválidos.';
    if (error.response.status === 404) return 'Recurso não encontrado.';
    return `Erro no servidor (código ${error.response.status}). Tente novamente.`;
  }
  if (error?.code === 'ECONNABORTED') {
    return 'A requisição demorou demais. Verifique sua conexão e tente novamente.';
  }
  if (error?.request) {
    return 'Falha de rede. Verifique sua conexão com a internet.';
  }
  return error?.message || fallback;
}

export const getUsers = () => api.get('/users');
export const login = (username, password) => api.post('/auth/login', { username, password });
export const getProducts = () => api.get('/products');
export const getCategories = () => api.get('/products/categories');
export const getProductsByCategory = (category) =>
  api.get(`/products/category/${encodeURIComponent(category)}`);
export const getProductById = (id) => api.get(`/products/${id}`);

export default api;
