import { Categoria } from "../model/entity/Categoria"
import { CategoriaRepository } from "../repository/CategoriaRepository"
import { LivroRepository } from '../repository/LivroRepository'

export class CategoriaService {
  categoriaRepository = new CategoriaRepository();
  livroRepository = new LivroRepository()

  async inserirCategoria(categoria: any): Promise<Categoria> {
    const consultaCategoria = await this.categoriaRepository.consultarCategoriaPorNome(categoria.nome)
    if (consultaCategoria) throw new Error('Já existe uma categoria com esse nome.')
    const novaCategoria = new Categoria(categoria.id, categoria.nome)
    const inserirNovaCategoria = await this.categoriaRepository.insertUser(novaCategoria)

    return inserirNovaCategoria
  }

  async consultarCategoriaPorId(id: any): Promise<Categoria> {
    const consultaCategoria = await this.categoriaRepository.consultarCategoriaPorID(id)
    if (!consultaCategoria) throw new Error('Não existe categoria com esse Id')
    return consultaCategoria
  }

  async deletarCategoriaPorId(id: any): Promise<Categoria> {
    const consultaCategoria = await this.categoriaRepository.consultarCategoriaPorID(id)
    const consultarCategoriaEmLivros = await this.livroRepository.consultarLivroPorId(id)
    if (consultarCategoriaEmLivros) throw new Error('Não pode deletar categorias que estão aplicadas em algum livro.')
    if (!consultaCategoria) throw new Error('Não existe categoria com esse id')
    const deletarCategoria = await this.categoriaRepository.deletarCategoriaPorId(id)
    return deletarCategoria
  }

  async atualizarCategoriaPorId(novaCategoria: any, id: any): Promise<Categoria | null> {
    const consultarId = await this.categoriaRepository.consultarCategoriaPorID(id)
    if (!consultarId) throw new Error('Não existe categoria com esse id para ser atuazliado.')
    const consultaNome = await this.categoriaRepository.consultarCategoriaPorNome(novaCategoria.nome)
    if (consultaNome) throw new Error('Não pode atualizar a categoria com o mesmo nome.')
    const novaCategoriaAdicionada = await this.categoriaRepository.atualizarCategoriaPorId(novaCategoria, id)
    return novaCategoriaAdicionada

  }

  async listarCategorias(): Promise<Categoria | null> {
    const consultarLista = await this.categoriaRepository.listarCategorias()
    if (!consultarLista) throw new Error('Não existem categorias.')
    return consultarLista
  }
}
