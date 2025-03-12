export function buildRouteUrl(url) { // crio uma função que recebe como parâmetro o caminho da rota, e na função crio o regex para identificar os route parameters
    const routeParametersRegex = /:([a-z,A-Z]+)/g   
    const urlWithParms = url.replaceAll(routeParametersRegex, '(?<$1>[a-z,0-9\-_]+)') // substituindo por uma string que é outro regex

    const urlRegex = new RegExp(`^${urlWithParms}(?<query>\\?(.*))?$`) // crio uma regex e dizendo que preciso que minha url, comece com a regex ^

    return urlRegex
}