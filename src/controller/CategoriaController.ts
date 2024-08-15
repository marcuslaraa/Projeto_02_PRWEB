import { Request, Response } from 'express'
import { CategoriaService } from '../service/CategoriaService'
import { Body, Controller, Delete, Get, Post, Put, Res, Route, SuccessResponse, Tags, TsoaResponse } from 'tsoa'
import { CategoriaRequestDto } from '../model/dto/CategoriaRequestDto'
import { BasicResponseDto } from '../model/dto/BasicResponseDto'

@Route('categoria')
@Tags('Categoria')
export class CategoriaController extends Controller {

categoriaService = new CategoriaService()

@Post()
 async inserirCategoria(
  @Body() dto: CategoriaRequestDto,
  @Res() fail: TsoaResponse<400, BasicResponseDto>,
  @Res () success : TsoaResponse <201 , BasicResponseDto >) {
  try {
    const novaCategoria = await this.categoriaService.inserirCategoria(dto)
    return success(201, new BasicResponseDto('Categoria inserida com sucesso', novaCategoria))
  } catch (err: any) {
    return fail(400, new BasicResponseDto(err.message, undefined))
  }
}

@Get('{id}')
 async consultarCategoriaPorId(
  id: number,
  @Res() fail: TsoaResponse<404, BasicResponseDto>,
  @Res () success : TsoaResponse <200 , BasicResponseDto >) {
  try {
    const consultarCategoria = await this.categoriaService.consultarCategoriaPorId(id)
    return success(200, new BasicResponseDto('Categoria encontrada com sucesso', consultarCategoria))
  } catch (err: any) {
    return fail(404, new BasicResponseDto(err.message, undefined))
  }
}

@Delete('{id}')
 async  deletarCategoriaPorId(
  id: number,
  @Res() fail: TsoaResponse<404, BasicResponseDto>,
  @Res () success : TsoaResponse <200 , BasicResponseDto >) {
  try {
    const categoriaDeletada = await this.categoriaService.consultarCategoriaPorId(id)
    await this.categoriaService.deletarCategoriaPorId(id)
    return success(200, new BasicResponseDto('Categoria deletada com sucesso', categoriaDeletada))
  } catch (err: any) {
    return fail(404, new BasicResponseDto(err.message, undefined))
  }
}

@Put('{id}')
 async  atualizarCategoriaPorId(
  id: number,
  @Body() dto: CategoriaRequestDto,
  @Res() fail: TsoaResponse<404, BasicResponseDto>,
  @Res () success : TsoaResponse <200 , BasicResponseDto >) {
  try {
    const atualizaCategoria = await this.categoriaService.atualizarCategoriaPorId(dto, id)
    const novoategoria = await this.categoriaService.consultarCategoriaPorId(id)
    return success(200, new BasicResponseDto('Categoria atualizada com sucesso', novoategoria))
  } catch (err: any) {
    return fail(404, new BasicResponseDto(err.message, undefined))
  }
}

@Get()
 async  listarCategorias(
  @Res() fail: TsoaResponse<404, BasicResponseDto>,
  @Res () success : TsoaResponse <200 , BasicResponseDto >) {
  try {
    const listarTodasCategorias = await this.categoriaService.listarCategorias()
    return success(200, new BasicResponseDto('Categoria encontradas com sucesso', listarTodasCategorias))
  } catch (err: any) {
    return fail(404, new BasicResponseDto(err.message, undefined))
  }
}

}