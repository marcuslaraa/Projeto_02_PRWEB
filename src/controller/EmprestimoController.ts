import { Request, Response } from 'express'
import { EmprestimoService } from '../service/EmprestimoService'
import { Body, Controller, Delete, Get, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { BasicResponseDto } from '../model/dto/BasicResponseDto'
import { EmprestimoRequestDto } from '../model/dto/EmprestimoRequestDto'

@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller {

  emprestimoService = new EmprestimoService()

  @Post()
  async inserirEmprestimo(
    @Body() dto: EmprestimoRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const novoEmprestimo = await this.emprestimoService.inserirEmprestimo(dto)
      return success(201, new BasicResponseDto("Emprestimo inserido com sucesso", novoEmprestimo))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get('{id}')
  async consultarEmprestimoPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ) {
    try {
      const consultarEmprestimo = await this.emprestimoService.consultarEmprestimoPorId(id)
      return success(200, new BasicResponseDto("Emprestimo encontrado com sucesso", consultarEmprestimo))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Delete('{id}')
  async deletarEmprestimoPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ) {
    try {
      const deletarLivro = await this.emprestimoService.deletarEmprestimoPorId(id)
      return success(200, new BasicResponseDto("Emprestimo deletado com sucesso", deletarLivro))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Put('{id}')
  async atualizarEmprestimoPorId(
    id: number,
    @Body() dto: EmprestimoRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const atualizarCategoria = await this.emprestimoService.atualizarEmprestimoPorId(dto, id)
      return success(201, new BasicResponseDto("Emprestimo atualizado com sucesso", atualizarCategoria))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get()
  async listarEmprestimos(
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ) {
    try {
      const listarTodosEmprestimos = await this.emprestimoService.listarEmprestimos()
      return success(200, new BasicResponseDto("Emprestimos encontrados com sucesso", listarTodosEmprestimos))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

}