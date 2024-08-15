import { Usuario } from "../model/entity/Usuario"
import { PessoaRepository } from '../repository/PessoaRepository'
import { UsuarioRepository } from '../repository/UsuarioRepository'

export class UsuarioService {
  usuarioRepository = new UsuarioRepository();
  pessoaRepository = new PessoaRepository()

  async inserirUsuario(usuario: any): Promise<Usuario> {
    const existePessoa = await this.pessoaRepository.consultarPessoaPorId(usuario.idPessoa)
    if (!existePessoa) throw new Error('Não existe pessoa com este id.')
    const novoUsuario = new Usuario(usuario.id, usuario.idPessoa, usuario.senha)
    const inserirNovoUsuario = await this.usuarioRepository.inserirUsuario(novoUsuario)

    return inserirNovoUsuario
  }

  async consultarUsuarioPorId(id: any): Promise<Usuario> {
    const consultaUsuario = await this.usuarioRepository.consultarUsuarioPorId(id)
    if (!consultaUsuario) throw new Error('Não existe usuario com esse Id')
    return consultaUsuario
  }

  async deletarUsuarioPorId(id: any): Promise<Usuario> {
    const consultarUsuario = await this.usuarioRepository.consultarUsuarioPorId(id)
    if (!consultarUsuario) throw new Error('Não existe usuario com esse id')
    const deletarPessoa = await this.usuarioRepository.deletarUsuarioPorId(id)
    return deletarPessoa
  }

  async atualizarUsuarioPorId(novoUsuario: any, id: any): Promise<Usuario | null> {
    const existePessoa = await this.pessoaRepository.consultarPessoaPorId(novoUsuario.idPessoa)
    if (!existePessoa) throw new Error('Não existe pessoa com este id.')
    const consultarId = await this.usuarioRepository.consultarUsuarioPorId(id)
    if (!consultarId) throw new Error('Não existe usuario com esse id para ser atualizado.')
    const novoUsuarioAdicionado = await this.usuarioRepository.atualizarUsuarioPorId(novoUsuario, id)
    return novoUsuarioAdicionado

  }

  async listarUsuarios(): Promise<Usuario | null> {
    const consultarLista = await this.usuarioRepository.listarUsuarios()
    if (!consultarLista) throw new Error('Não existem usuarios.')
    return consultarLista
  }
}
