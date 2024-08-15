export class Emprestimo {
  id: number
  livroId: number
  usuarioId: number
  dataEmprestimo: Date
  dataDevolucao: Date

  constructor(id: number, livroId: number, usuarioId: number, dataEmprestimo: Date, dataDevolucao: Date) {
    this.id = id || 0
    this.livroId = livroId
    this.usuarioId = usuarioId
    this.dataEmprestimo = dataEmprestimo
    this.dataDevolucao = dataDevolucao

    this.validade()
  }

  validade() {
    if (!this.livroId) throw new Error('livroId não informado.')
    if (!this.usuarioId) throw new Error('usuarioId não informado.')
    if (!this.dataEmprestimo) throw new Error('Data de emprestimo não informado.')
    if (!this.dataDevolucao) throw new Error('Data de devolução não informada.')
  }
}