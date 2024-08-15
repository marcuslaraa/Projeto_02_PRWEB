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

export async function consultarEmprestimoPorId(req: Request, res: Response) {
  try {
    const consultarEmprestimo = await emprestimoService.consultarEmprestimoPorId(req.params.id)
    res.status(200).json({ mensagem: 'Emprestimo encontrado com sucesso.', consultarEmprestimo })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function deletarEmprestimoPorId(req: Request, res: Response) {
  try {
    const deletarLivro = await emprestimoService.deletarEmprestimoPorId(req.params.id)
    res.status(200).json({ mensagem: 'Emprestimo deletado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function atualizarEmprestimoPorId(req: Request, res: Response) {
  try {
    const atualizarCategoria = await emprestimoService.atualizarEmprestimoPorId(req.body, req.params.id)
    res.status(200).json({ mensagem: 'Emprestimo atualizado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function listarEmprestimos(req: Request, res: Response) {
  try {
    const listarTodosEmprestimos = await emprestimoService.listarEmprestimos()
    res.status(200).json({ mensagem: 'Emprestimos encontradas com sucesso', listarTodosEmprestimos })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}