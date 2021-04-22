<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisições HTTP no Vue</h1>
        <p class="lead">Usando a biblioteca Axios para fazer chamadas Ajax á uma API REST</p>
      </div>
    </div>
    <div class="container">

      <TarefaLista />

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from './config/config'

import TarefaLista from './components/TarefasLista.vue'

export default {
  components: {
    TarefaLista
  },
  async created() {
    // Primeira forma de realizar requisições simultaneas
    // axios.all([
    //   axios.get(`${config.apiURL}/tarefas/1`),
    //   axios.get(`${config.apiURL}/tarefas/3`)
    // ]).then(axios.spread((tarefa1, tarefa3) => {
    //   console.log('Tarefas simultaneas: ')
    //   console.log('Tarefa 1: ', tarefa1)
    //   console.log('Tarefa 3: ', tarefa3)
    // }))

    // Segunda forma de realizar as requisições simultaneas
    // axios.all([
    //   axios.get(`${config.apiURL}/tarefas/1`),
    //   axios.get(`${config.apiURL}/tarefas/3`)
    // ]).then(response => {
    //   const [tarefa1, tarefa3] = response
    // })

    const tarefa1 = await axios.get(`${config.apiURL}/tarefas/1`)
    const tarefa3 = await axios.get(`${config.apiURL}/tarefas/3`)
    console.log('Tarefas simultaneas: ')
    console.log('Tarefa 1: ', tarefa1)
    console.log('Tarefa 3: ', tarefa3)
  }
}
</script>