import { executaComandoSQL } from "../database/mysql"
import { Livro } from "../model/Livro"

export class LivroRepository {
  constructor() {
    this.createTable()
  }

  async createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS biblioteca.livros (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(50) NOT NULL,
      autor VARCHAR(50) NOT NULL,
      categoriaId INT NOT NULL,
      FOREIGN KEY (categoriaId) REFERENCES biblioteca.categorias(_id)
);
`
    try {
      const resultado = await executaComandoSQL(query, [])
      console.log("Query executada com sucesso:", resultado)
    } catch (err) {
      console.error("Error")
    }
  }

  async inserirLivro(novoLivro: Livro): Promise<Livro> {
    const query = `
        INSERT INTO biblioteca.livros (titulo, autor, categoriaId)
        VALUES (?, ?, ?)`
    const values = [novoLivro.titulo, novoLivro.autor, novoLivro.categoriaId]
    try {
      const resultado = await executaComandoSQL(query, values)
      novoLivro.id = resultado.insertId
      return new Promise<Livro>((resolve) => {
        resolve(novoLivro)
      })
    } catch (err) {
      console.error("Erro ao inserir livro:", err)
      throw err
    }
  }

  async consultarLivroPorTitulo(titulo: string) {
    const query = 'SELECT * FROM biblioteca.livros WHERE titulo = ?'
    try {
      const resultado = await executaComandoSQL(query, [titulo])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Livro>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async consultarLivroPorID(id: number): Promise<Livro | null> {
    const query = 'SELECT * FROM biblioteca.livros WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Livro>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async deletarLivroPorId(id: number): Promise<Livro> {
    const query = 'DELETE FROM biblioteca.livros WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      return new Promise<Livro>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao deletar.')
      throw err
    }
  }

  async atualizarLivroPorId(novoLivro: Livro, id: number): Promise<Livro> {
    const query = 'UPDATE biblioteca.livros SET titulo = ?, autor = ? WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [novoLivro.titulo, novoLivro.autor, id])
      return new Promise<Livro>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao atualizar.')
      throw err
    }
  }

  async listarLivros(): Promise<Livro | null> {
    const query = 'SELECT * FROM biblioteca.livros'
    try {
      const resultado = await executaComandoSQL(query)
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Livro>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }
}
