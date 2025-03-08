export function buildRouteUrl(url) { // Crio uma função que recebe como parâmetro o caminho da rota, e na função crio o regex para identificar os route parameters
    const routeParametersRegex = /:([a-z,A-Z]+)/g

    console.log(Array.from(url.matchAll(routeParametersRegex)))
}