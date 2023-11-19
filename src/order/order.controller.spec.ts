import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthJWT } from '../owner/auth/auth.entity';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            listRestaurantOrdersById: jest.fn().mockResolvedValue(mockOrders),
            createOrder: jest.fn().mockResolvedValue(mockOrders[0]),
            updateOrderState: jest.fn().mockResolvedValue(mockOrders[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('listRestaurantOrderById', () => {
    it('should return restaurant order list', async () => {
      const order = await controller.listRestaurantOrdersById(
        mockOwner,
        mockRestaurantId,
      );
      expect(order).toEqual(mockOrders);
    });
  });

  describe('createOrder', () => {
    it('should create and return an order', async () => {
      const order = await controller.createOrder(
        { ids: [mockProducts[0].id] },
        mockConsumer,
        mockRestaurantId,
      );

      expect(order).toEqual(mockOrders[0]);
    });
  });

  describe('updateOrderState', () => {
    it('should update and return an order', async () => {
      const order = await controller.updateOrderState(
        { state: 'delivered' },
        mockOwner,
        mockOrders[0].id,
      );

      expect(order).toEqual(mockOrders[0]);
    });
  });
});
