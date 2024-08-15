import { executaComandoSQL } from "../database/mysql"
import { Categoria } from "../model/entity/Categoria"

export class CategoriaRepository {
  constructor() {
    this.createTable()
  }

  async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.categoria (
            _id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL
        )`
    try {
      const resultado = await executaComandoSQL(query, [])
      console.log("Query executada com sucesso:", resultado)
    } catch (err) {
      console.error("Error")
    }
  }

  async insertUser(novaCategoria: Categoria): Promise<Categoria> {
    const query = `
        INSERT INTO biblioteca.categoria (nome)
        VALUES (?)`
    const values = [novaCategoria.nome]
    try {
      const resultado = await executaComandoSQL(query, values)
      novaCategoria.id = resultado.insertId
      return new Promise<Categoria>((resolve) => {
        resolve(novaCategoria)
      })
    } catch (err) {
      console.error("Erro ao inserir o usuário:", err)
      throw err
    }
  }

  async consultarCategoriaPorNome(nome: string) {
    const query = 'SELECT * FROM biblioteca.categoria WHERE nome = ?'
    try {
      const resultado = await executaComandoSQL(query, [nome])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Categoria>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async consultarCategoriaPorID(id: number): Promise<Categoria | null> {
    const query = 'SELECT * FROM biblioteca.categoria WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Categoria>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async deletarCategoriaPorId(id: number): Promise<Categoria> {
    const query = 'DELETE FROM biblioteca.categoria WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      return new Promise<Categoria>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao deletar.')
      throw err
    }
  }

  async atualizarCategoriaPorId(novaCategoria: Categoria, id: number): Promise<Categoria> {
    const query = 'UPDATE biblioteca.categoria SET nome = ? WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [novaCategoria.nome, id])
      return new Promise<Categoria>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao atualizar.')
      throw err
    }
  }

  async listarCategorias(): Promise<Categoria | null> {
    const query = 'SELECT * FROM biblioteca.categoria'
    try {
      const resultado = await executaComandoSQL(query)
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Categoria>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }
}
