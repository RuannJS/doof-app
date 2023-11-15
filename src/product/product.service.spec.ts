import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './product.entity';
import { AuthJWT } from 'src/owner/auth/auth.entity';
import { Restaurant } from '@prisma/client';

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

const mockPrisma = {
  product: {
    findUnique: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(true),
  },
  restaurant: {
    findUnique: jest.fn().mockResolvedValue(mockRestaurant),
  },
};

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createProduct', () => {
    it('should return a new product', async () => {
      const product = service.createProduct(
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

  describe('updateProduct', () => {
    it('should return an updated product', async () => {
      const product = service.updateProduct(
        { name: 'updatedMock', isDiscount: true },
        mockOwner,
        '65527b68dadd4cc651f4c7c3',
      );

      expect(product).resolves.toEqual(mockProduct);
    });
  });

  describe('deletProduct', () => {
    it('should return a boolean', async () => {
      const product = service.deleteProduct(
        mockOwner,
        '65527b68dadd4cc651f4c7c3',
      );

      expect(product).resolves.toBeTruthy();
    });
  });
});
