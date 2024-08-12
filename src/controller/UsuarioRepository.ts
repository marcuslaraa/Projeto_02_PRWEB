import { Request, Response } from 'express'
import { UsuarioService } from '../service/UsuarioService'

const usuarioService = new UsuarioService()

export async function inserirUsuario(req: Request, res: Response) {
  try {
    const novoUsuario = await usuarioService.inserirUsuario(req.body)
    res.status(201).json({ mensagem: 'Novo usuario inserido com sucesso.', novoUsuario })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function consultarUsuarioPorId(req: Request, res: Response) {
  try {
    const consultarUsuario = await usuarioService.consultarUsuarioPorId(req.params.id)
    res.status(200).json({ mensagem: 'Usuario encontrada com sucesso.', consultarUsuario })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function deletarUsuarioPorId(req: Request, res: Response) {
  try {
    const deletarUsuario = await usuarioService.deletarUsuarioPorId(req.params.id)
    res.status(200).json({ mensagem: 'Usuario deletado com sucesso.' })
  } catch (err: any) {
    res.status(400).json({ mensagem: err.message })
  }
}

export async function atualizarUsuarioPorId(req: Request, res: Response) {
  try {
    const atualizarUsuario = await usuarioService.atualizarUsuarioPorId(req.body, req.params.id)
    res.status(200).json({ mensagem: 'Usuario atualizado com sucesso.' })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}

export async function listarUsuarios(req: Request, res: Response) {
  try {
    const listarTodosUsuario = await usuarioService.listarUsuarios()
    res.status(200).json({ mensagem: 'Usuarios encontrados com sucesso', listarTodosUsuario })
  } catch (err: any) {
    res.status(404).json({ mensagem: err.message })
  }
}