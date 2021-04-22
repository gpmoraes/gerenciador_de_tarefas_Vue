import axios from 'axios'
import config from './config/config'

//================ Forma 01 ==========================
// Uma das for mas que pode ser usada

// axios.defaults.baseURL = config.apiURL
// export default axios

//================ Forma 02 ==========================
// Pode ser configurado dessa forma, aqui não é necessário utilizar o export default
// Recebe um objeto com as configurações que se deseja setar

// export default axios.create({
//     baseURL: config.apiURL
// })

//================ Forma 03 ==========================
// Criase uma nova instancia do axios para que possa ser utilizada
// Com isso a configuração pode ser feita em outras partes da aplicação 

const instace = axios.create({})
instace.defaults.baseURL = config.apiURL

// É possível interceptar requisições, antes de serem enviadas para o servidor e
// por exemplo, podemos mudar, inserir informeções nas requisições
instace.interceptors.request.use(config => {

    console.log('Interceptando requisição: ', config)
   
    config.data = {
        ...config.data,
        insertedInfo: 'Dado inserido na interceptação.' 
    }

    //Se caso a api necessite de autenticação pode ser necessário inserir um 
    // cabecalho com as informações, ela será adicionada a todas as requisições do axios

    config.headers.common['Autorization'] = `Bearer tolken_jwt`
    // Adicionando a um tipo de requisição 
    config.headers.put['Meu-cabecalho'] = `Cabecalho customizado`
   
    // return config
    return new Promise((resolve) => {
        console.log('Fazendo requisição aguardar...')
        setTimeout(() => {
            console.log('Enviando requisição...')
            resolve(config)
        }, 2000)
    })
}, error => {
    console.log('Erro ao realizar requisição: ', error)
    return Promise.reject(error)
})

// Interceptadores pondem ser utilizados para respostas, aqui pegamos os dados
// antes que eles cheguem na aplicação

// instace.interceptors.response.use(response => {
//     console.log('Interceptando resposta', response)
//     if (Array.isArray(response.data)) {
//         response.data = response.data.slice(1, 3)
//     }
//     return response
// }, error => {
//     console.log('Erro capturado na responsta: ', error)
//     return Promise.reject(error)
// })

export default instace