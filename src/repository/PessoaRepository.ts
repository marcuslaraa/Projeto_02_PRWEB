import { executaComandoSQL } from "../database/mysql"
import { Pessoa } from "../model/entity/Pessoa"

export class PessoaRepository {
  constructor() {
    this.createTable()
  }

  async createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS biblioteca.pessoas (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL
);
`
    try {
      const resultado = await executaComandoSQL(query, [])
      console.log("Query executada com sucesso:", resultado)
    } catch (err) {
      console.error("Error")
    }
  }

  async inserirPessoa(novaPessoa: Pessoa): Promise<Pessoa> {
    const query = `
        INSERT INTO biblioteca.pessoas (nome, email)
        VALUES (?, ?)`
    const values = [novaPessoa.nome, novaPessoa.email]
    try {
      const resultado = await executaComandoSQL(query, values)
      novaPessoa.id = resultado.insertId
      return new Promise<Pessoa>((resolve) => {
        resolve(novaPessoa)
      })
    } catch (err) {
      console.error("Erro ao inserir Pessoa:", err)
      throw err
    }
  }

  async consultarPessoaPorEmail(email: string) {
    const query = 'SELECT * FROM biblioteca.pessoas WHERE email = ?'
    try {
      const resultado = await executaComandoSQL(query, [email])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Pessoa>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async consultarPessoaPorId(id: number): Promise<Pessoa | null> {
    const query = 'SELECT * FROM biblioteca.pessoas WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Pessoa>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async deletarPessoaPorId(id: number): Promise<Pessoa> {
    const query = 'DELETE FROM biblioteca.pessoas WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      return new Promise<Pessoa>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao deletar.')
      throw err
    }
  }

  async atualizarPessoaPorId(novaPessoa: Pessoa, id: number): Promise<Pessoa> {
    const query = 'UPDATE biblioteca.pessoas SET nome = ?, email = ? WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [novaPessoa.nome, novaPessoa.email, id])
      return new Promise<Pessoa>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao atualizar.')
      throw err
    }
  }

  async listarPessoas(): Promise<Pessoa | null> {
    const query = 'SELECT * FROM biblioteca.pessoas'
    try {
      const resultado = await executaComandoSQL(query)
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Pessoa>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }
}
