<template>
    <dir>
        <h1 class="font-weight-light">Lista de Tarefas</h1>
        <ul class="list-group" v-if="tarefas.length > 0">
            <TarefaListaItem 
                v-for="tarefa in tarefas"
                :key="tarefa.id"
                :tarefa="tarefa"/>
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar/>

    </dir>
</template>

<script>
import axios from 'axios'

import config from './../config/config'
import TarefaSalvar from './TarefaSalvar.vue'
import TarefaListaItem from './TarefasListaIten.vue'

export default {
    components: {
        TarefaSalvar,
        TarefaListaItem
    },
    data() {
        return {
            tarefas:[]
        }
    },
    created() {
        axios.get(`${config.apiURL}/tarefas`)
        .then((respose) => {
            console.log(respose)
            this.tarefas = respose.data
        })
    }
}
</script>