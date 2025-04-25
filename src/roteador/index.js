import { createRouter, createWebHistory } from 'vue-router'
import TelaLogin from '../telas/TelaLogin.vue'
import PainelPrincipal from '../telas/PainelPrincipal.vue'
import GerarBoletos from '../telas/GerarBoletos.vue' // 👈 mover pra cima
import { useEstadoGlobal } from '../estadoGlobal/index'

const rotas = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: TelaLogin },
  {
    path: '/painel',
    component: PainelPrincipal,
    beforeEnter: (to, from, next) => {
      const estado = useEstadoGlobal()
      estado.usuarioLogado.value ? next() : next('/login')
    }
  },
  { path: '/gerar-boletos', component: GerarBoletos } // ✅ novo caminho
]

export const router = createRouter({
  history: createWebHistory(),
  routes: rotas
})
