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

const server = http.createServer(async (req, res) => { // TODAS AS PORTAS DE ENTRADA E SAÍDA NO NODE SÃO STREAMS
    const buffers = [] // Pedaços que irá receber da stream

    for await(const chunk of req) { // Percorrer a stream de req, aguardando cada pedaço da stream ser retornado
        buffers.push(chunk) // adicionando os pedaços da stream no array de buffers
    } // enquanto ela não le todos os dados (await) não será executado as linhas abaixo

    const fullStreamContent = Buffer.concat(buffers).toString() // Unindo todos os pedaços da stream em um único pedaço

    res.end(fullStreamContent) // mandando como retorno do server, o array dos buffers, e como body a stream do fetch

    // return req // reading
    // .pipe(new InverseNumberStream()) // transformiing
    // .pipe(res) // writing
})

server.listen(3334)