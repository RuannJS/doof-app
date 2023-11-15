import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { CreateRestaurant } from './dto/CreateRestaurant.dto';
import { UpdateRestaurant } from './dto/UpdateRestaurant.dto';
import { RestaurantService } from './restaurant.service';
import { OwnerGuard } from '../guards/owner/owner.guard';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { Auth } from '../decorators/auth/auth.decorator';
import { AuthJWT } from '../owner/auth/auth.entity';
import { Restaurant } from './restaurant.entity';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @Get()
  async listAllRestaurants(): Promise<Restaurant[]> {
    return this.service.listAllRestaurants();
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
  async createRestaurant(
    @Body() data: CreateRestaurant,
    @Auth() owner: AuthJWT,
  ) {
    return await this.service.createRestaurant(data, owner);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Put('/:restaurantID')
  async updateRestaurant(
    @Body() data: UpdateRestaurant,
    @Auth() owner: AuthJWT,
    @Param('restaurantID') restaurantID: string,
  ): Promise<Restaurant> {
    return await this.service.updateRestaurant(data, owner, restaurantID);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Delete('/:restaurantID')
  async deleteRestaurant(
    @Auth() owner: AuthJWT,
    @Param('restaurantID') restaurantID: string,
  ): Promise<boolean> {
    return await this.service.deleteRestaurant(owner, restaurantID);
  }
}
