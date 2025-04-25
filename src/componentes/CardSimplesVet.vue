<template>
<details class="card-colapsavel">
  <summary><strong>SimplesVet</strong></summary>
  <div class="conteudo">
    <p><strong>Tutores cadastrados:</strong> {{ dados.tutores }}</p>
    <p><strong>Tutores arquivados:</strong> {{ dados.arquivados }}</p>
    <p><strong>Animais ativos:</strong> {{ dados.animais }}</p>
    <p><strong>Atividade:</strong> {{ percentualAtivo }}% ativos</p>
  </div>
</details>
</template>

<script setup>
import { ref, computed } from 'vue'
import { obterDadosPainelSimplesVet } from '../utilitarios/servicoFake'

const dados = ref(obterDadosPainelSimplesVet())

const percentualAtivo = computed(() => {
const total = dados.value.tutores + dados.value.arquivados
return total ? Math.round((dados.value.tutores / total) * 100) : 0
})
</script>

<style scoped>
.card-colapsavel {
background: white;
padding: 1.5rem;
border-radius: 8px;
box-shadow: 0 2px 6px rgba(0,0,0,0.1);
margin-bottom: 1.5rem;
font-size: 1rem;
}

.card-colapsavel summary {
cursor: pointer;
font-size: 1.1rem;
color: #005c38;
margin-bottom: 1rem;
}

.card-colapsavel[open] summary {
font-weight: bold;
}

.conteudo p {
margin: 0.5rem 0;
}
</style>
