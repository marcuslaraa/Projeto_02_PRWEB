import { Request, Response } from 'express'
import { CategoriaService } from '../service/CategoriaService'

const categoriaService = new CategoriaService()

export async function inserirCategoria(req: Request, res: Response) {
  try {
    const novaCategoria = await categoriaService.inserirCategoria(req.body)
    res.status(201).json({ mensagem: 'Categoria inserida com sucesso', novaCategoria })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function consultarCategoriaPorId(req: Request, res: Response) {
  try {
    const consultarCategoria = await categoriaService.consultarCategoriaPorId(req.params.id)
    res.status(200).json({ mensagem: 'Categoria encontrada com sucesso.', consultarCategoria })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function deletarCategoriaPorId(req: Request, res: Response) {
  try {
    const deletarCategoria = await categoriaService.deletarCategoriaPorId(req.params.id)
    res.status(200).json({ mensagem: 'Categoria deletado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function atualizarCategoriaPorId(req: Request, res: Response) {
  try {
    const atualizarCategoria = await categoriaService.atualizarCategoriaPorId(req.body, req.params.id)
    res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function listarCategorias(req: Request, res: Response) {
  try {
    const listarTodasCategorias = await categoriaService.listarCategorias()
    res.status(200).json({ mensagem: 'Categorias encontradas com sucesso', listarTodasCategorias })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}