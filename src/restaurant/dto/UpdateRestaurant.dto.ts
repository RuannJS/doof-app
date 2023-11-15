import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateRestaurant {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsDateString()
  @IsOptional()
  weekOpeningTime?: Date;
  @IsDateString()
  @IsOptional()
  weekClosingTime?: Date;
  @IsDateString()
  @IsOptional()
  weekendOpeningTime?: Date;

  @IsDateString()
  @IsOptional()
  weekendClosingTime?: Date;
}
