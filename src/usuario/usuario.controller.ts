import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public create(@Body() usuario: Usuario): NestResponse {
    const usuarioCriado = this.usuarioService.create(usuario);

    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        Location: `/users/${usuarioCriado.nomeDeUsuario}`,
      })
      .comBody(usuarioCriado)
      .build();
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':nomeDeUsuario')
  public findByUsername(@Param('nomeDeUsuario') nomeDeUsuario: string) {
    const usuarioEncontrado = this.usuarioService.findByUsername(nomeDeUsuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuario não encontrado.',
      });
    }

    return usuarioEncontrado;
  }
}
