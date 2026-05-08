# 📚 Catálogo de Livros – Backend (PI)

API RESTful desenvolvida para o **Projeto Integrador (PI)** da FATEC, responsável pelo gerenciamento de livros lidos, autenticação de usuários e aplicação prática de conceitos modernos de:

- **Desenvolvimento Backend**
- **Integração Contínua (CI)**
- **Entrega Contínua (CD)**
- **DevOps**
- **Observabilidade**
- **Qualidade e Segurança de Código**

---

# 🚀 Tecnologias Utilizadas

## Backend

- Node.js
- Express
- MongoDB Atlas
- JWT Authentication
- Express Validator
- Swagger

## Testes

- Jest
- Supertest

## DevOps / CI-CD

- GitHub Actions
- GitFlow
- Semantic Release
- Docker
- Docker Compose
- Docker Hub
- Render

## Observabilidade / Segurança

- Better Stack
- SonarCloud

---

# 📂 Estrutura do Projeto

```bash
.
├── .github/
│   └── workflows/             # Pipelines CI/CD
├── __tests__/                # Testes automatizados
├── api/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── swagger.json
│   └── index.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .env
```

---

# 🔐 Funcionalidades

## Usuários

- Cadastro
- Login
- Geração de token JWT

## Livros

- Cadastro
- Listagem
- Busca por ID
- Edição
- Exclusão
- Paginação
- Ordenação
- Filtros

## Segurança

Rotas protegidas com:

```http
Authorization: Bearer TOKEN
```

---

# 🌐 Ambientes Publicados

## 🧪 Homologação (HML)

URL:

```bash
https://catalogo-livros-pi-backend-hml-docker.onrender.com
```

Origem:

```bash
develop
```

Tags Docker:

```bash
hml
develop
```

---

## 🚀 Produção (PROD)

URL:

```bash
https://catalogo-livros-pi-backend-prod-docker.onrender.com
```

Origem:

```bash
main
```

Tags Docker:

```bash
latest
vX.X.X
```

---

# ☁️ Banco de Dados

MongoDB Atlas com ambientes separados:

## Homologação

```bash
livrosdb_hml
```

## Produção

```bash
livrosdb
```

---

# 🌳 GitFlow

Estratégia utilizada:

```bash
main
develop
feature/*
```

Fluxo:

```bash
feature → develop → main
```

Todo merge realizado através de:

- Pull Requests
- Code Review
- Pipelines automatizadas

---

# 📝 Padronização de Commits

Este projeto utiliza **Conventional Commits** para manter o histórico organizado e permitir o versionamento automático com **Semantic Release**.

## Estrutura

```bash
tipo(escopo): descrição
```

Exemplo:

```bash
feat(auth): adiciona autenticação JWT
```

---

## Tipos Utilizados

| Tipo | Descrição | Gera versão? |
|------|-----------|--------------|
| `feat` | Nova funcionalidade | ✅ Minor |
| `fix` | Correção de bugs | ✅ Patch |
| `feat!` | Mudança incompatível | ✅ Major |
| `docs` | Documentação | ❌ |
| `style` | Formatação | ❌ |
| `refactor` | Refatoração sem alterar regra | ❌ |
| `test` | Testes | ❌ |
| `chore` | Configurações, dependências, CI/CD | ❌ |
| `ci` | Alterações de pipeline | ❌ |
| `build` | Docker, dependências, build | ❌ |

---

## Exemplos Utilizados no Projeto

### Backend

```bash
feat(auth): adiciona autenticação JWT
```

```bash
fix(livros): corrige filtro por data de leitura
```

```bash
feat(api): adiciona paginação de livros
```

---

### CI/CD

```bash
feat(ci): integra docker hub no pipeline
```

```bash
feat(cd): adiciona deploy automático do render
```

```bash
chore(ci): reexecuta análise do sonar após ajuste do quality gate
```

---

### Observabilidade

```bash
feat(observability): integra better stack no backend
```

---

## Versionamento Automático

O Semantic Release interpreta os commits automaticamente:

```bash
feat → 1.0.0 → 1.1.0
fix → 1.1.0 → 1.1.1
feat! → 1.1.1 → 2.0.0
```

---

## Fluxo Utilizado no Projeto

```bash
feature/* → develop → main
```

Com:

- Pull Requests obrigatórios
- GitHub Actions
- SonarCloud
- Docker Build
- Deploy automático

---

# 🧪 Testes Automatizados

Frameworks utilizados:

- Jest
- Supertest

Executar:

```bash
npm test
```

Cobertura atual:

- Login
- CRUD de livros
- Autenticação JWT
- Validações

---

# 📖 Swagger

Documentação interativa:

## Local

```bash
http://localhost:3000/api-docs
```

## Produção

```bash
https://catalogo-livros-pi-backend-prod-docker.onrender.com/api-docs
```

---

# ⚙️ Pipeline CI/CD

Pipeline implementada com **GitHub Actions**.

Arquivo:

```bash
.github/workflows/ci.yml
```

---

## A pipeline executa automaticamente:

### Em qualquer push:

✅ Checkout do código  
✅ Instalação de dependências  
✅ Inicialização da API  
✅ Espera disponibilidade da aplicação  
✅ Execução dos testes  

---

## Na branch develop:

✅ Build Docker  
✅ Push Docker Hub (HML)  
✅ Trigger automático Render HML  

---

## Na branch main:

✅ Semantic Release  
✅ Versionamento automático  
✅ Build Docker PROD  
✅ Push Docker Hub PROD  
✅ Trigger automático Render PROD  

---

# 🐳 Docker

## Build local

```bash
docker build -t catalogo-livros-backend .
```

## Executar localmente

```bash
docker compose up
```

---

# 🐳 Docker Hub

Repositório:

```bash
https://hub.docker.com/r/goncahri/catalogo-livros-backend
```

Tags publicadas automaticamente:

- `hml`
- `develop`
- `latest`
- `versionadas`

Exemplo:

```bash
1.0.0
1.1.0
```

---

# 🔖 Versionamento Automático

Utilizando:

```bash
semantic-release
```

Commits convencionais:

```bash
feat:
fix:
docs:
chore:
```

Exemplo:

```bash
feat(ci): integra docker hub
```

---

# 📊 Observabilidade – Better Stack

O projeto está integrado ao **Better Stack** para monitoramento em tempo real.

## Monitoramentos implementados:

✅ Inicialização do servidor  
✅ Conexão com MongoDB  
✅ Requisições HTTP  
✅ Rotas acessadas  
✅ Logs de erro  

---

## Exemplos de logs:

```bash
Servidor iniciado com sucesso
Conexão com MongoDB realizada com sucesso
Requisição recebida
Rota raiz acessada
```

Recursos utilizados:

- Live Tail
- Histórico de logs
- Busca em tempo real

---

# 🔎 SonarCloud

Projeto integrado ao **SonarCloud** para análise contínua.

## Métricas analisadas:

✅ Bugs  
✅ Vulnerabilidades  
✅ Code Smells  
✅ Security Hotspots  
✅ Maintainability  
✅ Reliability  

Executado automaticamente em:

- Push
- Pull Requests

---

# 📧 Alertas de Pipeline

A pipeline envia alertas automáticos por e-mail em caso de falha.

Implementado com:

- Gmail SMTP
- GitHub Secrets
- GitHub Actions

Notificações incluem:

- Branch
- Commit
- Autor
- Link direto para o erro

---

# 🔐 Variáveis de Ambiente

```env
PORT=3000

MONGO_URI=
DB_NAME=

SECRET_KEY=
EXPIRES_IN=

SENHA_USUARIO=

BETTERSTACK_TOKEN=
BETTERSTACK_HOST=

NODE_ENV=
```

---

# ▶️ Instalação Local

## Clonar

```bash
git clone https://github.com/goncahri/Catalogo_Livros_PI_Backend.git
```

---

## Instalar dependências

```bash
npm install
```

---

## Rodar localmente

```bash
npm start
```

---

## Rodar testes

```bash
npm test
```

---

## Rodar Docker

```bash
docker compose up
```

---

# 👨‍💻 Equipe

## Grupo Wi (World Innovation)

- Herivelton Henrique Gonçalves

---

# 📌 Status Atual do Backend

✅ API REST  
✅ MongoDB Atlas  
✅ JWT  
✅ Swagger  
✅ Testes automatizados  
✅ GitFlow  
✅ GitHub Actions  
✅ Semantic Release  
✅ Docker  
✅ Docker Hub  
✅ Render HML  
✅ Render PROD  
✅ Deploy automático  
✅ Better Stack  
✅ SonarCloud  
✅ Alertas por e-mail  

---