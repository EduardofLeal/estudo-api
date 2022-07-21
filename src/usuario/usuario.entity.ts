import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario.validator';

export class Usuario {
  id: number;

  @IsNomeDeUsuarioUnico({
    message: 'nomeDeUsuario precisa ser único',
  })
  @IsNotEmpty()
  @IsString({
    message: 'nomeDeUsuario precisa ser uma string',
  })
  nomeDeUsuario: string;

  @IsEmail({
    message: 'email precisa ser um endereço de email válido',
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'senha é obrigatório',
  })
  senha: string;

  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório',
  })
  nomeCompleto: string;
  dataDeEntrada: Date;
}
