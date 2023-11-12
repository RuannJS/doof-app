import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';
import { PrismaService } from '../prisma/prisma.service';
import { Consumer } from './consumer.entity';
import { ObjectId } from 'mongodb';

const newConsumerId = new ObjectId().toString();

export const mockConsumers: Consumer[] = [
  {
    firstName: 'mock1',
    lastName: 'mock1',
    email: 'mock1@email.com',
    address: 'mock1 address',
    password: 'mock1',
    id: newConsumerId,
  },

  {
    firstName: 'mock2',
    lastName: 'mock2',
    email: 'mock2@email.com',
    address: 'mock2 address',
    password: 'mock2',
    id: newConsumerId,
  },

  {
    firstName: 'mock3',
    lastName: 'mock3',
    email: 'mock3@email.com',
    address: 'mock3 address',
    password: 'mock3',
    id: newConsumerId,
  },
];

const singleConsumer: Consumer = mockConsumers[2];

const mockPrisma = {
  consumer: {
    findUnique: jest.fn().mockResolvedValue(singleConsumer),
    findMany: jest.fn().mockResolvedValue(mockConsumers),
    create: jest.fn().mockReturnValue(singleConsumer),
    update: jest.fn().mockResolvedValue(singleConsumer),
    delete: jest.fn().mockResolvedValue(singleConsumer),
  },
};

describe('ConsumerService', () => {
  let service: ConsumerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('listConsumers', () => {
    it('should return an array of consumers', async () => {
      const consumers = await service.listConsumers();
      expect(consumers).toBe(mockConsumers);
    });
  });

  describe('createConsumer', () => {
    it('should create a consumer ', async () => {
      const consumer = await service.createConsumer({
        firstName: 'mock',
        lastName: 'mock',
        address: 'mock',
        email: 'mock@email.com',
        password: 'mock',
      });
      expect(consumer).toEqual(singleConsumer);
    });
  });

  describe('updateConsumer', () => {
    it('should return a consumer', async () => {
      const consumer = await service.updateConsumer(
        { firstName: 'updatedMock', address: 'updatedMock' },
        { email: 'mock3@email.com', firstName: 'mock', id: newConsumerId },
      );
      expect(consumer).toEqual(singleConsumer);
    });
  });

  describe('deleteUser', () => {
    it('should return true to consumer deleted', async () => {
      const consumer = await service.deleteConsumer({
        email: 'mock3@email.com',
        firstName: 'mock',
        id: newConsumerId,
      });
      expect(consumer).toBeTruthy();
    });
  });
});
