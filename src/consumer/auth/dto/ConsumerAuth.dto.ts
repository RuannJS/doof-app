import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ConsumerAuth {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
