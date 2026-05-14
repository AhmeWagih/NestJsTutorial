/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'USER'], {
    message: 'Role must be either ADMIN or USER',
  })
  role: string;
}
