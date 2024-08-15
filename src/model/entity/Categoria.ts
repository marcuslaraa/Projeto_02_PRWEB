export class Categoria {
  id: number
  nome: string

  constructor(id: number, nome: string) {
    this.id = id || 0
    this.nome = nome

    this.validade()
  }

  validade() {
    if (!this.nome) throw new Error("Nome da categoria não inserido.")
  }
}
