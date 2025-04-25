<!-- PainelPrincipal.vue -->

<template>
<div class="painel">
  <!-- CONTEÚDO PRINCIPAL -->
  <main class="conteudo">
    <section class="boas-vindas">
      <h2>PAINEL PRINCIPAL</h2>
    </section>

    <section class="cards">
      <CardSimplesVet />
    </section>
  </main>

</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obterDadosPainelFake } from '../utilitarios/servicoFake'
import CardSimplesVet from '../componentes/CardSimplesVet.vue'

const dadosPainel = ref(obterDadosPainelFake())

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
</script>

<style scoped>
.painel {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.conteudo {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f4f4f4;
}

.boas-vindas {
  margin-bottom: 2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.rodape {
  background-color: #ddd;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: #333;
  box-shadow: 0 -1px 3px rgba(0,0,0,0.05);
}
</style>
