import { Request, Response } from 'express'
import { EmprestimoService } from '../service/EmprestimoService'

const emprestimoService = new EmprestimoService()

export async function inserirEmprestimo(req: Request, res: Response) {
  try {
    const novoEmprestimo = await emprestimoService.inserirEmprestimo(req.body)
    res.status(201).json({ mensagem: 'Emprestimo inserido com sucesso', novoEmprestimo })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

// export async function consultarLivroPorId(req: Request, res: Response) {
//   try {
//     const consultarLivro = await emprestimoService.consultarLivroPorId(req.params.id)
//     res.status(200).json({ mensagem: 'Livro encontrado com sucesso.', consultarLivro })
//   } catch (err: any) {
//     res.status(404).json({ mensagem: err.message })
//   }
// }

// export async function deletarLivroPorId(req: Request, res: Response) {
//   try {
//     const deletarLivro = await emprestimoService.deletarLivroPorId(req.params.id)
//     res.status(200).json({ mensagem: 'Livro deletado com sucesso.' })
//   } catch (err: any) {
//     res.status(404).json({ mensagem: err.message })
//   }
// }

// export async function atualizarLivroPorId(req: Request, res: Response) {
//   try {
//     const atualizarCategoria = await emprestimoService.atualizarLivroPorId(req.body, req.params.id)
//     res.status(200).json({ mensagem: 'Livro atualizado com sucesso.' })
//   } catch (err: any) {
//     res.status(404).json({ mensagem: err.message })
//   }
// }

// export async function listarLivros(req: Request, res: Response) {
//   try {
//     const listarTodosLivros = await emprestimoService.listarLivros()
//     res.status(200).json({ mensagem: 'Livros encontradas com sucesso', listarTodosLivros })
//   } catch (err: any) {
//     res.status(404).json({ mensagem: err.message })
//   }
// }