import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurant } from './dto/CreateRestaurant.dto';
import { Restaurant } from './restaurant.entity';
import { AuthJWT } from '../owner/auth/auth.entity';
import { UpdateRestaurant } from './dto/UpdateRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async checkOwner(restaurantId: string, ownerId: string): Promise<void> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (restaurant.ownerId !== ownerId) {
      throw new UnauthorizedException();
    }
  }

  async listAllRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany();

    return restaurants;
  }

  async createRestaurant(
    data: CreateRestaurant,
    owner: AuthJWT,
  ): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurant.create({
      data: { ...data, ownerId: owner.id },
    });

    return restaurant;
  }

  async updateRestaurant(
    data: UpdateRestaurant,
    owner: AuthJWT,
    restaurantID: string,
  ): Promise<Restaurant> {
    this.checkOwner(restaurantID, owner.id);
    const restaurant = await this.prisma.restaurant.update({
      where: { id: restaurantID },
      data,
    });

    return restaurant;
  }

  async deleteRestaurant(
    owner: AuthJWT,
    restaurantID: string,
  ): Promise<boolean> {
    this.checkOwner(restaurantID, owner.id);

    const deleteProducts = await this.prisma.product.deleteMany({
      where: { restaurantId: restaurantID },
    });

    const restaurant = await this.prisma.restaurant.delete({
      where: { id: restaurantID },
    });

    if (restaurant) {
      return true;
    }

    return false;
  }
}
