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

export default instace