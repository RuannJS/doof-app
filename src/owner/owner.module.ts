import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService],
  imports: [PrismaModule],
})
export class OwnerModule {}
