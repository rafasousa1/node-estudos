export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => { // eliminando o ? da query e pegando o conteúdo com o split e o & para mais outras req 
        const [key, value] = param.split('=') // separando a query em 2 elementos

        queryParams[key] = value // a query no final com a chave recebendo o valor

        return queryParams
    }, {})
}