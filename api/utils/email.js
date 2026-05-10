import nodemailer from "nodemailer";

function criarTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}

export async function enviarHashEmail({
  email,
  livro,
  mensagemCriptografada,
  hash
}) {

  if (
    !process.env.EMAIL_USERNAME ||
    !process.env.EMAIL_PASSWORD
  ) {

    throw new Error(
      "EMAIL_USERNAME ou EMAIL_PASSWORD não configurados no ambiente."
    );

  }

  const transporter =
    criarTransporter();

  await transporter.sendMail({

    from:
      process.env.EMAIL_USERNAME,

    to:
      email,

    subject:
      "🔒 Spoiler protegido - Catálogo de Livros",

    html: `
      <div style="font-family: Arial; max-width:600px;">

        <h2>
          📚 Catálogo de Livros
        </h2>

        <p>
          Você recebeu um spoiler protegido.
        </p>

        <hr>

        <p>
          <strong>Livro:</strong>
          ${livro}
        </p>

        <p>
          <strong>Mensagem criptografada:</strong>
        </p>

        <div style="
          background:#f5f5f5;
          padding:12px;
          border-radius:8px;
          margin-bottom:20px;
        ">

          ${mensagemCriptografada}

        </div>

        <p>
          <strong>Hash:</strong>
        </p>

        <div style="
          background:#e8f5e9;
          padding:12px;
          border-radius:8px;
          font-size:20px;
          font-weight:bold;
          width:fit-content;
        ">

          ${hash}

        </div>

        <br>

        <p>
          Acesse o sistema e utilize
          a mensagem criptografada
          junto do hash para revelar
          o spoiler.
        </p>

        <hr>

        <small>
          Este hash poderá ser utilizado
          apenas uma única vez.
        </small>

      </div>
    `
  });

}