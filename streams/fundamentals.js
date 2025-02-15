// REDABLE E WRITABLE STREAMS
process.stdin.pipe(process.stdout) // lendo (stdin) e escrevendo (stdout) o que o usuário digita, para ele ser lida aos poucos utiliza o '.pipe'

// CONSTRUIR STREAMS DO 0

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() { // Método obrigatório!
        const i = this.index++ // somando 1

        setTimeout(() => { // setando um tempo de 1 sec
        if (i > 100) {
            this.push(null) // o push é o método para uma readable stream fornecer informações para quem estiver consumindo ela
        } else {
            const buf = Buffer.from(String(i)) // Streams não aceitam tipos primitivos apenas buffer, convertendo i para uma string pois buffer não aceita number

            this.push(buf) // Se não chegou até 100, então executa
        }
        }, 1000)
    }
}

new OneToHundredStream().pipe(process.stdout) // lendo a stream e retornando o valor no terminal, mostrando os dados mesmo sem estar completo