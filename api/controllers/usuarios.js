import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const insereUsuario = async (req, res) => {
  try {
    const db = req.app.locals.db

    // Verificar se o e-mail já existe
    const emailExistente = await db.collection('usuarios').findOne({ email: req.body.email })
    if (emailExistente) {
      return res.status(409).json({
        erros: [{
          value: req.body.email,
          msg: 'Este e-mail já está cadastrado.',
          param: 'email'
        }]
      })
    }

    // Gera avatar automático
    req.body.avatar = `https://ui-avatars.com/api/?name=${req.body.nome.replace(/ /g, '+')}&background=F00&color=FFF`

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10)
    req.body.senha = await bcrypt.hash(req.body.senha, salt)

    // Insere o usuário no banco
    const result = await db.collection('usuarios').insertOne(req.body)

    res.status(201).send(result)
  } catch (err) {
    console.error("Erro ao inserir usuário:", err)
    res.status(400).json({ erro: err.message || "Erro desconhecido" })
  }
}

export const efetuaLogin = async (req, res) => {
  const { email, senha } = req.body
  try {
    const db = req.app.locals.db
    const usuario = await db.collection('usuarios').findOne({ email })

    if (!usuario) {
      return res.status(404).json({
        errors: [{
          value: email,
          msg: `O email ${email} não está cadastrado`,
          param: 'email'
        }]
      })
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha)
    if (!isMatch) {
      return res.status(403).json({
        errors: [{
          value: 'senha',
          msg: 'A senha informada está incorreta',
          param: 'senha'
        }]
      })
    }

    jwt.sign(
      { usuario: { id: usuario._id } },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN || '1d' },
      (err, token) => {
        if (err) throw err
        res.status(200).json({
        access_token: token,
        usuario: {
          nome: usuario.nome,
          avatar: usuario.avatar
        },
        msg: 'Login efetuado com sucesso'
      })
      }
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Erro interno ao efetuar login' })
  }
}
