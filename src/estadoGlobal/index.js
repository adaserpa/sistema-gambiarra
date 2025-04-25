import { ref } from 'vue'

const usuarioLogado = ref(null)
const tipoUsuario = ref(null)

export function useEstadoGlobal() {
  return {
    usuarioLogado,
    tipoUsuario
  }
}
