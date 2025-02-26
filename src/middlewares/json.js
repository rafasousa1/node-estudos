export async function json(req, res) {
    const buffers = [] // Pedaços que irá receber da stream

    for await(const chunk of req) { // Percorrer a stream de req, aguardando cada pedaço da stream ser retornado
        buffers.push(chunk) // adicionando os pedaços da stream no array de buffers
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()) // Colocando o corpo da requisição como um JSON
    } catch {
        req.body = null // Caso se não ter um corpo na requisição, ele retorna como null 
    }
    
    res.setHeader('Content-type', 'application/JSON') // Lidando com o JSON em resposta no próprio middleware
}