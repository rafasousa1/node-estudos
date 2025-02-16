// REDABLE E WRITABLE STREAMS
process.stdin.pipe(process.stdout) // lendo (stdin) e escrevendo (stdout) o que o usuário digita, para ele ser lida aos poucos utiliza o '.pipe'

// CONSTRUIR STREAMS DO 0

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable { // Lendo dados
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

 class InverseNumberStream extends Transform { // Transformando uma chunk em outra
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1 // Pegando o chunk e fazendo . -1 para ficar negativo

        callback(null, Buffer.from(String(transformed))) // 1° parâmetro do callback é em caso de erro / 2° parâmetro é a transformação (lembra de colocar em buffer)
    }
 }

class MultiplyByTenStream extends Writable { // Processa dados enquanto o arquivo é lido, não retorna nada
    _write(chunk, encoding, callback) { // Método obrigatório!
        console.log(Number(chunk.toString()) * 10) // Pegando o buffer e convertendo para string para mostrar no termial
        callback() // finalizando
    }
}


new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream()) // lendo a stream e escrevendo os dados da stream de escrita, neste caso pegando os nums e multiplicando por 10