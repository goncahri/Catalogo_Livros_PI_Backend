use('livrosdb'); 

db.livros.insertMany([
  {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    paginas: 464,
    avaliacao: 4.8,
    dataLeitura: ISODate("2024-07-17T00:00:00Z"),
    opiniao: "Leitura essencial para quem quer escrever código limpo e eficiente."
  },
  {
    titulo: "O Programador Pragmático",
    autor: "Andrew Hunt",
    paginas: 352,
    avaliacao: 4.7,
    dataLeitura: ISODate("2024-08-01T00:00:00Z"),
    opiniao: "Ótimo livro para quem quer ser mais produtivo como desenvolvedor."
  },
  {
    titulo: "JavaScript: The Good Parts",
    autor: "Douglas Crockford",
    paginas: 176,
    avaliacao: 4.2,
    dataLeitura: ISODate("2024-04-18T00:00:00Z"),
    opiniao: "Focado no essencial do JavaScript. Leitura técnica, mas muito útil."
  },
  {
    titulo: "Design Patterns",
    autor: "Erich Gamma",
    paginas: 395,
    avaliacao: 4.6,
    dataLeitura: ISODate("2024-02-12T00:00:00Z"),
    opiniao: "Livro clássico e obrigatório sobre padrões de projeto."
  },
  {
    titulo: "You Don’t Know JS Yet",
    autor: "Kyle Simpson",
    paginas: 278,
    avaliacao: 4.4,
    dataLeitura: ISODate("2024-03-21T00:00:00Z"),
    opiniao: "Perfeito para quem quer entender o JavaScript profundamente."
  },
  {
    titulo: "Código Limpo para Python",
    autor: "Luciano Ramalho",
    paginas: 560,
    avaliacao: 4.9,
    dataLeitura: ISODate("2024-01-30T00:00:00Z"),
    opiniao: "Excelente para quem trabalha ou quer trabalhar profissionalmente com Python."
  },
  {
    titulo: "Refatoração",
    autor: "Martin Fowler",
    paginas: 448,
    avaliacao: 4.7,
    dataLeitura: ISODate("2024-01-05T00:00:00Z"),
    opiniao: "Fundamental para quem quer aprender a melhorar códigos existentes."
  },
  {
    titulo: "Domain-Driven Design",
    autor: "Eric Evans",
    paginas: 560,
    avaliacao: 4.3,
    dataLeitura: ISODate("2024-06-01T00:00:00Z"),
    opiniao: "Leitura densa, mas extremamente importante para arquitetura de software."
  },
  {
    titulo: "Introdução à Computação",
    autor: "Peter Norton",
    paginas: 432,
    avaliacao: 4,
    dataLeitura: ISODate("2024-02-20T00:00:00Z"),
    opiniao: "Ótimo para quem está começando na área de computação."
  },
  {
    titulo: "Python Fluente",
    autor: "Luciano Ramalho",
    paginas: 792,
    avaliacao: 4.9,
    dataLeitura: ISODate("2023-12-10T00:00:00Z"),
    opiniao: "A bíblia do Python para programadores profissionais."
  },
  {
    titulo: "Algoritmos: Teoria e Prática",
    autor: "Thomas H. Cormen",
    paginas: 1312,
    avaliacao: 4.8,
    dataLeitura: ISODate("2024-03-05T00:00:00Z"),
    opiniao: "Livro referência no estudo de algoritmos. Completo e detalhado."
  },
  {
    titulo: "Automate the Boring Stuff with Python",
    autor: "Al Sweigart",
    paginas: 504,
    avaliacao: 4.6,
    dataLeitura: ISODate("2023-11-22T00:00:00Z"),
    opiniao: "Perfeito para quem quer automatizar tarefas do dia a dia."
  },
  {
    titulo: "Soft Skills",
    autor: "John Sonmez",
    paginas: 504,
    avaliacao: 4.5,
    dataLeitura: ISODate("2024-07-01T00:00:00Z"),
    opiniao: "Excelente para desenvolvimento pessoal e carreira na programação."
  },
  {
    titulo: "Sprint",
    autor: "Jake Knapp",
    paginas: 288,
    avaliacao: 4.3,
    dataLeitura: ISODate("2023-10-10T00:00:00Z"),
    opiniao: "Ótimo livro para entender como testar ideias rapidamente."
  },
  {
    titulo: "The Mythical Man-Month",
    autor: "Frederick P. Brooks",
    paginas: 322,
    avaliacao: 4.1,
    dataLeitura: ISODate("2023-09-15T00:00:00Z"),
    opiniao: "Uma visão clássica sobre desenvolvimento de software e gerenciamento."
  },
  {
    titulo: "A Arte de Fazer Acontecer",
    autor: "David Allen",
    paginas: 352,
    avaliacao: 4.4,
    dataLeitura: ISODate("2024-03-18T00:00:00Z"),
    opiniao: "Ótimo para quem quer melhorar sua produtividade e organização pessoal."
  },
  {
    titulo: "Scrum: A Arte de Fazer o Dobro do Trabalho na Metade do Tempo",
    autor: "Jeff Sutherland",
    paginas: 256,
    avaliacao: 4.6,
    dataLeitura: ISODate("2024-04-02T00:00:00Z"),
    opiniao: "Indispensável para quem trabalha com metodologias ágeis."
  },
  {
    titulo: "Extreme Programming Explained",
    autor: "Kent Beck",
    paginas: 224,
    avaliacao: 4,
    dataLeitura: ISODate("2023-08-10T00:00:00Z"),
    opiniao: "Leitura rápida, mas muito importante sobre desenvolvimento ágil."
  },
  {
    titulo: "Lean Startup",
    autor: "Eric Ries",
    paginas: 336,
    avaliacao: 4.3,
    dataLeitura: ISODate("2023-07-07T00:00:00Z"),
    opiniao: "Fundamental para quem deseja empreender com inovação."
  },
  {
    titulo: "Cabeça Fria, Coração Quente",
    autor: "Abel Ferreira",
    paginas: 408,
    avaliacao: 5,
    dataLeitura: ISODate("2025-04-18T00:00:00Z"),
    opiniao: "Livro sensacional para quem é palmeirense e vencedor!"
  }
]);
