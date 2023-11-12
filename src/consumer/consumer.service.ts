import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsumer } from './dto/CreateConsumer.dto';
import * as bcrypt from 'bcrypt';
import { Consumer } from './consumer.entity';
import { UpdateConsumer } from './dto/UpdateConsumer.dto,';
import { ConsumerAuth } from './auth/dto/ConsumerAuth.dto';

@Injectable()
export class ConsumerService {
  constructor(private readonly prisma: PrismaService) {}

  //   NO AUTHENTICATION NEEDED

  async createConsumer(data: CreateConsumer): Promise<CreateConsumer> {
    const consumers = await this.prisma.consumer.findMany();

    const consumerEmail = consumers.find(
      (consumer) => consumer.email === data.email,
    );

    if (consumerEmail) {
      throw new ConflictException('Email already in use!');
    }

    const saltRounds = 5;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newConsumer = await this.prisma.consumer.create({
      data: { ...data, password: hashedPassword },
    });

    return newConsumer;
  }

  async listConsumers(): Promise<Consumer[]> {
    const consumers = await this.prisma.consumer.findMany();

    return consumers;
  }

  // AUTHENTICATION NEEDED

  async updateConsumer(
    data: UpdateConsumer,
    consumer: ConsumerAuth,
  ): Promise<UpdateConsumer> {
    const verifyConsumer = await this.prisma.consumer.findUnique({
      where: {
        email: consumer.email,
      },
    });

    if (verifyConsumer.email !== consumer.email) {
      throw new UnauthorizedException();
    }

    if (data.password) {
      const saltRounds = 5;

      const updateHash = await bcrypt.hash(data.password, saltRounds);

      const updatedUser = await this.prisma.consumer.update({
        where: { email: consumer.email },
        data: { ...data, password: updateHash },
      });

      return updatedUser;
    }

    const updatedUser = await this.prisma.consumer.update({
      where: { email: consumer.email },
      data: { ...data },
    });

    return updatedUser;
  }

  async deleteConsumer(consumer: ConsumerAuth): Promise<boolean> {
    const verifyConsumer = await this.prisma.consumer.findUnique({
      where: {
        email: consumer.email,
      },
    });

    if (verifyConsumer.email !== consumer.email) {
      throw new UnauthorizedException();
    }

    const deletedUser = await this.prisma.consumer.delete({
      where: { email: consumer.email },
    });

    if (deletedUser) {
      return true;
    }

    return false;
  }
}
