import express from "express";
import auth from "../middleware/auth.js";

import {
  listarUsuarios,
  criarSpoiler,
  listarRecebidos,
  revelarSpoiler
} from "../controllers/spoilers.js";

const router = express.Router();

// Lista usuários cadastrados para seleção
router.get("/usuarios", auth, listarUsuarios);

// Cria spoiler criptografado
router.post("/criptografar", auth, criarSpoiler);

// Lista spoilers recebidos pelo usuário logado
router.get("/recebidos", auth, listarRecebidos);

// Revela spoiler (hash de uso único)
router.post("/revelar", auth, revelarSpoiler);

export default router;