import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform { // Transformando uma chunk em outra
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1 // Pegando o chunk e fazendo . -1 para ficar negativo

        console.log(transformed)

        callback(null, Buffer.from(String(transformed))) // 1° parâmetro do callback é em caso de erro / 2° parâmetro é a transformação (lembra de colocar em buffer)
    }
 }
 
// req => Readable Stream
// res => Writable Stream

const server = http.createServer((req, res) => { // TODAS AS PORTAS DE ENTRADA E SAÍDA NO NODE SÃO STREAMS
    return req // reading
    .pipe(new InverseNumberStream()) // transformiing
    .pipe(res) // writing
})

server.listen(3334)