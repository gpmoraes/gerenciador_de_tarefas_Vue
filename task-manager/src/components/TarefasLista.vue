<template>
    <dir>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right"
                    @click="exibirFormulario = !exibirFormulario">
                    <i class="fa fa-plus mr-2"></i>
                    <span>Criar</span>
                </button>
            </div>
        </div>

        
        <ul class="list-group" v-if="tarefas.length > 0">
            <TarefaListaItem 
                v-for="tarefa in tarefas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao"/>
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            :tarefa="TarefaSelecionada"
            @criar="criarTarefa"/>

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
            tarefas:[],
            exibirFormulario: false,
            TarefaSelecionada: undefined
        }
    },
    created() {
        axios.get(`${config.apiURL}/tarefas`)
        .then((respose) => {
            console.log(respose)
            this.tarefas = respose.data
        })
    },
    methods: {
        criarTarefa(tarefa) {
            axios.post(`${config.apiURL}/tarefas`, tarefa)
            .then((response) => {
                console.log('POST /tarefas', response)
                this.tarefas.push(response.data)
                this.exibirFormulario = false
            })
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.TarefaSelecionada = tarefa
            this.exibirFormulario = true
        }
    }
}
</script>