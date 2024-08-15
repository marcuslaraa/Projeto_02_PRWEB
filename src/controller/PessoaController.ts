import { Request, Response } from 'express'
import { PessoaService } from '../service/PessoaService'
import { Body, Controller, Delete, Get, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { BasicResponseDto } from '../model/dto/BasicResponseDto'
import { PessoaRequestDto } from '../model/dto/PessoaRequestDto'
@Route("pessoa")
@Tags("Pessoa")
export class PessoaController extends Controller {
  pessoaService = new PessoaService()

  @Post()
  async inserirPessoa(
    @Body() dto: PessoaRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const novaPessoa = await this.pessoaService.inserirLivro(dto)
      return success(201, new BasicResponseDto("Pessoa inserido com sucesso", novaPessoa))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get('{id}')
  async consultarPessoaPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const consultarPessoa = await this.pessoaService.consultarPessoaPorId(id)
      return success(200, new BasicResponseDto("Pessoa encontrada com sucesso", consultarPessoa))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Delete('{id}')
  async deletarPessoaPorId(
    id: number,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>) {
    try {
      const deletarPessoa = await this.pessoaService.deletarLivroPorId(id)
      return success(201, new BasicResponseDto("Pessoa deletada com sucesso", deletarPessoa))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Put('{id}')
  async atualizarPessoaPorId(
    id: number,
    @Body() dto: PessoaRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>) {
    try {
      const atualizarCategoria = await this.pessoaService.atualizarPessoaPorId(dto, id)
      return success(201, new BasicResponseDto("Pessoa atualizada com sucesso", atualizarCategoria))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get()
  async listarPessoas(
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const listarTodosLivros = await this.pessoaService.listarPessoas()
      return success(200, new BasicResponseDto("Pessoas encontradas com sucesso", listarTodosLivros))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }
}