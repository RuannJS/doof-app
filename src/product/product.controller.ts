import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthJWT } from '../owner/auth/auth.entity';
import { CreateProduct } from './dto/CreateProduct.dto';
import { Product } from './product.entity';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { OwnerGuard } from '../guards/owner/owner.guard';
import { UpdateProduct } from './dto/UpdateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
  async createProduct(
    @Body() data: CreateProduct,
    @Auth() owner: AuthJWT,
  ): Promise<Product> {
    return await this.service.createProduct(data, owner);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Put('/:productId')
  async updateProduct(
    @Body() data: UpdateProduct,
    @Auth() owner: AuthJWT,
    @Param('productId') productId: string,
  ): Promise<Product> {
    return await this.service.updateProduct(data, owner, productId);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Delete('/:productId')
  async deleteProduct(
    @Auth() owner: AuthJWT,
    @Param('productId') productId: string,
  ): Promise<boolean> {
    return await this.service.deleteProduct(owner, productId);
  }
}
