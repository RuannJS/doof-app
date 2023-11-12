import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';
import { ObjectId } from 'mongodb';
import { AuthJWT } from './auth/auth.entity';

const newConsumerId = ObjectId.toString();

describe('OwnerController', () => {
  let controller: OwnerController;
  let service: OwnerService;

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

  const owner: AuthJWT = {
    email: mockOwners[0].email,
    firstName: mockOwners[0].firstName,
    id: mockOwners[0].id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [
        {
          provide: OwnerService,
          useValue: {
            listOwners: jest.fn().mockResolvedValue(mockOwners),
            createOwner: jest.fn().mockResolvedValue(singleOwner),
            updateOwner: jest.fn().mockResolvedValue(singleOwner),
            deleteOwner: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
    service = module.get<OwnerService>(OwnerService);
  });

  describe('listOwners', () => {
    it('should return an array of owners', async () => {
      const owners = await controller.listOwners();

      expect(owners).toEqual(mockOwners);
    });
  });

  describe('createOwner', () => {
    it('should return an owner', async () => {
      const owner = await controller.createOwner({
        email: 'mock@mock.com',
        firstName: 'mock',
        lastName: 'mock',
        password: 'mock',
      });

      expect(owner).toEqual(singleOwner);
    });
  });

  describe('updateOwner', () => {
    it('should return an updated owner', async () => {
      const updatedOwner = await controller.updateOwner(
        { firstName: 'mockUpdate', email: 'mockUpdate' },
        owner,
      );
      expect(updatedOwner).toEqual(singleOwner);
    });
  });

  describe('deleteOwner', () => {
    it('should return boolean', async () => {
      const deleted = await controller.deleteOwner(owner);

      expect(deleted).toBeTruthy();
    });
  });
});
