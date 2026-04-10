import express from "express";
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
  consultaAvancada,
  buscarLivroGoogle,
  getLivrosDestaque
} from "../controllers/livros.js";

import { validarLivro, tratarErros } from "../middleware/validation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Lista livros em destaque
router.get('/destaques', auth, getLivrosDestaque);

// Busca na API do Google Books
router.get('/busca/google/:titulo', auth, buscarLivroGoogle);

// Busca avançada (com filtros por avaliação mínima/máxima)
router.get('/busca/avancada', auth, consultaAvancada);

// Lista todos os livros com paginação, ordenação e filtros
router.get('/', auth, getLivros);

// Busca livro específico por ID
router.get('/:id', auth, getLivroById);

// Cadastra novo livro
router.post('/', auth, validarLivro, tratarErros, createLivro);

// Atualiza livro existente
router.put('/:id', auth, validarLivro, tratarErros, updateLivro);

// Remove livro
router.delete('/:id', auth, deleteLivro);

export default router;