export interface IEmprestimo {
  id: number
  livroId: number,
  usuarioId: number,
  dataEmprestimo: string
  dataDevolucao: string
}