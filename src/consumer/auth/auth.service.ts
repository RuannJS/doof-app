import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConsumerAuth } from './dto/ConsumerAuth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthJWT } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async consumerLogin(data: ConsumerAuth): Promise<string> {
    const verifyConsumer = await this.prisma.consumer.findUnique({
      where: { email: data.email },
    });

    if (!verifyConsumer) {
      throw new NotFoundException('Invalid credentials!');
    }

    const verifyPassword = await bcrypt.compare(
      data.password,
      verifyConsumer.password,
    );

    if (!verifyPassword) {
      throw new NotFoundException('Invalid credentials!');
    }

    const consumerJWT: AuthJWT = {
      id: verifyConsumer.id,
      email: verifyConsumer.email,
      firstName: verifyConsumer.firstName,
    };

    const authToken = jwt.sign(consumerJWT, process.env.CONSUMER_KEY);

    return `Bearer ${authToken}`;
  }
}
