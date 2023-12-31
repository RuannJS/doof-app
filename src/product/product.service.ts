import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProduct } from './dto/CreateProduct.dto';
import { AuthJWT } from '../owner/auth/auth.entity';
import { Product } from './product.entity';
import { UpdateProduct } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  //   AUTHORIZATION

  async checkOwner(restaurantId: string, ownerId: string): Promise<boolean> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return false;
    }

    if (restaurant.ownerId !== ownerId) {
      return false;
    }

    return true;
  }

  async checkProduct(productId: string, ownerId: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }

    if ((await this.checkOwner(product.restaurantId, ownerId)) === false) {
      throw new UnauthorizedException();
    }
  }

  // ENDPOINTS

  async createProduct(data: CreateProduct, owner: AuthJWT): Promise<Product> {
    if ((await this.checkOwner(data.restaurantId, owner.id)) === false) {
      throw new UnauthorizedException();
    } else {
      const newProduct = await this.prisma.product.create({ data });

      return newProduct;
    }
  }

  async updateProduct(
    data: UpdateProduct,
    owner: AuthJWT,
    productId: string,
  ): Promise<Product> {
    await this.checkProduct(productId, owner.id);

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data,
    });

    return updatedProduct;
  }

  async deleteProduct(owner: AuthJWT, productId: string): Promise<boolean> {
    await this.checkProduct(productId, owner.id);

    const deletedProduct = await this.prisma.product.delete({
      where: { id: productId },
    });

    if (!deletedProduct) {
      return false;
    }

    return true;
  }
}
