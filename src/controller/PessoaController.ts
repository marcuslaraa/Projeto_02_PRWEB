import { Request, Response } from 'express'
import { PessoaService } from '../service/PessoaService'

const pessoaService = new PessoaService()

export async function inserirPessoa(req: Request, res: Response) {
  try {
    const novaPessoa = await pessoaService.inserirLivro(req.body)
    res.status(201).json({ mensagem: 'Nova pessoa inserida com sucesso.', novaPessoa })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function consultarPessoaPorId(req: Request, res: Response) {
  try {
    const consultarPessoa = await pessoaService.consultarPessoaPorId(req.params.id)
    res.status(200).json({ mensagem: 'Pessoa encontrada com sucesso.', consultarPessoa })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function deletarPessoaPorId(req: Request, res: Response) {
  try {
    const deletarPessoa = await pessoaService.deletarLivroPorId(req.params.id)
    res.status(200).json({ mensagem: 'Pessoa deletada com sucesso.' })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function atualizarPessoaPorId(req: Request, res: Response) {
  try {
    const atualizarCategoria = await pessoaService.atualizarPessoaPorId(req.body, req.params.id)
    res.status(200).json({ mensagem: 'Pessoa atualizado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function listarPessoas(req: Request, res: Response) {
  try {
    const listarTodosLivros = await pessoaService.listarPessoas()
    res.status(200).json({ mensagem: 'Pessoas encontradas com sucesso', listarTodosLivros })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}