export class Database {
    #database = {} // O '#' é para sinalizar que não consigo passar acessando o database como "databse.database" tornando uma propriedade privada

    insert(table, data) { // O método insert recebe a tabela do banco de dados e os dados que vai inserir
        if (Array.isArray(this.#database[table])) { // verifico se ja tem alguma coisa na tabela, então só adicionar, senão devo criar um array.
            this.#database[table].push(data) // dar um push adicionando um novo item
        } else {
            this.#database[table] = [data] // senão crio um novo array com o item ali dentro
        }

        return data
    }

    select(table) { // O select passa a tabela que vai usar retornando todos os dados desta tabela
        const data = this.#database[table] ?? [] // passo então a tabela selecionada e se não existir passa vazio.

        return data
    }
}