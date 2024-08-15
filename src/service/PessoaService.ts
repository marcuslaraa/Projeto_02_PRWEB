import { Pessoa } from "../model/entity/Pessoa"
import { PessoaRepository } from '../repository/PessoaRepository'

export class PessoaService {
  pessoaRepository = new PessoaRepository();

  async inserirLivro(pessoa: any): Promise<Pessoa> {
    const existeEmail = await this.pessoaRepository.consultarPessoaPorEmail(pessoa.email)
    if (existeEmail) throw new Error('Já existe uma pessoa cadastrada com esse email.')
    const novaPessoa = new Pessoa(pessoa.id, pessoa.nome, pessoa.email)
    const inserirNovaPessoa = await this.pessoaRepository.inserirPessoa(novaPessoa)

    return inserirNovaPessoa
  }

  async consultarPessoaPorId(id: any): Promise<Pessoa> {
    const consultaPessoa = await this.pessoaRepository.consultarPessoaPorId(id)
    if (!consultaPessoa) throw new Error('Não existe pessoa com esse Id')
    return consultaPessoa
  }

  async deletarLivroPorId(id: any): Promise<Pessoa> {
    const consultaPessoa = await this.pessoaRepository.consultarPessoaPorId(id)
    if (!consultaPessoa) throw new Error('Não existe pessoa com esse id')
    const deletarPessoa = await this.pessoaRepository.deletarPessoaPorId(id)
    return deletarPessoa
  }

  async atualizarPessoaPorId(novaPessoa: any, id: any): Promise<Pessoa | null> {
    const consultarId = await this.pessoaRepository.consultarPessoaPorId(id)
    if (!consultarId) throw new Error('Não existe pessoa com esse id para ser atualizado.')
    const novaPessoaAdicionada = await this.pessoaRepository.atualizarPessoaPorId(novaPessoa, id)
    return novaPessoaAdicionada

  }

  async listarPessoas(): Promise<Pessoa | null> {
    const consultarLista = await this.pessoaRepository.listarPessoas()
    if (!consultarLista) throw new Error('Não existem pessoas.')
    return consultarLista
  }
}
