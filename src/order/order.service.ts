import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AuthJWT } from '../owner/auth/auth.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './order.entity';
import { CreateOrder } from './dto/CreateOrder.dto';
import { UpdateOrder } from './dto/UpdateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async checkOwner(restaurantId: string, ownerId: string): Promise<boolean> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (restaurant.ownerId !== ownerId) {
      return false;
    }

    return true;
  }

  async listRestaurantOrdersById(
    owner: AuthJWT,
    restaurantId: string,
  ): Promise<Order[]> {
    if ((await this.checkOwner(restaurantId, owner.id)) === false) {
      throw new UnauthorizedException();
    }

    const orders = await this.prisma.order.findMany({
      where: { restaurantId },
    });

    return orders;
  }

  async createOrder(
    data: CreateOrder,
    consumer: AuthJWT,
    restaurantId: string,
  ): Promise<Order> {
    const productsInOrder = await this.prisma.product.findMany({
      where: {
        id: { in: data.ids },
      },
    });

    for (let i = 0; i < productsInOrder.length; i++) {
      for (let j = i + 1; j < productsInOrder.length; j++) {
        if (
          productsInOrder[i].restaurantId !== productsInOrder[j].restaurantId
        ) {
          throw new ConflictException(
            'Products from different restaurants are not accepted in the same Order!',
          );
        }
      }
    }

    const newOrder = await this.prisma.order.create({
      data: {
        product_id: data.ids,
        state: 'preparing',
        consumerId: consumer.id,
        restaurantId,
      },
    });

    return newOrder;
  }

  async updateOrderState(
    data: UpdateOrder,
    owner: AuthJWT,
    orderId: string,
  ): Promise<Order> {
    const verifyOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if ((await this.checkOwner(verifyOrder.restaurantId, owner.id)) === false) {
      throw new UnauthorizedException();
    }

    const updateOrderState = await this.prisma.order.update({
      where: { id: orderId },
      data: { state: data.state },
    });

    return updateOrderState;
  }
}
