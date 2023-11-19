import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OwnerGuard } from '../guards/owner/owner.guard';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthJWT } from '../owner/auth/auth.entity';
import { Order } from './order.entity';

import { ConsumerGuard } from '../guards/consumer/consumer.guard';
import { CreateOrder } from './dto/CreateOrder.dto';
import { UpdateOrder } from './dto/UpdateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Get('/:restaurantId')
  async listRestaurantOrdersById(
    @Auth() owner: AuthJWT,
    @Param('restaurantId') restaurantId: string,
  ): Promise<Order[]> {
    return await this.service.listRestaurantOrdersById(owner, restaurantId);
  }

  @UseGuards(ConsumerGuard)
  @UseInterceptors(AuthInterceptor)
  @Post('/:restaurantId')
  async createOrder(
    @Body() data: CreateOrder,
    @Auth() consumer: AuthJWT,
    @Param('restaurantId') restaurantId: string,
  ): Promise<Order> {
    return await this.service.createOrder(data, consumer, restaurantId);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Put('/:orderId')
  async updateOrderState(
    @Body() data: UpdateOrder,
    @Auth() owner: AuthJWT,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return await this.service.updateOrderState(data, owner, orderId);
  }
}
