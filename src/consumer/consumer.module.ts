import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [ConsumerService],
  controllers: [ConsumerController],
  imports: [PrismaModule, AuthModule],
})
export class ConsumerModule {}
