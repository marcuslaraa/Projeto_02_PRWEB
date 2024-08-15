import { IEmprestimo } from '../Interfaces/IEmprestimo'
import { Emprestimo } from "../model/entity/Emprestimo"
import { EmprestimoRepository } from '../repository/EmprestimoRepository'
import { LivroRepository } from '../repository/LivroRepository'
import { UsuarioRepository } from '../repository/UsuarioRepository'
import { stringParaData, verificaFormatoData } from '../utils/DataUtils'

export class EmprestimoService {

  emprestimoRepository = new EmprestimoRepository()
  livroRepository = new LivroRepository()
  usuarioRepository = new UsuarioRepository()

  async inserirEmprestimo(emprestimo: any): Promise<Emprestimo> {
    const existeLivro = await this.livroRepository.consultarLivroPorId(emprestimo.livroId)
    if (!existeLivro) throw new Error('Não existe livro.')

    const existeUsuario = await this.usuarioRepository.consultarUsuarioPorId(emprestimo.usuarioId)
    if (!existeUsuario) throw new Error('Esse usuario não existe.')

    const livroEstaEmprestado = await this.emprestimoRepository.consultarEmprestimoPorLivroId(emprestimo.livroId)
    if (livroEstaEmprestado) throw new Error('Livro já esta emprestado para outro usuário.')

    const usuarioTemPendecia = await this.emprestimoRepository.consultarEmprestimoPorUsuarioId(emprestimo.usuarioId)
    if (usuarioTemPendecia) throw new Error('Usuário já possui livro emprestado.')

    let dataEmprestimo
    let dataDevolucao

    if (verificaFormatoData(emprestimo.dataEmprestimo) && verificaFormatoData(emprestimo.dataDevolucao)) {
      dataEmprestimo = stringParaData(emprestimo.dataEmprestimo)
      dataDevolucao = stringParaData(emprestimo.dataDevolucao)
    } else {
      throw new Error('Datas não estão no formato correto.')
    }

    const novoEmprestimo = new Emprestimo(emprestimo.id, emprestimo.livroId, emprestimo.usuarioId, dataEmprestimo, dataDevolucao)
    const inserirNovoEmprestimo = await this.emprestimoRepository.inserirEmprestimo(novoEmprestimo)

    return inserirNovoEmprestimo
  }

  async consultarEmprestimoPorId(id: any): Promise<Emprestimo> {
    const consultaLivro = await this.emprestimoRepository.consultarEmprestimoPorId(id)
    if (!consultaLivro) throw new Error('Não existe emprestimo com esse Id')
    return consultaLivro
  }

  async deletarEmprestimoPorId(id: any): Promise<Emprestimo> {
    const consultaEmprestimo = await this.emprestimoRepository.consultarEmprestimoPorId(id)
    if (!consultaEmprestimo) throw new Error('Não existe emprestimo com esse id')
    const deletarLivro = await this.emprestimoRepository.deletarEmprestimoPorId(id)
    return deletarLivro
  }

  async atualizarEmprestimoPorId(novoLivro: any, id: any): Promise<Emprestimo | null> {
    const consultarId = await this.emprestimoRepository.consultarEmprestimoPorId(id)

    let dataEmprestimo
    let dataDevolucao

    if (verificaFormatoData(novoLivro.dataEmprestimo) && verificaFormatoData(novoLivro.dataDevolucao)) {
      dataEmprestimo = stringParaData(novoLivro.dataEmprestimo)
      dataDevolucao = stringParaData(novoLivro.dataDevolucao)
    } else {
      throw new Error('Datas não estão no formato correto.')
    }

    const novoEmprestimo = new Emprestimo(novoLivro.id, novoLivro.livroId, novoLivro.usuarioId, dataEmprestimo, dataDevolucao)

    if (!consultarId) throw new Error('Não existe emprestimo com esse id para ser atualizado.')
    const novaLivroAdicionado = await this.emprestimoRepository.atualizarEmprestimoPorId(novoEmprestimo, id)
    return novaLivroAdicionado

  }

  async listarEmprestimos(): Promise<Emprestimo | null> {
    const consultarLista = await this.emprestimoRepository.listarEmprestimos()
    if (!consultarLista) throw new Error('Não existem emprestimos.')
    return consultarLista
  }
}
