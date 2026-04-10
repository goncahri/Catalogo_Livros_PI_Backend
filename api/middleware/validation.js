import { body, validationResult } from 'express-validator';

// Validação de cadastro de livros
export const validarLivro = [
  body('titulo')
    .notEmpty().withMessage('O título é obrigatório.')
    .isLength({ min: 3 }).withMessage('O título deve ter pelo menos 3 caracteres.'),

  body('autor')
    .notEmpty().withMessage('O autor é obrigatório.')
    .isLength({ min: 3 }).withMessage('O autor deve ter pelo menos 3 caracteres.'),

  body('paginas')
    .notEmpty().withMessage('O número de páginas é obrigatório.')
    .isInt({ min: 1 }).withMessage('O número de páginas deve ser um inteiro positivo.'),

  body('avaliacao')
    .custom((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error('A avaliação deve ser um número.');
      }
      if (num < 0 || num > 5) {
        throw new Error('A avaliação deve estar entre 0 e 5.');
      }
      return true;
    })
    .withMessage('A avaliação deve estar entre 0 e 5.'),

  body('dataLeitura')
    .notEmpty().withMessage('A data da leitura é obrigatória.')
    .isISO8601().withMessage('A data da leitura deve estar em formato válido (AAAA-MM-DD).')
    .custom((data) => {
      const hoje = new Date().toISOString().split('T')[0];
      if (data > hoje) {
        throw new Error('A data da leitura não pode ser futura.');
      }
      return true;
    }),

  body('opiniao')
    .optional()
    .isLength({ max: 300 }).withMessage('A opinião pessoal deve ter no máximo 300 caracteres.')
];

// Validação de cadastro de usuário
export const validarUsuario = [
  body('email')
    .notEmpty().withMessage('O e-mail é obrigatório.')
    .isEmail().withMessage('O e-mail informado não é válido.'),

  body('senha')
    .notEmpty().withMessage('A senha é obrigatória.')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.')
    .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
    .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
    .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número.')
    .matches(/[^A-Za-z0-9]/).withMessage('A senha deve conter pelo menos um caractere especial.')
];

// Tratamento centralizado dos erros
export const tratarErros = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({
      error: true,
      erros: erros.array().map(e => ({ campo: e.param, msg: e.msg }))
    });
  }
  next();
};
