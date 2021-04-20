<template>
    <dir>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right"
                    @click="exibirFormularioCriarTarefa">
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
                @editar="selecionarTarefaParaEdicao"
                @deletar="deletarTarefa"
                @concluir="editarTarefa"/>
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            :tarefa="TarefaSelecionada"
            @criar="criarTarefa"
            @editar="editarTarefa"/>

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
        .then((response) => {
            console.log('GET /tarefas', response)
            this.tarefas = response.data
        })
    },
    methods: {
        criarTarefa(tarefa) {
            axios.post(`${config.apiURL}/tarefas`, tarefa)
            .then((response) => {
                console.log('POST /tarefas', response)
                this.tarefas.push(response.data)
                this.resetar()
            })
        },
        editarTarefa(tarefa) {
            console.log('Editar: ', tarefa)
            axios.put(`${config.apiURL}/tarefas/${tarefa.id}`, tarefa)
            .then(response => {
                console.log(`PUT /tarefas/${tarefa.id}`, response)
                const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                this.tarefas.splice(indice, 1, tarefa)
                this.resetar()
            })
        },
        deletarTarefa(tarefa) {
            const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
            if(confirmar) {
                axios.delete(`${config.apiURL}/tarefas/${tarefa.id}`)
                .then(response => {
                    console.log(`DELETE /tarefas/${tarefa.id}`, response)
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                    this.tarefas.splice(indice, 1)
                })
            }
        },
        exibirFormularioCriarTarefa() {
            if (this.TarefaSelecionada) {
                this.TarefaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        resetar() {
            this.TarefaSelecionada = undefined
            this.exibirFormulario = false
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.TarefaSelecionada = tarefa
            this.exibirFormulario = true
        }
    }
}
</script>