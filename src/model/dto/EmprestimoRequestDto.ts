export class EmprestimoRequestDto {
  livroId: number
  usuarioId: number
  dataEmprestimo: Date
  dataDevolucao: Date

  constructor(livroId: number, usuarioId: number, dataEmprestimo: Date, dataDevolucao: Date) {
    this.livroId = livroId
    this.usuarioId = usuarioId
    this.dataEmprestimo = dataEmprestimo
    this.dataDevolucao = dataDevolucao
  }

}