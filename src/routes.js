import { Database } from "./database.js"
import { randomUUID} from 'node:crypto' // retornando um ID único aleatório

const database = new Database() // Esta maneira de guardar informações em memória são aplicações stateful
export const routes = [ // Array de cada rota com o método, o caminho e o que vai acontecer
    {
        method: 'GET',
        url: '/users',
        handler: (req, res) => { // no handler coloco o que é executado do método
            const users = database.select('user') // Na listagem busco os usuários no database usando o select com o users para a variável

            return res.end(JSON.stringify(users)) // O node não pode retornar um array, então usamos o JSON para converter os dados para serem então mostrados na tela
        }
    },
    {
        method: 'POST',
        url: '/users',
        handler: (req, res) => {
        const { name, email } = req.body

        const user = ({
            id: randomUUID(), // criando um id único para o user
            name,
            email,
        })

        database.insert('user', user) // inserindo o usuário com o insert

        return res.writeHead(201).end() // o 201 está simbolizando como OK, com sucesso na criação de algo
        }
    }
]