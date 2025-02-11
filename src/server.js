import http from 'node:http' // O padrão de importações ESMODULES hoje em dia é mais utilizado

// req -> São todas as informações de requisição ou seja o que está chamando o servidodr
// res -> São as respostas que o servidor irá devolver para o usuário

const users = [] // Esta maneira de guardar informações em memória são aplicações stateful

const server = http.createServer((req, res) => { // Criando meu servidor HTTP com uma arrow function
    
    const { method, url } = req // essas duas sendo métodos de REQUISIÇÃO

    if(method === 'GET' && url === '/users') { // Posso ter métodos HTTP diferentes mas com urls iguais
        return res
        .setHeader('Content-type', 'application/JSON') // setando um header para o programa interpretar e retornar o valor em uma estrutura de dados
        .end(JSON.stringify(users)) // O node não pode retornar um array, então usamos o JSON para converter os dados para serem então mostrados na tela
    }

    if(method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Cleyton',
            email: 'cleyton@email.com'
        })
 
        return res.end('Criação de usuários') // Cada método com seu resultado
    }

    return res.end('Hello, World!') // Se não bater em nenhum destes métodos retorna então essa response
})

server.listen(3333) // Fazer com que o server escute na porta 3333 no localhost