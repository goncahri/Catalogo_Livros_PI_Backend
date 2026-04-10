import jwt from 'jsonwebtoken'

export default async function auth(req, res, next) {
  const authHeader = req.headers['authorization'] 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'Acesso negado. É obrigatório o envio do token JWT'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.usuario = decoded.usuario
    next()
  } catch (e) {
    return res.status(403).json({ error: 'Token inválido!' })
  }
}
