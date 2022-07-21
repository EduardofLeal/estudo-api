import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public create(@Body() usuario: Usuario): Usuario {
    const usuarioCriado = this.usuarioService.create(usuario);

    return usuarioCriado;
  }

  @Get(':nomeDeUsuario')
  public findByUsername(@Param('nomeDeUsuario') nomeDeUsuario: string) {
    const usuarioEncontrado = this.usuarioService.findByUsername(nomeDeUsuario);

    return usuarioEncontrado;
  }
}
