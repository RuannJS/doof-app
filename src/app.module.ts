import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [PrismaModule, ConsumerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
