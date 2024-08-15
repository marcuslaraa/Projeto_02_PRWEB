import { executaComandoSQL } from "../database/mysql"
import { Usuario } from "../model/entity/Usuario"

export class UsuarioRepository {
  constructor() {
    this.createTable()
  }

  async createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS biblioteca.usuarios (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    idPessoa INT NOT NULL,
    senha VARCHAR(50) NOT NULL,
    FOREIGN KEY (idPessoa) REFERENCES biblioteca.pessoas(_id)
);

`
    try {
      const resultado = await executaComandoSQL(query, [])
      console.log("Query executada com sucesso:", resultado)
    } catch (err) {
      console.error("Error")
    }
  }

  async inserirUsuario(novoUsuario: Usuario): Promise<Usuario> {
    const query = `
        INSERT INTO biblioteca.usuarios (idPessoa, senha)
        VALUES (?, ?)`
    const values = [novoUsuario.idPessoa, novoUsuario.senha]
    try {
      const resultado = await executaComandoSQL(query, values)
      novoUsuario.id = resultado.insertId
      return new Promise<Usuario>((resolve) => {
        resolve(novoUsuario)
      })
    } catch (err) {
      console.error("Erro ao inserir Usuario:", err)
      throw err
    }
  }

  async consultarUsuarioPorId(id: number): Promise<Usuario | null> {
    const query = 'SELECT * FROM biblioteca.usuarios WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Usuario>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }

  async deletarUsuarioPorId(id: number): Promise<Usuario> {
    const query = 'DELETE FROM biblioteca.usuarios WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [id])
      return new Promise<Usuario>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao deletar.')
      throw err
    }
  }

  async atualizarUsuarioPorId(novaPessoa: Usuario, id: number): Promise<Usuario> {
    const query = 'UPDATE biblioteca.usuarios SET idPessoa = ?, senha = ? WHERE _id = ?'
    try {
      const resultado = await executaComandoSQL(query, [novaPessoa.idPessoa, novaPessoa.senha, id])
      return new Promise<Usuario>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha ao atualizar.')
      throw err
    }
  }

  async listarUsuarios(): Promise<Usuario | null> {
    const query = 'SELECT * FROM biblioteca.usuarios'
    try {
      const resultado = await executaComandoSQL(query)
      if (resultado.length === 0) {
        return null
      }
      return new Promise<Usuario>((resolve) => {
        resolve(resultado)
      })
    } catch (err: any) {
      console.error('Falha na busca.')
      throw err
    }
  }
}
