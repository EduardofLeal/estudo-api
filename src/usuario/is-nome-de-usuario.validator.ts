import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from './usuario.service';

@Injectable()
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usuarioService: UsuarioService) {}
  validate(
    nomeDeUsuario: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.usuarioService.findByUsername(nomeDeUsuario);
  }
}

export function IsNomeDeUsuarioUnico(validatorOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      constraints: [],
      validator: IsNomeDeUsuarioUnicoConstraint,
    });
  };
}
