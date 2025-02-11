import http from 'node:http' // O padrão de importações ESMODULES hoje em dia é mais utilizado

// req -> São todas as informações de requisição ou seja o que está chamando o servidodr
// res -> São as respostas que o servidor irá devolver para o usuário

const server = http.createServer((req, res) => { // Criando meu servidor HTTP com uma arrow function
    const { method, url } = req // essas duas sendo métodos de REQUISIÇÃO

    if(method === 'GET' && url === '/users') { // Posso ter métodos HTTP diferentes mas com urls iguais
        return res.end('Lista de usuários') 
    }

    if(method === 'POST' && url === '/users') {
        return res.end('Criação de usuários') // Cada método com seu resultado
    }

    return res.end('Hello, World!')
})

server.listen(3333) // Fazer com que o server escute na porta 3333 no localhost