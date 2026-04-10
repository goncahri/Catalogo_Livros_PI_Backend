import { MongoClient } from "mongodb";

let db = null;

export async function connectToDatabase(app) {
  if (db) {
    app.locals.db = db;
    return;
  }

  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!uri || !dbName) {
      throw new Error("❌ Variáveis de ambiente MONGO_URI e/ou DB_NAME não definidas");
    }

    const client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);
    app.locals.db = db;

    console.log("🟢 Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err;
  }
}

export function getDb() {
  if (!db) {
    throw new Error("❌ Banco de dados ainda não foi conectado.");
  }
  return db;
}
