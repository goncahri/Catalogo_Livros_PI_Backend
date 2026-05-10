const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const baseURL = 'http://localhost:3000/api';

const usuarioTeste = {
  nome: 'Usuário Teste',
  email: 'teste@teste.com',
  telefone: '5511999999999',
  senha: process.env.SENHA_USUARIO || 'Abc123!'
};

// Validação de Token JWT e Rotas Protegidas
describe('👉 API Livros sem token (Rotas Protegidas e Validação de Token JWT)', () => {
  it('GET - Lista os livros sem token (espera 401 Unauthorized)', async () => {
    await request(baseURL)
      .get('/livros')
      .set('Content-Type', 'application/json')
      .expect(401);
  });
});

describe('👉 API Livros com token', () => {
  let token;
  let livroId;

  it('POST - Garante usuário de teste cadastrado', async () => {
    const res = await request(baseURL)
      .post('/usuarios')
      .send(usuarioTeste);

    expect([201, 409]).toContain(res.status);
  });

  it('POST - Autenticar usuário (Gera token JWT)', async () => {
    const res = await request(baseURL)
      .post('/usuarios/login')
      .send({
        email: usuarioTeste.email,
        senha: usuarioTeste.senha
      })
      .expect(200);

    token = res.body.access_token;
    expect(token).toBeDefined();
  });

  it('GET - Obter livros com token (espera 200 OK)', async () => {
    const res = await request(baseURL)
      .get('/livros')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST - Cadastrar novo livro (espera 201 Created)', async () => {
    const res = await request(baseURL)
      .post('/livros')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Livro Teste',
        autor: 'Autor Teste',
        paginas: 123,
        avaliacao: 4.5,
        dataLeitura: '2025-06-01'
      })
      .expect(201);

    expect(res.body).toHaveProperty('insertedId');
    livroId = res.body.insertedId;
  });

  it('PUT - Editar livro (espera 200 OK)', async () => {
    const res = await request(baseURL)
      .put(`/livros/${livroId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Livro Editado',
        autor: 'Autor Editado',
        paginas: 150,
        avaliacao: 5,
        dataLeitura: '2025-06-02'
      })
      .expect(200);

    expect(res.body).toHaveProperty('message');
  });

  it('DELETE - Remover livro (espera 200 OK)', async () => {
    const res = await request(baseURL)
      .delete(`/livros/${livroId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('acknowledged', true);
    expect(res.body).toHaveProperty('deletedCount', 1);
  });
});