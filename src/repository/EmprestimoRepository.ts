import { executaComandoSQL } from '../database/mysql'
import { Emprestimo } from '../model/Emprestimo'

export class EmprestimoRepository {
  constructor() {
    this.createTable()
  }

  async createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS biblioteca.emprestimos (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      livroId INT NOT NULL,
      usuarioId INT NOT NULL,
      data_emprestimo DATE NOT NULL,
      data_devolucao DATE NOT NULL,
      FOREIGN KEY (livroId) REFERENCES biblioteca.livros(_id),
      FOREIGN KEY (usuarioId) REFERENCES biblioteca.usuarios(_id)
);
`
    try {
      const resultado = await executaComandoSQL(query, [])
      console.log("Query executada com sucesso:", resultado)
    } catch (err) {
      console.error("Error")
    }
  }

  async inserirEmprestimo(novoEmprestimo: Emprestimo): Promise<Emprestimo> {
    const query = `
        INSERT INTO biblioteca.emprestimos (livroId, usuarioId, data_emprestimo, data_devolucao)
        VALUES (?, ?, ?, ?)`
    const values = [novoEmprestimo.livroId, novoEmprestimo.usuarioId, novoEmprestimo.dataEmprestimo, novoEmprestimo.dataDevolucao]
    try {
      const resultado = await executaComandoSQL(query, values)
      novoEmprestimo.id = resultado.insertId
      return new Promise<Emprestimo>((resolve) => {
        resolve(novoEmprestimo)
      })
    } catch (err) {
      console.error("Erro ao inserir emprestimo:", err)
      throw err
    }
  }

  async consultarEmprestimoPorID(id: number): Promise<Emprestimo | null> {
    const query = 'SELECT * FROM biblioteca.emprestimos WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Emprestimo>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async deletarEmprestimoPorId(id: number): Promise<Emprestimo> {
    const query = 'DELETE FROM biblioteca.emprestimos WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      return new Promise<Emprestimo>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao deletar.')
      throw err
    }
  }

  async atualizarEmprestimoPorId(novoEmprestimo: Emprestimo, id: number): Promise<Emprestimo> {
    const query = 'UPDATE biblioteca.emprestimos SET data_devolucao = ? WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [novoEmprestimo.dataDevolucao, id])
      return new Promise<Emprestimo>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao atualizar.')
      throw err
    }
  }

  async listarLivros(): Promise<Emprestimo | null> {
    const query = 'SELECT * FROM biblioteca.emprestimos'
    try {
      const resultado = await executaComandoSQL(query)
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Emprestimo>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }
}