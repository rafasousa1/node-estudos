import http from 'node:http' // O padrão de importações ESMODULES hoje em dia é mais utilizado. O node: antes do nome do módulo indica que é nativo do node

// req -> São todas as informações de requisição ou seja o que está chamando o servidodr
// res -> São as respostas que o servidor irá devolver para o usuário

const users = [] // Esta maneira de guardar informações em memória são aplicações stateful

const server = http.createServer(async (req, res) => { // Criando meu servidor HTTP com uma arrow function
    const buffers = [] // Pedaços que irá receber da stream

    for await(const chunk of req) { // Percorrer a stream de req, aguardando cada pedaço da stream ser retornado
        buffers.push(chunk) // adicionando os pedaços da stream no array de buffers
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()) // Colocando o corpo da requisição como um JSON
    } catch {
        req.body = null // Caso se não ter um corpo na requisição, ele retorna como null 
    }
    
    console.log(req.body)
    
    const { method, url } = req // essas duas sendo métodos de REQUISIÇÃO

    if (method === 'GET' && url === '/users') { // Posso ter métodos HTTP diferentes mas com urls iguais
        return res
        .setHeader('Content-type', 'application/JSON') // setando um header para o programa interpretar e retornar o valor em uma estrutura de dados
        .end(JSON.stringify(users)) // O node não pode retornar um array, então usamos o JSON para converter os dados para serem então mostrados na tela
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })
 
        return res.writeHead(201).end() // o 201 está simbolizando como OK, com sucesso na criação de algo
    }

    return res.writeHead(404).end() // O 404 simboliza que esta rota não existe
})

server.listen(3333) // Fazer com que o server escute na porta 3333 no localhost