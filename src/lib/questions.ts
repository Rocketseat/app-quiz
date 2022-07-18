export const questions = [
  {
    order: 1,
    description: "HTTP usam o que chamamos de métodos ou verbos. Qual verbo é utilizado para obter informações de um recurso.",
    options: [
      "POST",
      "GET",
      "READ",
      "ARGUMENT"
    ],
    answer: 1
  },
  {
    order: 2,
    description: "Uma aplicação WEB geralmente se comunica de maneira segura com um servidor pelo protocolo:",
    options: [
      "HTTP",
      "HTTPS",
      "FTP",
      "CTP"
    ],
    answer: 1
  },
  {
    order: 3,
    description: "Os valores GET, POST, HEAD etc são especificados em que parte da mensagem HTTP?",
    options: [
      "Request",
      "Header",
      "Body",
      "Nenhum desses"
    ],
    answer: 1
  },
  {
    order: 4,
    description: "A que se refere o termo thread?",
    options: [
      "Um vírus auto-replicante",
      "Uma categoria de navegador",
      "Uma série de mensagens vinculadas",
      "Uma falha comum em dispositivos de exibição"
    ],
    answer: 2
  },
  {
    order: 5,
    description: "Por ser uma linguagem marcação o CSS não permite variáveis no código?",
    options: [
      "Falso",
      "Verdadeiro"
    ],
    answer: 0
  },
  {
    order: 6,
    description: "Sabemos que o 'z-index' é uma propriedade do CSS que é utilizada para especificar a ordem de sobreposição dos elementos na tela. Sabendo disso, como liberamos o z-index?",
    options: [
      "O z-index é uma propriedade que não tem que ser liberada.",
      "Não tem necessidade de alterar o valor da propriedade position, pois o valor que já vem, libera a propriedade z-index.",
      "Alterando o valor da propriedade position do elemento para fixed, relative ou absolute",
      "Utilizando o valor static da propriedade position para liberar o z-index."
    ],
    answer: 2
  },
  {
    order: 7,
    description: "São propriedades do Box Model:",
    options: [
      "margin, size, color, padding.",
      "content, margin, padding, border.",
      "content, padding, flex.",
      "flex, grid, padding, margin."
    ],
    answer: 1
  },
  {
    order: 8,
    description: "No CSS é possível selecionarmos qualquer elemento precedente",
    options: [
      "Verdadeiro",
      "Falso"
    ],
    answer: 1
  },
  {
    order: 9,
    description: "Para importar um novo arquivo CSS, usamos?",
    options: [
      "import('');",
      "include css('')",
      "@import url('');"
    ],
    answer: 2
  },
  {
    order: 10,
    description: "Como devemos usar uma variável no CSS?",
    options: [
      "color: var(--variavel-cor)",
      "color: variavel-cor",
      "Não existe variável no CSS"
    ],
    answer: 0
  },
  {
    order: 11,
    description: "No JS, qual definição de função abaixo é inválida?",
    options: [
      "function minhaFuncao(){}",
      "void minhaFuncao(){}",
      "() => {}"
    ],
    answer: 1
  },
  {
    order: 12,
    description: "Qual o significado de MVC? ",
    options: [
      "Mayk vamos codar",
      "Model View Controller",
      "Modules View Coding ",
      "Modules View Control "
    ],
    answer: 1
  },
  {
    order: 13,
    description: "O atributo title é um atributo universal, pois todas as tags podem recebê-lo.",
    options: [
      "verdadeiro",
      "falso"
    ],
    answer: 0
  },
  {
    order: 14,
    description: "Como tudo é tratado no HTML DOM?",
    options: [
      "node",
      "attributes",
      "elements",
      "array"
    ],
    answer: 0
  },
  {
    order: 15,
    description: "Qual dos seguintes é um tipo de HTML DOM?",
    options: [
      "DOM legacy",
      "W3C DOM",
      "IE4 DOM",
      "Todos os mencionados"
    ],
    answer: 3
  },
  {
    order: 16,
    description: "Qual dos atributos a seguir não é compatível com HTML5?",
    options: [
      "content",
      "http-equiv",
      "scheme",
      "name"
    ],
    answer: 2
  },
  {
    order: 17,
    description: "O valor do atributo ______ em uma tag <meta http-equiv=refresh> refere-se ao intervalo de tempo em segundos antes que a atualização seja executada.",
    options: [
      "scheme",
      "content",
      "http-equiv",
      "name"
    ],
    answer: 1
  },
  {
    order: 18,
    description: "No HTML, elementos block não criam quebra de linha.",
    options: [
      "verdadeiro",
      "false"
    ],
    answer: 1
  },
  {
    order: 19,
    description: "Qual a diferença entre valor undefined e null?",
    options: [
      "undefined é um valor definido ou um erro que foi gerado. Null é uma variável declarada, mas não atribuida.",
      "undefined é uma variável declarada, mas não atribuida. Null é um valor definido ou um erro que foi gerado.",
      "undefined é um array de objetos. null é objeto de arrays"
    ],
    answer: 1
  },
  {
    order: 20,
    description: "O que é SOLID?",
    options: [
      "Uma linguagem de programação",
      "Um design pattern",
      "Boas práticas de escrita de código"
    ],
    answer: 2
  }
]