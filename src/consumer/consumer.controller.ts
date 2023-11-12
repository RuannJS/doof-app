import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CreateConsumer } from './dto/CreateConsumer.dto';
import { UpdateConsumer } from './dto/UpdateConsumer.dto,';
import { Consumer } from './consumer.entity';
import { Auth } from '../decorators/auth/auth.decorator';
import { ConsumerGuard } from '../guards/consumer/consumer.guard';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { AuthJWT } from '../owner/auth/auth.entity';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly service: ConsumerService) {}

  // CREATING A CONSUMER

  @Post()
  async createConsumer(@Body() data: CreateConsumer): Promise<CreateConsumer> {
    return await this.service.createConsumer(data);
  }

  //   LISTING ALL CONSUMERS

  @Get()
  async listConsumers(): Promise<Consumer[]> {
    return await this.service.listConsumers();
  }

  //   UPDATE CONSUMER

  @UseGuards(ConsumerGuard)
  @UseInterceptors(AuthInterceptor)
  @Put()
  async updateConsumer(
    @Body() data: UpdateConsumer,
    @Auth() consumer: AuthJWT,
  ): Promise<UpdateConsumer> {
    return await this.service.updateConsumer(data, consumer);
  }

  @UseGuards(ConsumerGuard)
  @UseInterceptors(AuthInterceptor)
  @Delete()
  async deleteConsumer(@Auth() consumer: AuthJWT): Promise<boolean> {
    return this.service.deleteConsumer(consumer);
  }
}
