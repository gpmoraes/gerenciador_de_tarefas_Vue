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
import TarefaLista from './components/TarefasLista.vue'

export default {
  components: {
    TarefaLista
  }
}
</script>