import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: Array<Usuario> = [
    {
      id: 1,
      nomeDeUsuario: 'eduardo',
      email: 'teste@teste.com',
      senha: '1234',
      nomeCompleto: 'Eduardo Leal',
      dataDeEntrada: new Date(),
    },
  ];

  public create(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);

    return usuario;
  }

  public findByUsername(nomeDeUsuario: string): Usuario {
    return this.usuarios.find(
      (usuario) => usuario.nomeDeUsuario === nomeDeUsuario,
    );
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarios;
  }
}
