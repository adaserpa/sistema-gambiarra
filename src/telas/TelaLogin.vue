<!-- TelaLogin.vue -->

<template>
<div class="tela-login">
  <!-- LADO ESQUERDO -->
  <div class="lado-esquerdo">
    <h1 class="logo" @click="ativarEasterEgg">GAMBIARRA</h1>

    <p v-if="mostrarEasterEgg" class="easter-egg">
      Admita: Você sabe que o sistema é bonito por fora, mas caótico por dentro...
    </p>

    <div class="definicao">
      <strong>gambiarra</strong><br />
      <em>substantivo feminino</em><br />
      <span v-for="(linha, index) in definicoesSorteadas" :key="index">
        {{ index + 1 }}. {{ linha }}<br />
      </span>
    </div>

    <div class="mascote-container">
      <img src="/capivara-trabalhando.svg" alt="Capivara trabalhando" class="mascote" />
      <span class="mascote-legenda">Mascote do mês: Capincho Hipster</span>
    </div>
  </div>

  <!-- LADO DIREITO -->
  <div class="lado-direito">
    <div class="conteudo-direito">
      <div class="quadro-login">
        <h2>Login</h2>
        <form @submit.prevent="fazerLogin">
          <label>
            Usuário:
            <input v-model="usuario" type="text" required />
          </label>
          <label>
            Senha:
            <input v-model="senha" type="password" required />
          </label>
          <button type="submit" :disabled="carregando">
            {{ carregando ? 'Entrando...' : 'Entrar' }}
          </button>
          <button type="button" @click="usarContaTeste">Usar conta de teste</button>
        </form>
        <p v-if="erro" class="erro" :key="erro">{{ erro }}</p>
      </div>

      <p class="frase-engracada-direita">{{ fraseSelecionada }}</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useEstadoGlobal } from '../estadoGlobal/index';
import { useRouter } from 'vue-router';
import { frasesEngracadas } from '../conteudo/frasesEngracadas';
import { definicoesGambiarra } from '../conteudo/definicoesGambiarra';

const usuario = ref('');
const senha = ref('');
const erro = ref('');
const carregando = ref(false);
const tentativas = ref(0);

const mostrarEasterEgg = ref(false);
const ativarEasterEgg = () => {
mostrarEasterEgg.value = !mostrarEasterEgg.value;
};

const fraseSelecionada = ref(
frasesEngracadas[Math.floor(Math.random() * frasesEngracadas.length)]
);

function sortearDefinicoes(array, quantidade) {
const embaralhado = [...array].sort(() => 0.5 - Math.random());
return embaralhado.slice(0, quantidade);
}

const definicoesSorteadas = ref(sortearDefinicoes(definicoesGambiarra, 3));

const estadoGlobal = useEstadoGlobal();
const router = useRouter();

const fazerLogin = async () => {
if (!usuario.value.trim() || !senha.value.trim()) {
  erro.value = 'Preencha todos os campos.';
  return;
}

carregando.value = true;
erro.value = '';

try {
  const resposta = await fetch("https://script.google.com/macros/s/AKfycbzG570AZk6-Sd4J3U3tCuEy3jc_YA4PcNaF7VEoKwwq4msnXiRLYQ_T9djEZ0miW98t/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario: usuario.value,
      senha: senha.value
    })
  });

  

  const resultado = await resposta.json();

  if (resultado.sucesso) {
    estadoGlobal.usuarioLogado.value = resultado.usuario;
    estadoGlobal.tipoUsuario.value = resultado.permissao;
    // Salvar no localStorage
    localStorage.setItem('usuario', resultado.usuario);
    localStorage.setItem('tipoUsuario', resultado.permissao);
    router.push('/painel');
  } else {
    tentativas.value++;
    erro.value = `Usuário ou senha inválidos. Tentativa nº ${tentativas.value}.`;
  }
} catch (e) {
  erro.value = 'Erro de conexão. Tente novamente.';
}

carregando.value = false;
};

const usarContaTeste = () => {
usuario.value = 'augustoserpa';
senha.value = '1234';
};

watch([usuario, senha], () => {
if (erro.value) erro.value = '';
});

// Ao montar a tela, se já estiver logado, redireciona
onMounted(() => {
const usuarioSalvo = localStorage.getItem('usuario');
const tipoSalvo = localStorage.getItem('tipoUsuario');
if (usuarioSalvo && tipoSalvo) {
  estadoGlobal.usuarioLogado.value = usuarioSalvo;
  estadoGlobal.tipoUsuario.value = tipoSalvo;
  router.push('/painel');
}
});


</script>


<style scoped>




/* === GERAL === */
.tela-login {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Segoe UI', sans-serif;
}

/* === LADO ESQUERDO === */
.lado-esquerdo {
  flex: 1;
  background-color: #005c38;
  color: #e0f2ea;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 100%;
}

.logo {
  font-family: 'Pacifico', cursive;
  font-size: clamp(2rem, 6vw, 4rem);
  color: #ffffff;
  margin-bottom: 1rem;
  animation: brilhoGambiarra 8s linear infinite;
  cursor: pointer;
  text-align: center;
}


@keyframes brilhoGambiarra {
  0% { text-shadow: 0 0 0px transparent; }
  50% {
    text-shadow:
      0 0 5px #ffffff,
      0 0 10px #b7f9d3,
      0 0 20px #64d296;
  }
  100% { text-shadow: 0 0 0px transparent; }
}

.easter-egg {
  margin-top: 0.5rem;
  color: #ffffffcc;
  font-size: 0.9rem;
  font-style: italic;
  animation: fadeIn 0.5s ease-in;
  max-width: 420px;
  text-align: justify;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.definicao {
  border-left: 4px solid #ffffff33;
  padding-left: 1rem;
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 2rem 0;
  max-width: 420px;
  text-align: justify;
}

.mascote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: auto;
}

.mascote {
  width: 220px;
  max-width: 90%;
  height: auto;
  background: transparent;
  filter: none;
  mix-blend-mode: normal;
  display: block;
}

.mascote-legenda {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #ffffffcc;
  text-align: center;
}

/* === LADO DIREITO === */
.lado-direito {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  max-width: 100%;
}

.conteudo-direito {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quadro-login {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}

.quadro-login h2 {
  margin-bottom: 1.5rem;
  color: #005c38;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #333;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.2rem;
  font-size: 1rem;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #005c38;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.03);
  background-color: #007b50;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

/* === FEEDBACK === */
.erro {
  margin-top: 1rem;
  color: #ff4d4d;
  font-weight: bold;
  animation: erroBalanço 0.3s ease-in-out;
}

@keyframes erroBalanço {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.frase-engracada-direita {
  margin-top: 1.5rem;
  font-style: italic;
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  max-width: 300px;
}

/* === RESPONSIVO === */
@media (max-width: 768px) {
  .tela-login {
    flex-direction: column;
  }

  .lado-esquerdo, .lado-direito {
    flex: none;
    width: 100%;
    padding: 2rem;
    text-align: center;
  }

  .logo {
    text-align: center;
    width: 100%;
  }

  .conteudo-direito {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .conteudo-direito {
    padding: 1rem;
  }

  .titulo {
    font-size: 1.2rem;
  }

  .cabecalho {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
