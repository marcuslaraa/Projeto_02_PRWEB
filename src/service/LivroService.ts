import { Livro } from "../model/Livro"
import { CategoriaRepository } from '../repository/CategoriaRepository'
import { LivroRepository } from "../repository/LivroRepository"

export class LivroService {
  livroRepository = new LivroRepository();
  categoriaRepository = new CategoriaRepository()

  async inserirLivro(livro: Livro): Promise<Livro> {
    const existeCategoria = await this.categoriaRepository.consultarCategoriaPorID(livro.categoriaId)
    if (!existeCategoria) throw new Error('Não existe categoria.')
    const consultaLivro = await this.livroRepository.consultarLivroPorTitulo(livro.titulo)
    if (consultaLivro) throw new Error('Já existe um livro com esse titulo.')
    const novoLivro = new Livro(livro.id, livro.titulo, livro.autor, livro.categoriaId)
    const inserirNovaLivro = await this.livroRepository.inserirLivro(novoLivro)

    return inserirNovaLivro
  }

  async consultarLivroPorId(id: any): Promise<Livro> {
    const consultaLivro = await this.livroRepository.consultarLivroPorID(id)
    if (!consultaLivro) throw new Error('Não existe categoria com esse Id')
    return consultaLivro
  }

  async deletarLivroPorId(id: any): Promise<Livro> {
    const consultaLivro = await this.livroRepository.consultarLivroPorID(id)
    if (!consultaLivro) throw new Error('Não existe livro com esse id')
    const deletarLivro = await this.livroRepository.deletarLivroPorId(id)
    return deletarLivro
  }

  async atualizarLivroPorId(novoLivro: Livro, id: any): Promise<Livro | null> {
    const consultarId = await this.livroRepository.consultarLivroPorID(id)

    if (!consultarId) throw new Error('Não existe livro com esse id para ser atualizado.')
    const novaLivroAdicionado = await this.livroRepository.atualizarLivroPorId(novoLivro, id)
    return novaLivroAdicionado

  }

  async listarLivros(): Promise<Livro | null> {
    const consultarLista = await this.livroRepository.listarLivros()
    if (!consultarLista) throw new Error('Não existem livros.')
    return consultarLista
  }
}
