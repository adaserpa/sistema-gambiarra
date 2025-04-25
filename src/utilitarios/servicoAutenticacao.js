// src/utilitarios/servicoAutenticacao.js

import { useEstadoGlobal } from '../estadoGlobal/index'
import { useRouter } from 'vue-router'

export function logout() {
  const estadoGlobal = useEstadoGlobal()
  const router = useRouter()

  localStorage.removeItem('usuario')
  localStorage.removeItem('tipoUsuario')
  estadoGlobal.usuarioLogado.value = ''
  estadoGlobal.tipoUsuario.value = ''
  router.push('/')
}