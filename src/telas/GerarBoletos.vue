<!-- GerarBoletos.vue -->

<template>
<div class="gerar-boletos">
  <h2>🧾 Gerar Novos Boletos</h2>

  <!-- Barra de Progresso -->
  <div class="barra-progresso-wizard">
    <div v-for="n in 5" :key="n" class="etapa">
      <div class="bolinha" :class="{ ativo: etapaAtual >= n, atual: etapaAtual === n }">
        {{ n <= 4 ? n : '✔' }}
      </div>
      <div v-if="n < 5" class="traco" :class="{ ativo: etapaAtual > n }"></div>
    </div>
  </div>

  <!-- Etapas -->
  <div v-if="etapaAtual === 1">
    <h3>1️⃣ Buscar Tutor</h3>
    <input v-model="busca.nome" placeholder="Nome do tutor" />
    <input v-model="busca.cpf" placeholder="CPF" />
    <input v-model="busca.codigo" placeholder="Código do Tutor (SimplesVet)" />
    <button @click="buscarTutor" :disabled="!busca.nome && !busca.cpf && !busca.codigo">Buscar</button>
  </div>

  <div v-if="etapaAtual === 2">
    <h3>2️⃣ Confirmar Tutor</h3>
    <p><strong>Nome:</strong> {{ tutor.nome }}</p>
    <p><strong>CPF:</strong> {{ tutor.cpf }}</p>

    <div v-if="animais.length > 1">
      <label>Selecione o animal:</label>
      <select v-model="form.animal">
        <option v-for="animal in animais" :key="animal.id" :value="animal.id">
          {{ animal.nome }}
        </option>
      </select>
    </div>

    <div class="botoes">
      <button @click="etapaAtual = 1">← Voltar</button>
      <button @click="irParaEtapa(3)" :disabled="!form.animal">Próximo</button>
    </div>
  </div>

  <div v-if="etapaAtual === 3">
    <h3>3️⃣ Preencher Dados do Boleto</h3>

    <label>Serviço:</label>
    <input v-model="form.servico" />

    <label>Tipo de Contribuinte:</label>
    <select v-model="form.tipo">
      <option disabled value="">Selecione...</option>
      <option value="Físico">Físico</option>
      <option value="Jurídico">Jurídico</option>
    </select>

    <label>Valor principal (R$):</label>
    <input v-model.number="form.valor" type="number" />

    <label>Desconto (R$):</label>
    <input v-model.number="form.desconto" type="number" />

    <label>Parcelas:</label>
    <input v-model.number="form.parcelas" type="number" min="1" />

    <label>Vencimento da 1ª parcela:</label>
    <select v-model="form.vencimento">
      <option disabled value="">Selecione...</option>
      <option v-for="data in opcoesVencimento" :key="data" :value="data">{{ data }}</option>
    </select>

    <div class="botoes">
      <button @click="etapaAtual = 2">← Voltar</button>
      <button @click="gerarPrevia" :disabled="!form.servico || !form.tipo || !form.valor || !form.parcelas || !form.vencimento">Visualizar</button>
    </div>
  </div>

  <div v-if="etapaAtual === 4">
    <h3>4️⃣ Pré-visualização dos Boletos</h3>
    <table>
      <thead>
        <tr>
          <th>Parcela</th>
          <th>Vencimento</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(parcela, i) in preview" :key="i">
          <td>{{ parcela.numero }}</td>
          <td>{{ parcela.vencimento }}</td>
          <td>R$ {{ parcela.valor.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="botoes">
      <button @click="etapaAtual = 3">← Voltar</button>
      <button @click="confirmarGeracao">Confirmar e Gerar</button>
    </div>
  </div>

  <div v-if="etapaAtual === 5">
    <h3>✅ Boletos Gerados com Sucesso!</h3>
    <button @click="resetarWizard">Gerar Novos Boletos</button>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const etapaAtual = ref(1)
const busca = ref({ nome: '', cpf: '', codigo: '' })
const tutor = ref({ nome: '', cpf: '' })
const animais = ref([])
const form = ref({
animal: '',
servico: '',
tipo: '',
valor: 0,
desconto: 0,
parcelas: 1,
vencimento: ''
})
const opcoesVencimento = [
'15/05/2025', '31/05/2025', '15/06/2025', '30/06/2025'
]
const preview = ref([])

function buscarTutor() {
tutor.value = { nome: 'Maria da Silva', cpf: '123.456.789-00' }
animais.value = [
  { id: '1', nome: 'Totó' },
  { id: '2', nome: 'Rex' }
]
form.value.animal = animais.value[0].id
etapaAtual.value = 2
}

function irParaEtapa(numero) {
etapaAtual.value = numero
}

function gerarPrevia() {
const parcelas = []
const valorParcela = (form.value.valor - form.value.desconto) / form.value.parcelas
for (let i = 0; i < form.value.parcelas; i++) {
  parcelas.push({
    numero: `${i + 1}/${form.value.parcelas}`,
    vencimento: form.value.vencimento,
    valor: valorParcela
  })
}
preview.value = parcelas
etapaAtual.value = 4
}

function confirmarGeracao() {
etapaAtual.value = 5
}

function resetarWizard() {
etapaAtual.value = 1
busca.value = { nome: '', cpf: '', codigo: '' }
form.value = {
  animal: '', servico: '', tipo: '', valor: 0,
  desconto: 0, parcelas: 1, vencimento: ''
}
preview.value = []
}
</script>

<style scoped>
.gerar-boletos {
max-width: 700px;
margin: auto;
background: white;
padding: 2rem;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
font-family: 'Segoe UI', sans-serif;
}

h2, h3 {
margin-bottom: 1rem;
color: #005c38;
}

.barra-progresso-wizard {
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 2rem;
flex-wrap: wrap;
}

.etapa {
display: flex;
align-items: center;
}

.bolinha {
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #ccc;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
font-size: 1.1rem;
transition: background-color 0.3s, transform 0.3s;
}

.bolinha.ativo {
background-color: #005c38;
}

.bolinha.atual {
background-color: #00724e;
transform: scale(1.2);
animation: pulse 1.5s infinite;
}

@keyframes pulse {
0% { box-shadow: 0 0 0 0 rgba(0, 114, 78, 0.7); }
70% { box-shadow: 0 0 0 8px rgba(0, 114, 78, 0); }
100% { box-shadow: 0 0 0 0 rgba(0, 114, 78, 0); }
}

.traco {
width: 40px;
height: 4px;
background-color: #ccc;
transition: background-color 0.3s;
}

.traco.ativo {
background-color: #005c38;
}

input, select {
display: block;
margin: 0.5rem 0 1rem;
width: 100%;
padding: 0.5rem;
border-radius: 4px;
border: 1px solid #ccc;
}

button {
background: #005c38;
color: white;
border: none;
padding: 0.6rem 1.2rem;
border-radius: 4px;
cursor: pointer;
font-weight: bold;
transition: background 0.2s;
}

button:hover:not(:disabled) {
background: #00724e;
}

button:disabled {
background-color: #999;
cursor: not-allowed;
}

.botoes {
margin-top: 1rem;
display: flex;
gap: 1rem;
flex-wrap: wrap;
}

table {
width: 100%;
border-collapse: collapse;
margin-top: 1rem;
}

th, td {
padding: 0.5rem;
border: 1px solid #ccc;
text-align: center;
}

@media (max-width: 600px) {
.barra-progresso-wizard {
  flex-direction: row;
  flex-wrap: wrap;
}
.traco {
  width: 20px;
}
.bolinha {
  width: 28px;
  height: 28px;
  font-size: 1rem;
}
}
</style>