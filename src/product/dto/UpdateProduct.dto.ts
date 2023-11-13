import { ProductCategory } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateProduct {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isDiscount?: boolean;

  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @IsDateString()
  @IsOptional()
  discountStart?: Date;

  @IsDateString()
  @IsOptional()
  discountEnd?: Date;

  @IsString()
  @IsOptional()
  discountText?: string;
}
