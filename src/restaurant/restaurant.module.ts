import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [PrismaModule],
})
export class RestaurantModule {}
