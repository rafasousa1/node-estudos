import http from 'node:http' // O padrão de importações ESMODULES hoje em dia é mais utilizado. O node: antes do nome do módulo indica que é nativo do node
import { randomUUID} from 'node:crypto' // retornando um ID único
import { json } from './middlewares/json.js'
import { Database } from './database.js'

// req -> São todas as informações de requisição ou seja o que está chamando o servidodr
// res -> São as respostas que o servidor irá devolver para o usuário

const database = new Database() // Esta maneira de guardar informações em memória são aplicações stateful

const server = http.createServer(async (req, res) => { // Criando meu servidor HTTP com uma arrow function
    await json(req, res)

    const { method, url } = req // essas duas sendo métodos de REQUISIÇÃO

    if (method === 'GET' && url === '/users') { // Posso ter métodos HTTP diferentes mas com urls iguais
        const users = database.select('user') // Na listagem busco os usuários no database usando o select com o users para a variável
        return res.end(JSON.stringify(users)) // O node não pode retornar um array, então usamos o JSON para converter os dados para serem então mostrados na tela
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        const user = ({
            id: randomUUID(), // criando um id único para o user
            name,
            email,
        })

        database.insert('user', user) // inserindo o usuário com o insert

        return res.writeHead(201).end() // o 201 está simbolizando como OK, com sucesso na criação de algo
    }

    return res.writeHead(404).end() // O 404 simboliza que esta rota não existe
})

server.listen(3333) // Fazer com que o server escute na porta 3333 no localhost