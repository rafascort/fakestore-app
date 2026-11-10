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

// As funções abaixo devolvem apenas o corpo da resposta (response.data),
// assim as telas e serviços não dependem do formato de resposta do axios.
export const getUsers = () => api.get('/users').then((res) => res.data);
export const login = (username, password) =>
  api.post('/auth/login', { username, password }).then((res) => res.data);
export const getProducts = () => api.get('/products').then((res) => res.data);
export const getCategories = () => api.get('/products/categories').then((res) => res.data);
export const getProductsByCategory = (category) =>
  api.get(`/products/category/${encodeURIComponent(category)}`).then((res) => res.data);

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  // A API pode responder 200 com corpo vazio para ids inexistentes
  if (!data) throw new Error('Produto não encontrado.');
  return data;
}

export default api;
