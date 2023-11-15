import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { AuthJWT } from '../owner/auth/auth.entity';
import { Restaurant } from './restaurant.entity';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  const today = Date.now();

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: {
            listAllRestaurants: jest.fn().mockResolvedValue(mockRestaurants),
            createRestaurant: jest.fn().mockResolvedValue(singleRestaurant),
            updateRestaurant: jest.fn().mockResolvedValue(singleRestaurant),
            deleteRestaurant: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  describe('listAllRestaurants', () => {
    it('should list all restaurants', async () => {
      const restaurants = await controller.listAllRestaurants();
      expect(restaurants).toEqual(mockRestaurants);
    });
  });

  describe('createRestaurant', () => {
    it('should create and return a restaurant', async () => {
      const restaurant = await controller.createRestaurant(
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
    it('should update and return a restaurant', async () => {
      const restaurant = await controller.updateRestaurant(
        {
          name: 'mockUpdated',
        },
        mockOwner,
        '65527d314201bfcdff2ebebe',
      );

      expect(restaurant).toEqual(singleRestaurant);
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant and return true', async () => {
      const restaurant = await controller.deleteRestaurant(
        mockOwner,
        '65527d314201bfcdff2ebebe',
      );

      expect(restaurant).toBeTruthy();
    });
  });
});
