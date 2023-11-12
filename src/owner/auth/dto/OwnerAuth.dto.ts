import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OwnerAuth {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
