import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from './restaurant.entity';
import { AuthJWT } from 'src/owner/auth/auth.entity';

describe('RestaurantService', () => {
  const today = Date.now();

  let service: RestaurantService;
  let prisma: PrismaService;

  const mockRestaurants: Restaurant[] = [
    {
      id: '65527d314201bfcdff2ebebe',
      name: 'mockRestaurant',
      address: 'mockAddress',
      imageUrl: 'mockImage',
      weekClosingTime: new Date(today),
      weekendClosingTime: new Date(today),
      weekendOpeningTime: new Date(today),
      weekOpeningTime: new Date(today),
      ownerId: '65527d314201bfcdff2ecece',
    },
    {
      id: '65527d314201bfcdff2edede',
      name: 'mockRestaurant2',
      address: 'mockAddress2',
      imageUrl: 'mockImage2',
      weekClosingTime: new Date(today),
      weekendClosingTime: new Date(today),
      weekendOpeningTime: new Date(today),
      weekOpeningTime: new Date(today),
      ownerId: '65527d314201bfcdff2ecece',
    },
  ];

  const mockOwner: AuthJWT = {
    id: '65527d314201bfcdff2ecece',
    email: 'mockOwner@owner.com',
    firstName: 'Owner',
  };

  const singleRestaurant = mockRestaurants[0];

  const mockPrisma = {
    restaurant: {
      findUnique: jest.fn().mockResolvedValue(singleRestaurant),
      findMany: jest.fn().mockRejectedValue(mockRestaurants),
      update: jest.fn().mockResolvedValue(singleRestaurant),
      delete: jest.fn().mockResolvedValue(true),
      create: jest.fn().mockResolvedValue(singleRestaurant),
    },
    product: {
      deleteMany: jest.fn().mockResolvedValue(true),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createRestaurant', () => {
    it('should create a restaurant', async () => {
      const restaurant = await service.createRestaurant(
        {
          name: 'mockRestaurant3',
          address: 'mockAddress3',
          imageUrl: 'mockImage3',
          weekClosingTime: new Date(today),
          weekendClosingTime: new Date(today),
          weekendOpeningTime: new Date(today),
          weekOpeningTime: new Date(today),
        },
        mockOwner,
      );
      expect(restaurant).toEqual(singleRestaurant);
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant', async () => {
      const restaurant = await service.updateRestaurant(
        {
          name: 'updatedMock',
        },
        mockOwner,
        '65527d314201bfcdff2ebebe',
      );

      expect(restaurant).toEqual(singleRestaurant);
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant and return boolean', async () => {
      const restaurant = await service.deleteRestaurant(
        mockOwner,
        '65527d314201bfcdff2ebebe',
      );

      expect(restaurant).toBeTruthy;
    });
  });
});
