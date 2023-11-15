import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurant {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsDateString()
  weekOpeningTime: Date;
  @IsNotEmpty()
  @IsDateString()
  weekClosingTime: Date;

  @IsNotEmpty()
  @IsDateString()
  weekendOpeningTime: Date;
  @IsNotEmpty()
  @IsDateString()
  weekendClosingTime: Date;
}
