
# 📚 Catálogo de Livros - API com MongoDB

Este projeto é uma API RESTful para gerenciamento de livros lidos. Utiliza **Node.js**, **Express** e **MongoDB** como banco de dados. Permite **cadastrar, editar, excluir e listar livros**, com recursos de **filtros**, **ordenação**, **paginação**, **validações**, **autenticação via JWT** e **documentação automática com Swagger**.

---

## 📋 Índice

- [📦 Requisitos](#-requisitos)
- [🚀 Instalação](#-instalação)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔐 Autenticação JWT](#-autenticação-jwt)
- [🔌 Endpoints da API](#-endpoints-da-api)
- [🧪 Testes](#-testes)
- [📃 Documentação Swagger](#-documentação-swagger)
- [💾 Exemplo de livro](#-exemplo-de-livro)
- [🔥 Scripts Disponíveis](#-scripts-disponíveis)
- [🖥️ Demo](#️-demo)
- [🤝 Contribuição](#-contribuição)
- [📝 Licença](#-licença)
- [👤 Autor](#-autor)

---

## 📦 Requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou na nuvem - MongoDB Atlas)
- Ferramenta de testes de API (REST Client, Postman, Thunder Client, Insomnia, etc.)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/catalogo-livros.git
cd catalogo-livros
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o arquivo `.env`

Crie um arquivo `.env` na raiz seguindo o modelo abaixo:

```env
PORT=3000
MONGO_URI=sua_uri_mongodb
DB_NAME=livrosdb
SECRET_KEY=seu_secret_jwt
EXPIRES_IN=24h

# Usuário de teste
SENHA_USUARIO=senha-do-usuario-de-teste
```

---

## 📂 Estrutura do Projeto

```
.
├── api/
│   ├── config/           # Configurações (banco de dados)
│   ├── controllers/      # Regras de negócio (CRUD, autenticação)
│   ├── middleware/       # Middlewares (validação, auth)
│   ├── model/            # Modelos do MongoDB
│   ├── routes/           # Rotas da API
│   ├── public/           # Front-end (HTML, imagens)
│   ├── swagger.json      # Documentação Swagger gerada
│   └── index.js          # Arquivo principal
├── __tests__/            # Testes automatizados (Jest + Supertest)
├── .env-example          # Exemplo de configuração
├── jest.config.js        # Configuração do Jest
├── package.json          # Dependências e scripts
├── vercel.json           # Deploy no Vercel
└── README.md             # Documentação
```

---

## 🔐 Autenticação JWT

Para acessar os endpoints da API é necessário:

- 🔑 Fazer login via `POST /api/usuarios/login`
- Obter o token JWT (enviado na resposta)
- Enviar esse token no header `Authorization` nas requisições protegidas.

Exemplo de header:

```http
Authorization: Bearer seu_token_jwt
```

---

## 🔌 Endpoints da API

### 🔐 Rotas de Usuário

- `POST /api/usuarios/register` ➝ Cria um usuário
- `POST /api/usuarios/login` ➝ Autentica e gera token

### 📚 Rotas de Livros (Protegidas)

- `GET /api/livros` ➝ Lista livros (com filtros, ordenação e paginação)
- `GET /api/livros/:id` ➝ Busca livro por ID
- `POST /api/livros` ➝ Cadastra novo livro
- `PUT /api/livros/:id` ➝ Edita livro
- `DELETE /api/livros/:id` ➝ Remove livro

### 🌐 Documentação Swagger

- `GET /api-docs` ➝ Acessa documentação interativa da API

---

## 🧪 Testes

### ✅ Instalação dos pacotes de testes

```bash
npm install jest supertest -D
```

### ✅ Descrição dos pacotes:

| Pacote       | Descrição                                                               |
| ------------- | ------------------------------------------------------------------------ |
| **Jest**      | Framework de testes em JavaScript para testes unitários e integração.  |
| **SuperTest** | Faz requisições HTTP e testa respostas de APIs Node.js.                 |

### ✅ Organização dos testes:

- Crie a pasta `__tests__` na raiz.
- Crie os arquivos de testes, exemplo: `api.test.js`.

### ✅ Scripts no `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

### ✅ Executar os testes:

```bash
npm run test
```

---

## 📃 Documentação Swagger

### 🚀 Instale os pacotes:

```bash
npm install swagger-ui-express
npm install swagger-autogen -D
```

### 🔗 Acesso à documentação interativa:

```
http://localhost:3000/api-docs
```

---

## 💾 Exemplo de livro

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "paginas": 464,
  "avaliacao": 4.8,
  "dataLeitura": "2024-07-15"
}
```

## ☁️ Deploy no Vercel

Este projeto está configurado para ser **hospedado no Vercel**, incluindo **front-end (HTML/CSS/JS)** e **back-end (API Node.js + MongoDB)** no mesmo repositório.

### 🛠 Estrutura utilizada

- O **back-end** está localizado na pasta `api/`
- O **front-end** está na pasta `public/`
- O arquivo `vercel.json` define o comportamento das rotas

```
├── api/              # API REST com Node.js e Express
├── public/           # Interface Web (index.html + JS)
├── vercel.json       # Arquivo de configuração do Vercel
```

### 🔁 Arquivo `vercel.json` utilizado

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ],
  "functions": {
    "api/index.js": {
      "includeFiles": "api/swagger/swagger_output.json"
    }
  }
}
```

> A diretiva `rewrites` garante que as chamadas feitas para `/api/...` no front-end sejam redirecionadas corretamente para a API.

---

### 🌐 Integração com Front-End

No `index.html` (front-end), o `baseURL` das requisições é configurado dinamicamente para funcionar tanto localmente quanto na Vercel:

```js
const baseURL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/livros"
  : "/api/livros";
```

---

### 🔐 Variáveis de Ambiente no Vercel

No painel da Vercel, adicione em **Settings > Environment Variables**:

| Variável     | Descrição                                   |
|--------------|----------------------------------------------|
| `MONGO_URI`  | URI de conexão com MongoDB Atlas             |
| `DB_NAME`    | Nome do banco de dados (exemplo: `livrosdb`) |

---

## 🔥 Scripts Disponíveis

| Comando        | Descrição                                     |
|----------------|-----------------------------------------------|
| `npm run dev`  | Inicia o servidor em modo desenvolvimento    |
| `npm start`    | Inicia o servidor em modo produção           |
| `npm run test` | Executa os testes automáticos                |

---

## 🖥️ Demo

Você pode acessar o projeto funcionando em:

[https://catalogo-livros-lidos-final.vercel.app/]

---

## 🤝 Contribuição

Contribuições são bem-vindas! 

- Abra uma issue com melhorias, correções ou dúvidas.
- Envie um pull request.

---

## 📝 Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 👤 Autor

### Grupo Wi (World Innovation):

### *Herivelton Henrique Gonçalves*
### *Gabriel Ribeiro Correa*
### *Breno Jose da Silva*
### *Wendel Augusto Lopes Vasco*


