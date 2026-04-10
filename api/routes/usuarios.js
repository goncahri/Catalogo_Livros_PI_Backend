import express from 'express';
import { insereUsuario, efetuaLogin } from '../controllers/usuarios.js';
import { validarUsuario, tratarErros } from '../middleware/validation.js';

const router = express.Router();

// Cadastro de usuário
router.post('/', validarUsuario, tratarErros, insereUsuario);

// Login
router.post('/login', efetuaLogin);

export default router;


