import { Request, Response } from "express"
import { LivroService } from "../service/LivroService"
import { Body, Controller, Delete, Get, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa"
import { BasicResponseDto } from "../model/dto/BasicResponseDto"
import { LivroRequestDto } from "../model/dto/LivroRequestDto"

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller {
  livroService = new LivroService();

  @Post()
  async inserirLivro(
    @Body() dto: LivroRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const novoLivro = await this.livroService.inserirLivro(dto)
      return success(201, new BasicResponseDto("Livro inserido com sucesso", novoLivro)
      )
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get('{id}')
  async consultarLivroPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const consultarLivro = await this.livroService.consultarLivroPorId(id)
      return success(200, new BasicResponseDto('Livro encontrado com sucesso.', consultarLivro))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Delete('{id}')
  async deletarLivroPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const deletarLivro = await this.livroService.deletarLivroPorId(id)
      return success(200, new BasicResponseDto('Livro deletado com sucesso.', deletarLivro))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Put('{id}')
  async atualizarLivroPorId(
    id: number,
    @Body() dto: LivroRequestDto,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      await this.livroService.atualizarLivroPorId(dto, id)
      const novoLivro = this.livroService.consultarLivroPorId(id)
      return success(200, new BasicResponseDto('Livro atualizado com sucesso.', novoLivro))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get()
  async listarLivros(
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const listarTodosLivros = await this.livroService.listarLivros()
      return success(200, new BasicResponseDto('Livros encontrados com sucesso.', listarTodosLivros))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }
}
