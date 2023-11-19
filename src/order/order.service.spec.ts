import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Product } from '../product/product.entity';
import { Order } from './order.entity';
import { AuthJWT } from '../owner/auth/auth.entity';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;

  const elapsed = Date.now();
  const today = new Date(elapsed);

  const mockRestaurantId = '655956f1b9f4afffd0053910';
  const mockOwnerId = '65595726b9f4afffd0053911';
  const mockConsumerId = '65595726b9f4afffd0053914';

  const mockConsumer: AuthJWT = {
    id: mockConsumerId,
    email: 'consumer@consumer.com',
    firstName: 'consumer',
  };

  const mockOwner: AuthJWT = {
    id: mockOwnerId,
    email: 'owner@owner.com',
    firstName: 'owner',
  };

  const mockRestaurant: Restaurant = {
    id: mockRestaurantId,
    address: 'mockAddress',
    imageUrl: 'mockImage',
    name: 'mockName',
    ownerId: mockOwnerId,
    weekClosingTime: today,
    weekendClosingTime: today,
    weekendOpeningTime: today,
    weekOpeningTime: today,
  };

  const mockProducts: Product[] = [
    {
      id: '65595726b9f4afffd0053912',
      name: 'mockProduct',
      category: 'food',
      imageUrl: 'mockProduct',
      isDiscount: false,
      price: 10,
      restaurantId: mockRestaurantId,
    },
    {
      id: '65595726b9f4afffd0053913',
      name: 'mockProduct',
      category: 'food',
      imageUrl: 'mockProduct',
      isDiscount: false,
      price: 10,
      restaurantId: mockRestaurantId,
    },
  ];

  const mockOrders: Order[] = [
    {
      id: '65595726b9f4afffd0053914',
      consumerId: mockConsumerId,
      createdAt: today,
      restaurantId: mockRestaurantId,
      state: 'preparing',
      updatedAt: today,
      products: [mockProducts[0], mockProducts[0]],
    },
    {
      id: '65595726b9f4afffd0053914',
      consumerId: mockConsumerId,
      createdAt: today,
      restaurantId: mockRestaurantId,
      state: 'preparing',
      updatedAt: today,
      products: [mockProducts[1], mockProducts[0]],
    },
  ];

  const mockPrisma = {
    restaurant: {
      findUnique: jest.fn().mockResolvedValue(mockRestaurant),
    },

    order: {
      findMany: jest.fn().mockResolvedValue(mockOrders),
      create: jest.fn().mockResolvedValue(mockOrders[0]),
      findUnique: jest.fn().mockResolvedValue(mockOrders[0]),
      update: jest.fn().mockResolvedValue(mockOrders[0]),
    },

    product: {
      findMany: jest.fn().mockResolvedValue(mockProducts),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('listOrdersById', () => {
    it('should return a restaurant order list', async () => {
      const orders = await service.listRestaurantOrdersById(
        mockOwner,
        mockRestaurantId,
      );

      expect(orders).toEqual(mockOrders);
    });
  });

  describe('createOrder', () => {
    it('should create a order and return it', async () => {
      const order = await service.createOrder(
        { ids: [mockProducts[0].id] },
        mockConsumer,
        mockRestaurantId,
      );

      expect(order).toEqual(mockOrders[0]);
    });
  });

  describe('updateOrderState', () => {
    it('should update a order state and return it ', async () => {
      const order = await service.updateOrderState(
        { state: 'inRoute' },
        mockOwner,
        mockOrders[0].id,
      );

      expect(order).toEqual(mockOrders[0]);
    });
  });
});
