# Fake Store App

Aplicativo mobile em **React Native + Expo (JavaScript)** que consome a [Fake Store API](https://fakestoreapi.com).

Funcionalidades:

- Login com usuários existentes da Fake Store API (consulta `GET /users` e autentica em `POST /auth/login`)
- Listagem de produtos (`GET /products`) em FlatList com imagem, nome e preço formatado (ex.: R$ 199,90)
- Filtro por categoria (`GET /products/category/{categoria}`) com opção de limpar o filtro
- Detalhes do produto (`GET /products/{id}`): imagem, nome, categoria, descrição e preço
- Header personalizado na Home: **Sair** (logout) à esquerda, título **Produtos** no centro e **Info** à direita
- Tela de Informações do Grupo
- ActivityIndicator em todos os carregamentos e tratamento de erros (login inválido, falha de rede, etc.)

Tecnologias: Expo, React Native, React Navigation (Native Stack), axios, `useState` e `useEffect`.

## Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org) (versão LTS) e o app **Expo Go** instalado no celular (Android ou iOS).

```bash
# 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd fakestore-app

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor do Expo
npx expo start
```

Depois, escaneie o QR Code exibido no terminal com o app **Expo Go** (Android) ou com a câmera (iOS).
Também é possível pressionar `a` para abrir em um emulador Android ou `w` para abrir no navegador.

> Se o celular não estiver na mesma rede do computador, use `npx expo start --tunnel`.

## Como verificar os usuários disponíveis para login

Os usuários válidos são os cadastrados na própria Fake Store API. Para listá-los, acesse no navegador (ou via Postman/Insomnia):

```
GET https://fakestoreapi.com/users
```

Use os campos `username` e `password` de qualquer usuário retornado. Exemplos:

| Username   | Password   |
|------------|------------|
| `johnd`    | `m38rmF$`  |
| `mor_2314` | `83r5^_`   |
| `kevinryan`| `kev02937@`|

> Os dados são mantidos pela Fake Store API e podem mudar — em caso de dúvida, confira sempre o endpoint `/users`.

## Estrutura do projeto

```
App.js                          # Configuração da navegação (Stack Navigator)
src/
  services/api.js               # Instância do axios e chamadas à API
  screens/
    LoginScreen.js              # Tela de login
    HomeScreen.js               # Listagem + filtro por categoria
    ProductDetailsScreen.js     # Detalhes do produto
    GroupInfoScreen.js          # Informações do grupo
  components/ErrorMessage.js    # Componente de erro com "tentar novamente"
  constants/grupo.js            # Nomes e RAs dos integrantes
  utils/format.js               # Formatação de preço e categorias
  theme.js                      # Cores do app
```

## Integrantes do grupo

| Nome completo             | RA      |
|---------------------------|---------|
| Rafael Scortegagna Pedra  | 1136090 |
