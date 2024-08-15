export class Usuario {
  id: number
  idPessoa: number
  senha: string

  constructor(id: number, idPessoa: number, senha: string) {
    this.id = id || 0
    this.idPessoa = idPessoa
    this.senha = senha

    this.validate()
  }

  validate() {
    if (!this.idPessoa) throw new Error('idPessoa não informado.')
    if (!this.senha) throw new Error('Senha não informada.')
  }
}