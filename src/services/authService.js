import { getUsers, login } from './api';

// Erro de regra de negócio da autenticação (não é erro de rede/HTTP).
// A mensagem já é amigável e é exibida diretamente pela tela.
export class AuthError extends Error {}

// Regra de autenticação do app, isolada da interface:
// 1) consulta os usuários existentes na API
// 2) confere usuário e senha
// 3) autentica no endpoint de login e devolve o token
export async function authenticate(username, password) {
  const users = await getUsers();
  const user = users.find((u) => u.username === username.trim());

  if (!user || user.password !== password) {
    throw new AuthError('Usuário ou senha inválidos.');
  }

  const { token } = (await login(user.username, user.password)) ?? {};

  if (!token) {
    throw new AuthError('Não foi possível autenticar. Tente novamente.');
  }

  return token;
}
