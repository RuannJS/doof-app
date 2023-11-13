import { ProductCategory } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @IsBoolean()
  @IsNotEmpty()
  isDiscount: boolean;

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
