export class Livro {
  id: number
  titulo: string
  autor: string
  categoriaId: number

  constructor(id: number, titulo: string, autor: string, categoriaId: number) {
    this.id = id || 0
    this.titulo = titulo
    this.autor = autor
    this.categoriaId = categoriaId

    this.validade()
  }

  validade() {
    if (!this.titulo) throw new Error('Titulo não informado.')
    if (!this.autor) throw new Error('Autor não informado')
  }
}