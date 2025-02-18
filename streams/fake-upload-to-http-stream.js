// SIMULANDO UMA REQUISIÇÃO FICTÍCIA COM O FETCH

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable { // Lendo dados
    index = 1

    _read() { // Método obrigatório!
        const i = this.index++ // somando 1

        setTimeout(() => { // setando um tempo de 1 sec
        if (i > 5) {
            this.push(null) // o push é o método para uma readable stream fornecer informações para quem estiver consumindo ela
        } else {
            const buf = Buffer.from(String(i)) // Streams não aceitam tipos primitivos apenas buffer, convertendo i para uma string pois buffer não aceita number

            this.push(buf) // Se não chegou até 100, então executa
        }
        }, 1000)
    }
}

fetch('http://localhost:3334', { // Conectando com o servidor 3334 por uma requisição http
    method: 'POST', // fetch aceita apenas 'POST' ou 'PUT'
    body: new OneToHundredStream(), // Corpo da requisição, ou seja o que vai ser executado
    duplex: 'half' // a comunicação ocorre em uma única direção por vez
}).then(response => response.text()).then(data => { // Tratamento de erro
    console.log(data)
}).catch(err => {
    console.error(err)
})