import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { mockConsumers } from './consumer.service.spec';
import { CreateConsumer } from './dto/CreateConsumer.dto';
import { UpdateConsumer } from './dto/UpdateConsumer.dto,';

import { AuthJWT } from './auth/auth.entity';

describe('ConsumerController', () => {
  const consumer: AuthJWT = {
    email: mockConsumers[0].email,
    firstName: mockConsumers[0].firstName,
    id: mockConsumers[0].id,
  };

  let controller: ConsumerController;
  let service: ConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [
        {
          provide: ConsumerService,
          useValue: {
            listConsumers: jest.fn().mockResolvedValue(mockConsumers),
            createConsumer: jest.fn().mockResolvedValue(mockConsumers[0]),
            updateConsumer: jest.fn().mockResolvedValue(mockConsumers[0]),
            deleteConsumer: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsumerController>(ConsumerController);
    service = module.get<ConsumerService>(ConsumerService);
  });

  describe('listConsumers', () => {
    it('should return an array of consumers', async () => {
      await expect(controller.listConsumers()).resolves.toEqual(mockConsumers);
    });
  });

  describe('createConsumer', () => {
    it('should return a consumer', async () => {
      const consumer: CreateConsumer = {
        firstName: 'mock',
        lastName: 'mock',
        email: 'mock@mock.com',
        address: 'mock',
        password: 'mock',
      };

      await expect(controller.createConsumer(consumer)).resolves.toEqual(
        mockConsumers[0],
      );
    });
  });

  describe('updateConsumer', () => {
    it('should return a updated consumer', async () => {
      const consumerInfo: UpdateConsumer = {
        firstName: 'mockUpdate',
        lastName: 'mockUpdate',
      };

      await expect(
        controller.updateConsumer(consumerInfo, consumer),
      ).resolves.toEqual(mockConsumers[0]);
    });
  });

  describe('deleteConsumer', () => {
    it('should return boolean', async () => {
      await expect(controller.deleteConsumer(consumer)).resolves.toBe(true);
    });
  });
});
