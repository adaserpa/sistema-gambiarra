export function autenticarUsuarioFake(usuario, senha) {
  const usuarios = [
    { nome: 'augustoserpa', senha: '1234', tipo: 'Administração' },
    { nome: 'douglasborges', senha: '12345', tipo: 'Administração' },
    { nome: 'inaciobrandolt', senha: '123456', tipo: 'Direção' }
  ];

  const usuarioValido = usuarios.find(u => u.nome === usuario && u.senha === senha);

  if (usuarioValido) {
    return {
      sucesso: true,
      dados: {
        nome: usuarioValido.nome,
        tipo: usuarioValido.tipo
      }
    };
  } else {
    return {
      sucesso: false,
      mensagem: 'Usuário ou senha inválidos.'
    };
  }
}

export function obterDadosPainelFake() {
  return {
    tutores: 1372,
    arrecadacao: 18720,
    boletosEmAberto: 56,
    animaisAtivos: 412,
    metaAnual: 200000,
    mascote: {
      nome: 'Capincho Hipster',
      frase: '“Dormir 8h por noite não resolve quando você trabalha com Excel...”'
    }
  }
}

export function obterDadosPainelSimplesVet() {
  return {
    tutores: 980,
    arquivados: 392,
    animais: 1342
  }
}

export function buscarTutorFake(filtro) {
  const tutores = [
    {
      codigo: '00001',
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      animais: [
        { codigo: 'A001', nome: 'Tobi', especie: 'Cão', porte: 'Médio' },
        { codigo: 'A002', nome: 'Mingau', especie: 'Gato', porte: 'Pequeno' }
      ]
    },
    {
      codigo: '00002',
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      animais: [
        { codigo: 'A003', nome: 'Rex', especie: 'Cão', porte: 'Grande' }
      ]
    }
  ]

  return tutores.filter(tutor =>
    tutor.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    tutor.cpf.includes(filtro) ||
    tutor.codigo.includes(filtro)
  )
}
