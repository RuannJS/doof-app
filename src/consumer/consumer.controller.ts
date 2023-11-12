import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CreateConsumer } from './dto/CreateConsumer.dto';
import { UpdateConsumer } from './dto/UpdateConsumer.dto,';
import { Consumer } from './consumer.entity';
import { Auth } from '../decorators/auth/auth.decorator';
import { ConsumerAuth } from './auth/dto/ConsumerAuth.dto';

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

  @Put()
  async updateConsumer(
    @Body() data: UpdateConsumer,
    @Auth() consumer: ConsumerAuth,
  ): Promise<UpdateConsumer> {
    return await this.service.updateConsumer(data, consumer);
  }

  @Delete()
  async deleteConsumer(@Auth() consumer: ConsumerAuth): Promise<boolean> {
    return this.service.deleteConsumer(consumer);
  }
}
