import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { PrismaService } from '../prisma/prisma.service';
import { Owner } from './owner.entity';
import { ObjectId } from 'mongodb';

const newConsumerId = new ObjectId().toString();

describe('OwnerService', () => {
  let service: OwnerService;
  let prisma: PrismaService;

  const mockOwners: Owner[] = [
    {
      firstName: 'mock1',
      lastName: 'mock1',
      password: 'mock1',
      email: 'mock@mock.com',
      id: newConsumerId,
      restaurants: [{ id: newConsumerId, name: 'restaurantMock' }],
    },
    {
      firstName: 'mock2',
      lastName: 'mock2',
      password: 'mock2',
      email: 'mock2@mock.com',
      id: newConsumerId,
      restaurants: [],
    },
    {
      firstName: 'mock3',
      lastName: 'mock3',
      password: 'mock3',
      email: 'mock3@mock.com',
      id: newConsumerId,
      restaurants: [
        { id: newConsumerId, name: 'restaurantMock' },
        { id: newConsumerId, name: 'restaurantMock2' },
      ],
    },
  ];

  const singleOwner = mockOwners[0];

  const mockPrisma = {
    owner: {
      findUnique: jest.fn().mockResolvedValue(singleOwner),
      findMany: jest.fn().mockResolvedValue(mockOwners),
      create: jest.fn().mockResolvedValue(singleOwner),
      update: jest.fn().mockResolvedValue(singleOwner),
      delete: jest.fn().mockResolvedValue(singleOwner),
    },
    restaurant: {
      deleteMany: jest.fn().mockResolvedValue(singleOwner.restaurants),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('listOwners', () => {
    it('should return an array of owners', async () => {
      const owners = await service.listOwners();

      expect(owners).toEqual(mockOwners);
    });
  });

  describe('createOwner', () => {
    it('should return an owner', async () => {
      const owner = await service.createOwner({
        email: 'mock4@mock.com',
        firstName: 'mock4',
        lastName: 'mock4',
        password: 'mock4',
      });

      expect(owner).toEqual(singleOwner);
    });
  });

  describe('updateOwner', () => {
    it('should return an updated owner', async () => {
      const updatedOwner = await service.updateOwner(
        { firstName: 'updatedMock', password: 'updatedMock' },
        {
          email: singleOwner.email,
          firstName: singleOwner.firstName,
          id: singleOwner.id,
        },
      );
      expect(updatedOwner).toEqual(singleOwner);
    });
  });

  describe('deleteOwner', () => {
    it('should return true if deleted', async () => {
      const deleted = await service.deleteOwner({
        email: singleOwner.email,
        firstName: singleOwner.firstName,
        id: singleOwner.id,
      });
      expect(deleted).toBeTruthy();
    });
  });
});
