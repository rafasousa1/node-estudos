import http from 'node:http' // O padrão de importações ESMODULES hoje em dia é mais utilizado. O node: antes do nome do módulo indica que é nativo do node
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// req -> São todas as informações de requisição ou seja o que está chamando o servidodr
// res -> São as respostas que o servidor irá devolver para o usuário


const server = http.createServer(async (req, res) => { // Criando meu servidor HTTP com uma arrow function
    await json(req, res)

    const { method, url } = req // essas duas sendo métodos de REQUISIÇÃO

    const route = routes.find(route => { // Verifico se a rota requisitada tem o método igual ao que foi solicitado, e a url igual a que foi solicitada
        return route.method === method && route.url === url
    })

    if (route) {
        return route.handler(req, res) // Se a rota for encontrada então executa o handler
    }


    return res.writeHead(404).end() // O 404 simboliza que esta rota não existe
})

server.listen(3333) // Fazer com que o server escute na porta 3333 no localhost