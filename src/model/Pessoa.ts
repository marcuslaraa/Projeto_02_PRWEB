export class Pessoa {
  id: number
  nome: string
  email: string

  constructor(id: number, nome: string, email: string) {
    this.id = id || 0
    this.nome = nome
    this.email = email

    this.validate()
  }


  validate() {
    if (!this.nome) throw new Error('Nome não inserido.')
    if (!this.email) throw new Error('Emaiil não informado.')
  }
}