import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConsumerModule } from './consumer/consumer.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [PrismaModule, ConsumerModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
