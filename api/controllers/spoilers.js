import crypto from "crypto";
import { ObjectId } from "mongodb";
import { enviarHashEmail } from "../utils/email.js";

// Cifra de César
function cifraCesar(texto, passo) {
  return texto
    .split("")
    .map((char) => {
      const codigo = char.charCodeAt(0);

      // A-Z
      if (codigo >= 65 && codigo <= 90) {
        return String.fromCharCode(
          ((codigo - 65 + passo) % 26) + 65
        );
      }

      // a-z
      if (codigo >= 97 && codigo <= 122) {
        return String.fromCharCode(
          ((codigo - 97 + passo) % 26) + 97
        );
      }

      return char;
    })
    .join("");
}

// Lista usuários
export const listarUsuarios = async (req, res) => {
  try {
    const db = req.app.locals.db;

    const usuarios = await db
      .collection("usuarios")
      .find(
        {},
        {
          projection: {
            nome: 1,
            email: 1,
            telefone: 1
          }
        }
      )
      .toArray();

    res.json(usuarios);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao listar usuários"
    });
  }
};

// Criptografar spoiler
export const criarSpoiler = async (req, res) => {
  try {
    const db = req.app.locals.db;

    const {
      livro,
      mensagem,
      passo,
      destinatarioId,
      tipoEnvio
    } = req.body;

    if (!livro || !mensagem || !passo || !destinatarioId) {
      return res.status(400).json({
        error: "Livro, mensagem, passo e destinatário são obrigatórios."
      });
    }

    if (!ObjectId.isValid(destinatarioId)) {
      return res.status(400).json({
        error: "Destinatário inválido."
      });
    }

    const destinatario = await db
      .collection("usuarios")
      .findOne({
        _id: new ObjectId(destinatarioId)
      });

    if (!destinatario) {
      return res.status(404).json({
        error: "Destinatário não encontrado."
      });
    }

    if (!destinatario.email) {
      return res.status(400).json({
        error: "O destinatário não possui e-mail cadastrado."
      });
    }

    if (!destinatario.telefone) {
      return res.status(400).json({
        error: "O destinatário não possui telefone/WhatsApp cadastrado."
      });
    }

    const hash = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const mensagemCriptografada =
      cifraCesar(
        mensagem,
        Number(passo)
      );

    const mensagemWhatsappTexto = `🔒 Spoiler protegido - Catálogo de Livros

Livro: ${livro}

Mensagem criptografada:
${mensagemCriptografada}

Hash:
${hash}

Acesse o sistema para revelar o spoiler.`;

    const mensagemWhatsapp =
      encodeURIComponent(mensagemWhatsappTexto);

    const whatsappUrl =
      `https://wa.me/${destinatario.telefone}?text=${mensagemWhatsapp}`;

    const spoiler = {
      remetenteId:
        new ObjectId(req.usuario.id),

      destinatarioId:
        new ObjectId(destinatarioId),

      destinatarioEmail:
        destinatario.email,

      destinatarioTelefone:
        destinatario.telefone,

      livro,

      mensagemOriginal:
        mensagem,

      mensagemCriptografada,

      passo:
        Number(passo),

      hash,

      tipoEnvio:
        tipoEnvio || "sistema",

      whatsappUrl,

      usado:
        false,

      emailEnviado:
        false,

      createdAt:
        new Date()
    };

    const result =
      await db
        .collection("spoilers")
        .insertOne(spoiler);

    try {
      await enviarHashEmail({
        email: destinatario.email,
        livro,
        mensagemCriptografada,
        hash
      });

      await db
        .collection("spoilers")
        .updateOne(
          { _id: result.insertedId },
          {
            $set: {
              emailEnviado: true,
              emailEnviadoEm: new Date()
            }
          }
        );

    } catch (emailError) {
      console.error("Erro ao enviar spoiler por e-mail:", emailError);
    }

    res.status(201).json({
      insertedId:
        result.insertedId,

      mensagemCriptografada,

      hash,

      mensagemWhatsappTexto,

      whatsappUrl,

      destinatario: {
        nome: destinatario.nome,
        email: destinatario.email,
        telefone: destinatario.telefone
      },

      aviso:
        "Spoiler criado. A mensagem criptografada e o hash foram preparados para WhatsApp e enviados por e-mail ao destinatário."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar spoiler"
    });
  }
};

// Spoilers recebidos
export const listarRecebidos = async (req, res) => {
  try {
    const db =
      req.app.locals.db;

    const spoilers =
      await db
        .collection("spoilers")
        .find({
          destinatarioId:
            new ObjectId(
              req.usuario.id
            )
        })
        .sort({ createdAt: -1 })
        .toArray();

    res.json(spoilers);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao listar spoilers"
    });
  }
};

// Revelar spoiler (uso único)
export const revelarSpoiler = async (req, res) => {
  try {
    const db =
      req.app.locals.db;

    const {
      mensagemCriptografada,
      hash
    } = req.body;

    if (!mensagemCriptografada || !hash) {
      return res.status(400).json({
        error: "Mensagem criptografada e hash são obrigatórios."
      });
    }

    const spoiler =
      await db
        .collection("spoilers")
        .findOne({
          mensagemCriptografada,
          hash
        });

    if (!spoiler) {
      return res.status(404).json({
        error: "Spoiler não encontrado"
      });
    }

    if (spoiler.usado) {
      return res.status(400).json({
        error: "Este hash já foi utilizado"
      });
    }

    const mensagemOriginal =
      cifraCesar(
        spoiler.mensagemCriptografada,
        26 - spoiler.passo
      );

    await db
      .collection("spoilers")
      .updateOne(
        {
          _id: spoiler._id
        },
        {
          $set: {
            usado: true,
            openedAt: new Date()
          }
        }
      );

    res.json({
      livro:
        spoiler.livro,

      mensagemOriginal,

      remetenteId:
        spoiler.remetenteId
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao revelar spoiler"
    });
  }
};