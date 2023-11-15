import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Restaurant } from '@prisma/client';
import { AuthJWT } from '../owner/auth/auth.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const today = Date.now();

  const mockProduct: Product = {
    id: '65527b68dadd4cc651f4c7c3',
    name: 'mock1',
    category: 'food',
    imageUrl: 'mock',
    price: 1.0,
    isDiscount: false,
    restaurantId: '65527b68dadd4cc651f4c7c1',
  };

  const mockRestaurant: Restaurant = {
    id: '65527b68dadd4cc651f4c7c1',
    name: 'mockrestaurant',
    address: 'mockaddress',
    imageUrl: 'mockurl',
    ownerId: '65527b68dadd4cc651f4c7c2',
    weekClosingTime: new Date(today),
    weekendClosingTime: new Date(today),
    weekendOpeningTime: new Date(today),
    weekOpeningTime: new Date(today),
  };

  const mockOwner: AuthJWT = {
    id: '65527b68dadd4cc651f4c7c2',
    email: 'owner@owner.com',
    firstName: 'owner',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn().mockResolvedValue(mockProduct),
            updateProduct: jest.fn().mockResolvedValue(mockProduct),
            deleteProduct: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('createUser', () => {
    it('should return a product', async () => {
      const product = controller.createProduct(
        {
          name: 'mock1',
          category: 'food',
          imageUrl: 'mock',
          price: 1.0,
          isDiscount: false,
          restaurantId: '65527b68dadd4cc651f4c7c1',
        },
        mockOwner,
      );
      expect(product).resolves.toEqual(mockProduct);
    });
  });

  describe('updateUser', () => {
    it('should return a updated product', async () => {
      const product = controller.updateProduct(
        {
          name: 'updatedMock',
        },
        mockOwner,
        '65527b68dadd4cc651f4c7c1',
      );
      expect(product).resolves.toEqual(mockProduct);
    });
  });

  describe('deleteUser', () => {
    it('should return true to product deleted', async () => {
      const product = controller.deleteProduct(
        mockOwner,
        '65527b68dadd4cc651f4c7c1',
      );

      expect(product).resolves.toBeTruthy();
    });
  });
});
