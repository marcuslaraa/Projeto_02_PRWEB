export class UsuarioRequestDto {
  idPessoa: number
  senha: string

  constructor(idPessoa: number, senha: string) {
    this.idPessoa = idPessoa
    this.senha = senha
  }
}