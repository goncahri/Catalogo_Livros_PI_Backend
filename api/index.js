import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger.json");

import { connectToDatabase } from "./config/db.js";
import { logInfo, logError } from "./config/logger.js";
import livrosRoutes from "./routes/livros.js";
import usuariosRoutes from "./routes/usuarios.js";
import spoilersRoutes from "./routes/spoilers.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Log simples de requisições
app.use(async (req, res, next) => {
  await logInfo("Requisição recebida", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
});

// Swagger UI local via swagger-ui-express
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Arquivos estáticos
app.use("/images", express.static("public/images"));

// Swagger UI estático para produção (Vercel)
app.use("/docs", express.static("public/docs"));

// Rotas principais
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/spoilers", spoilersRoutes);

// Rota raiz
app.get("/", async (req, res) => {
  await logInfo("Rota raiz acessada");
  res.send("📚 API de Livros rodando com sucesso!");
});

// Middleware de erro
app.use(async (err, req, res, next) => {
  await logError("Erro não tratado na aplicação", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(500).json({
    error: true,
    message: "Erro interno do servidor.",
  });
});

// Conexão com banco e start do servidor
async function startServer() {
  try {
    await connectToDatabase(app);

    await logInfo("Conexão com MongoDB realizada com sucesso", {
      database: process.env.DB_NAME,
    });

    app.listen(port, async () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);

      await logInfo("Servidor iniciado com sucesso", {
        port,
      });
    });
  } catch (error) {
    await logError("Erro ao iniciar servidor", {
      error: error.message,
      stack: error.stack,
    });

    throw error;
  }
}

startServer();

export default app;