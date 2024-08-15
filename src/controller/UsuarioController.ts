import { Request, Response } from 'express'
import { UsuarioService } from '../service/UsuarioService'
import { Body, Controller, Delete, Get, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { BasicResponseDto } from '../model/dto/BasicResponseDto'
import { UsuarioRequestDto } from '../model/dto/UsuarioRequestDto'

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {

  usuarioService = new UsuarioService()

  @Post()
  async inserirUsuario(
    @Body() dto: UsuarioRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const novoUsuario = await this.usuarioService.inserirUsuario(dto)
      return success(201, new BasicResponseDto("Usuario inserido com sucesso", novoUsuario))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get('{id}')
  async consultarUsuarioPorId(
    id: number,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const consultarUsuario = await this.usuarioService.consultarUsuarioPorId(id)
      return success(200, new BasicResponseDto("Usuario encontrado com sucesso", consultarUsuario))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Delete('{id}')
  async deletarUsuarioPorId(
    id: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>) {
    try {
      const deletarUsuario = await this.usuarioService.deletarUsuarioPorId(id)
      return success(201, new BasicResponseDto("Usuario deletado com sucesso", deletarUsuario))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

  @Put('{id}')
  async atualizarUsuarioPorId(
    id: number,
    @Body() dto: UsuarioRequestDto,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ) {
    try {
      const atualizarUsuario = await this.usuarioService.atualizarUsuarioPorId(dto, id)
      return success(201, new BasicResponseDto("Usuario atualizado com sucesso", atualizarUsuario))
    } catch (err: any) {
      return fail(400, new BasicResponseDto(err.message, undefined))
    }
  }

  @Get()
  async listarUsuarios(
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>) {
    try {
      const listarTodosUsuario = await this.usuarioService.listarUsuarios()
      return success(200, new BasicResponseDto("Usuario atualizado com sucesso", listarTodosUsuario))
    } catch (err: any) {
      return fail(404, new BasicResponseDto(err.message, undefined))
    }
  }

}