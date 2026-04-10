import fetch from "node-fetch";
import { ObjectId } from "mongodb";

// GET com filtros, paginação e ordenação
export const getLivros = async (req, res) => {
  const db = req.app.locals.db;
  const {
    titulo,
    autor,
    ano,
    avaliacaoMin,
    avaliacaoMax,
    page = 1,
    limit = 10,
    sort,
    order = "asc"
  } = req.query;

  const filtro = {};
  if (titulo) filtro.titulo = { $regex: titulo, $options: "i" };
  if (autor) filtro.autor = { $regex: autor, $options: "i" };
  if (ano) {
    filtro.dataLeitura = {
      $gte: new Date(`${ano}-01-01`),
      $lte: new Date(`${ano}-12-31`)
    };
  }
  if (avaliacaoMin || avaliacaoMax) {
    filtro.avaliacao = {};
    if (avaliacaoMin) filtro.avaliacao.$gte = parseFloat(avaliacaoMin);
    if (avaliacaoMax) filtro.avaliacao.$lte = parseFloat(avaliacaoMax);
  }

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;

  try {
    const cursor = db.collection("livros").find(filtro);

    if (sort) {
      const sortOptions = {};
      sortOptions[sort] = order === "desc" ? -1 : 1;
      cursor.sort(sortOptions);
    }

    const livros = await cursor.skip(skip).limit(limitInt).toArray();
    const total = await db.collection("livros").countDocuments(filtro);

    res.json({
      data: livros,
      pagination: {
        total,
        page: pageInt,
        limit: limitInt,
        pages: Math.ceil(total / limitInt)
      }
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
};

// GET por ID
export const getLivroById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const livro = await db.collection("livros").findOne({ _id: new ObjectId(id) });
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }
    res.json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    res.status(500).json({ error: "Erro ao buscar livro por ID" });
  }
};

// POST
export const createLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { titulo, autor, paginas, avaliacao, dataLeitura, opiniao } = req.body;

  if (
    !titulo || !autor || !paginas ||
    avaliacao === undefined || avaliacao === null ||
    !dataLeitura
  ) {
    return res.status(400).json({ error: true, message: "Todos os campos são obrigatórios." });
  }

  const data = new Date(dataLeitura);
  data.setUTCHours(12, 0, 0, 0);

  const novoLivro = {
    titulo,
    autor,
    paginas: Number(paginas),
    avaliacao: Number(avaliacao),
    dataLeitura: data,
    opiniao: opiniao || ""
  };

  try {
    const result = await db.collection("livros").insertOne(novoLivro);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("❌ Erro ao cadastrar livro:", error);
    res.status(500).json({ error: true, message: "Erro ao cadastrar livro" });
  }
};

// PUT
export const updateLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  const { titulo, autor, paginas, avaliacao, dataLeitura, opiniao } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: true, message: "ID inválido" });
  }

  try {
    const result = await db.collection("livros").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          titulo,
          autor,
          paginas: Number(paginas),
          avaliacao: Number(avaliacao),
          dataLeitura: new Date(dataLeitura),
          opiniao: String(opiniao || "")
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: true, message: "Livro não encontrado" });
    }

    res.json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("❌ Erro ao atualizar livro:", error);
    res.status(500).json({ error: true, message: "Erro ao atualizar livro" });
  }
};

// DELETE
export const deleteLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const result = await db.collection("livros").deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    console.error("❌ Erro ao excluir livro:", error);
    res.status(500).json({ error: true, message: "Erro ao excluir livro" });
  }
};

// GET com operadores avançados
export const consultaAvancada = async (req, res) => {
  const db = req.app.locals.db;
  const { avaliacaoMin, avaliacaoMax } = req.query;

  const condicoes = {};

  if (avaliacaoMin) condicoes.$gte = parseFloat(avaliacaoMin);
  if (avaliacaoMax) condicoes.$lte = parseFloat(avaliacaoMax);

  if (!avaliacaoMin && !avaliacaoMax) {
    return res.status(400).json({ error: "Informe ao menos uma condição de avaliação." });
  }

  try {
    const livros = await db.collection("livros").find({
      avaliacao: condicoes
    }).toArray();

    res.json(livros);
  } catch (error) {
    console.error("Erro na consulta avançada:", error);
    res.status(500).json({ error: "Erro na consulta avançada" });
  }
};

// Busca dados do Google Books por título
export const buscarLivroGoogle = async (req, res) => {
  const { titulo } = req.params;
  if (!titulo) {
    return res.status(400).json({ error: "Título obrigatório." });
  }

  const buscarLivro = async (lang) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(titulo)}${lang ? `&langRestrict=${lang}` : ""}&maxResults=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items?.[0] || null;
  };

  try {
    let item = await buscarLivro("pt");
    if (!item) item = await buscarLivro(null);

    if (!item) {
      return res.status(404).json({ error: "Livro não encontrado no Google Books." });
    }

    const info = item.volumeInfo;

    res.json({
      googleBookId: item.id,
      titulo: info.title,
      autor: info.authors?.join(", ") || "Autor desconhecido",
      paginas: info.pageCount || 0,
      sinopse: info.description || "Sem sinopse disponível.",
      thumbnail: info.imageLinks?.thumbnail || null
    });

  } catch (error) {
    console.error("Erro ao buscar no Google Books:", error);
    res.status(500).json({ error: "Erro ao buscar no Google Books." });
  }
};

// GET /api/livros/destaques
export const getLivrosDestaque = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const livros = await db.collection("livros")
      .find()
      .sort({ avaliacao: -1 })
      .limit(5)
      .toArray();

    const resultados = await Promise.all(livros.map(async (livro) => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(livro.titulo)}&maxResults=1`);
        const data = await response.json();
        const thumbnail = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || null;
        return { ...livro, thumbnail };
      } catch {
        return { ...livro, thumbnail: null };
      }
    }));

    res.json(resultados);
  } catch (error) {
    console.error("Erro ao buscar destaques:", error);
    res.status(500).json({ error: "Erro ao buscar destaques." });
  }
};
