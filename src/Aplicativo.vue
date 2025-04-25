<!-- Aplicativo.vue -->


<template>
<div class="aplicativo">
  <header v-if="deveExibirCabecalho" class="cabecalho">
    <div class="cabecalho-esquerda">
      <button class="botao-menu" @click="alternarMenu">
        <span class="icone-menu">☰</span>
        <span class="texto-menu">GAMBIARRA</span>
      </button>
    </div>
    <div class="usuario-info">
      <span>{{ nomeUsuario }}</span>
    </div>
  </header>

  <!-- Menu suspenso -->
  <div v-if="menuAberto && deveExibirCabecalho" class="menu-suspenso" @click.stop>
    <ul>
      <li><router-link to="/painel">🏠 Painel</router-link></li>
      <li class="has-submenu">
        <span @click="submenuAberto = !submenuAberto">💰 Arrecadação ▾</span>
        <ul v-if="submenuAberto" class="submenu">
          <li><router-link to="/gerar-boletos">🧾 Gerar Novos Boletos</router-link></li>
        </ul>
      </li>
      <li><router-link to="/estagios">🎓 Estágios</router-link></li>
      <li><router-link to="/relatorios">📑 Relatórios</router-link></li>
      <li><router-link to="/configuracoes">⚙️ Configurações</router-link></li>
      <li><a href="#" class="sair" @click.prevent="sair">🚪 Sair</a></li>
    </ul>
  </div>

  <!-- Conteúdo -->
  <main class="conteudo-principal" @click="fecharMenus">
    <router-view />
  </main>

  <footer v-if="deveExibirCabecalho" class="rodape">
    <span>{{ dataHoraAtual }}</span>
  </footer>
</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEstadoGlobal } from './estadoGlobal/index'
import { logout } from './utilitarios/servicoAutenticacao'


const router = useRouter()
const route = useRoute()
const estadoGlobal = useEstadoGlobal()

const menuAberto = ref(false)
const submenuAberto = ref(false)

const nomeUsuario = estadoGlobal.usuarioLogado
const usuarioLogado = computed(() => !!estadoGlobal.usuarioLogado.value)

// Verifica se precisa mostrar cabeçalho/menu/rodapé
const deveExibirCabecalho = computed(() => {
return usuarioLogado.value && route.path !== '/login'
})

const dataHoraAtual = ref('')

const atualizarDataHora = () => {
const agora = new Date()
dataHoraAtual.value = agora.toLocaleString('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short'
})
}

onMounted(() => {
atualizarDataHora()
setInterval(atualizarDataHora, 60000)
})

// Atualiza menus ao trocar de rota
watch(route, () => {
fecharMenus()
})

const alternarMenu = () => {
menuAberto.value = !menuAberto.value
if (!menuAberto.value) submenuAberto.value = false
}

const fecharMenus = () => {
menuAberto.value = false
submenuAberto.value = false
}

const sair = () => {
  if (confirm('Tem certeza que deseja sair do sistema?')) {
    logout();
  }
}

</script>

<style scoped>
/* CABEÇALHO */
.cabecalho {
  background-color: #005c38;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.cabecalho-esquerda {
  display: flex;
  align-items: center;
}

.botao-menu {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.botao-menu:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.icone-menu {
  font-size: 1.4rem;
}

.texto-menu {
  font-size: 1.3rem;
  white-space: nowrap;
}

.usuario-info span {
  font-weight: bold;
  font-size: 0.95rem;
  white-space: nowrap;
}

/* MENU SUSPENSO */
.menu-suspenso {
  position: absolute;
  top: 4.5rem;
  left: 1rem;
  background-color: #ffffff;
  color: #00482c;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 999;
  min-width: 220px;
  overflow: hidden;
}

.menu-suspenso ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-suspenso li {
  border-bottom: 1px solid #eee;
}

.menu-suspenso li:last-child {
  border-bottom: none;
}

.menu-suspenso a,
.menu-suspenso span {
  display: block;
  padding: 0.8rem 1.2rem;
  color: #00482c;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.menu-suspenso a:hover,
.menu-suspenso span:hover {
  background-color: #e0f2ea;
  color: #003322;
}

/* SUBMENU */
.has-submenu {
  position: relative;
}

.submenu {
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
}

.submenu a {
  padding-left: 2rem;
  font-size: 0.95rem;
}

/* SAIR */
.menu-suspenso .sair {
  background-color: #e74c3c;
  color: white;
  text-align: center;
  font-weight: bold;
}

.menu-suspenso .sair:hover {
  background-color: #c0392b;
}

/* ANIMAÇÕES */
.menu-fade-slide-enter-active,
.menu-fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-fade-slide-enter-from,
.menu-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* CONTEÚDO PRINCIPAL */
.conteudo-principal {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f4f4f4;
  min-height: calc(100vh - 120px); /* ajusta altura para tela cheia menos cabeçalho e rodapé */
}

/* RODAPÉ */
.rodape {
  background-color: #ddd;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: #333;
  box-shadow: 0 -1px 3px rgba(0,0,0,0.05);
}
</style>
