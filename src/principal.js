// src/principal.js
import { createApp } from 'vue'
import Aplicativo from './Aplicativo.vue'
import { router } from './roteador/index'
import './style.css'

createApp(Aplicativo)
  .use(router)
  .mount('#app')
