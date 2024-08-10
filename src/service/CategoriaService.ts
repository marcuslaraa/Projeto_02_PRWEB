import { Categoria } from "../model/Categoria"
import { CategoriaRepository } from "../repository/CategoriaRepository"

export class CategoriaService {
  categoriaRepository = new CategoriaRepository();

  async inserirCategoria(categoria: Categoria): Promise<Categoria> {
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
    if (!consultaCategoria) throw new Error('Não existe categoria com esse id')
    const deletarCategoria = await this.categoriaRepository.deletarCategoriaPorId(id)
    return deletarCategoria
  }

  async atualizarCategoriaPorId(novaCategoria: Categoria, id: any): Promise<Categoria | null> {
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
