import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrder {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  ids: string[];
}
