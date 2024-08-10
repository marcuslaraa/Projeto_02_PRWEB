import { Request, Response } from 'express'
import { LivroService } from '../service/LivroService'

const livroService = new LivroService()

export async function inserirLivro(req: Request, res: Response) {
  try {
    const novoLivro = await livroService.inserirLivro(req.body)
    res.status(201).json({ mensagem: 'Livro inserido com sucesso', novoLivro })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function consultarLivroPorId(req: Request, res: Response) {
  try {
    const consultarLivro = await livroService.consultarLivroPorId(req.params.id)
    res.status(200).json({ mensagem: 'Livro encontrado com sucesso.', consultarLivro })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function deletarLivroPorId(req: Request, res: Response) {
  try {
    const deletarLivro = await livroService.deletarLivroPorId(req.params.id)
    res.status(200).json({ mensagem: 'Livro deletado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function atualizarLivroPorId(req: Request, res: Response) {
  try {
    const atualizarCategoria = await livroService.atualizarLivroPorId(req.body, req.params.id)
    res.status(200).json({ mensagem: 'Livro atualizado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function listarLivros(req: Request, res: Response) {
  try {
    const listarTodosLivros = await livroService.listarLivros()
    res.status(200).json({ mensagem: 'Livros encontradas com sucesso', listarTodosLivros })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}