import fs from 'node:fs/promises'
const dataBasePath = new URL('../db.json', import.meta.url) // Passando a extensão do arquivo e o diretório para salvar

export class Database {
    #database = {} // O '#' é para sinalizar que não consigo passar acessando o database como "databse.database" tornando uma propriedade privada

    constructor() {
        fs.readFile(dataBasePath, 'utf8').then(data => { // passo o databasePath como parâmetro para ler o caminho do arquivo e ‘utf8’
            this.#database = JSON.parse(data) // uso o then para quando ler tudo, pegar os dados e salvar no bd como JSON
        }).catch(() => {
            this.#persist() // Se não existir mesmo assim, persiste para criar o arquivo, mas vazio
        })
    }

    #persist() { // o persist permite que eu escreva o arquivo do banco de dados em um arquivo físico
        fs.writeFile(dataBasePath, JSON.stringify(this.#database)) // 1 nome do arquivo e onde será criado e escrevendo como JSON
    }

    insert(table, data) { // O método insert recebe a tabela do banco de dados e os dados que vai inserir
        if (Array.isArray(this.#database[table])) { // verifico se ja tem alguma coisa na tabela, então só adicionar, senão devo criar um array.
            this.#database[table].push(data) // dar um push adicionando um novo item
        } else {
            this.#database[table] = [data] // senão crio um novo array com o item ali dentro
        }

        this.#persist() // é chamado toda vez que insiro algo no banco, para salvar

        return data
    }

    select(table) { // O select passa a tabela que vai usar retornando todos os dados desta tabela
        const data = this.#database[table] ?? [] // passo então a tabela selecionada e se não existir passa vazio.

        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}