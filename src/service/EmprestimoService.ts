import { Emprestimo } from "../model/Emprestimo"
import { EmprestimoRepository } from '../repository/EmprestimoRepository'
import { LivroRepository } from '../repository/LivroRepository'
import { UsuarioRepository } from '../repository/UsuarioRepository'

export class EmprestimoService {

  emprestimoRepository = new EmprestimoRepository()
  livroRepository = new LivroRepository()
  usuarioRepository = new UsuarioRepository()

  async inserirEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
    const existeLivro = await this.livroRepository.consultarLivroPorID(emprestimo.livroId)
    if (!existeLivro) throw new Error('Não existe livro.')

    const existeUsuario = await this.usuarioRepository.consultarUsuarioPorId(emprestimo.usuarioId)
    if (!existeUsuario) throw new Error('Esse usuario não existe.')

    const novoEmprestimo = new Emprestimo(emprestimo.id, emprestimo.livroId, emprestimo.usuarioId, new Date(emprestimo.dataEmprestimo), new Date(emprestimo.dataDevolucao))
    const inserirNovoEmprestimo = await this.emprestimoRepository.inserirEmprestimo(novoEmprestimo)

    return inserirNovoEmprestimo
  }

  // async consultarLivroPorId(id: any): Promise<Emprestimo> {
  //   const consultaLivro = await this.emprestimoRepository.consultarLivroPorID(id)
  //   if (!consultaLivro) throw new Error('Não existe categoria com esse Id')
  //   return consultaLivro
  // }

  // async deletarLivroPorId(id: any): Promise<Emprestimo> {
  //   const consultaLivro = await this.emprestimoRepository.consultarLivroPorID(id)
  //   if (!consultaLivro) throw new Error('Não existe livro com esse id')
  //   const deletarLivro = await this.emprestimoRepository.deletarLivroPorId(id)
  //   return deletarLivro
  // }

  // async atualizarLivroPorId(novoLivro: Emprestimo, id: any): Promise<Emprestimo | null> {
  //   const consultarId = await this.emprestimoRepository.consultarLivroPorID(id)

  //   if (!consultarId) throw new Error('Não existe livro com esse id para ser atualizado.')
  //   const novaLivroAdicionado = await this.emprestimoRepository.atualizarLivroPorId(novoLivro, id)
  //   return novaLivroAdicionado

  // }

  // async listarLivros(): Promise<Emprestimo | null> {
  //   const consultarLista = await this.emprestimoRepository.listarLivros()
  //   if (!consultarLista) throw new Error('Não existem livros.')
  //   return consultarLista
  // }
}
