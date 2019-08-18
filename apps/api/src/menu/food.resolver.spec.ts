import { Test, TestingModule } from '@nestjs/testing';
import { FoodResolver } from './food.resolver';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('FoodResolver', () => {
  let prismaServiceMock;
  let resolver: FoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, FoodResolver],
    }).compile();

    prismaServiceMock = module.get<PrismaService>(PrismaService);
    resolver = module.get<FoodResolver>(FoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('foods', () => {
    it('sends the expected query to prisma service', async () => {
      await resolver.foods('args', 'info');
      expect(prismaServiceMock.query.foods).toBeCalledWith('args', 'info');
    });

    it('returns all foods returned by prisma', async () => {
      const data = [
        {
          id: 'id1',
        },
        {
          id: 'id2',
        },
      ];

      prismaServiceMock.query.foods.mockResolvedValue(data);
      const foods = await resolver.foods('args', 'info');
      expect(foods).toEqual(data);
    });
  });

  describe('createFood', () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.createFood(
        {
          name: 'food1',
          price: 1.2,
        },
        'info',
      );
      expect(prismaServiceMock.mutation.createFood).toBeCalledWith({
        data: {
          name: 'food1',
          price: 1.2,
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.createFood.mockResolvedValue(data);
      const food = await resolver.createFood(
        {
          name: 'food1',
          price: 2.1,
        },
        'info',
      );
      expect(food).toEqual(data);
    });
  });

  describe('updateFood', () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.updateFood(
        {
          foodId: 'id1',
          name: 'changedFood',
          price: 1.2,
        },
        'info',
      );
      expect(prismaServiceMock.mutation.updateFood).toBeCalledWith({
        data: {
          name: 'changedFood',
          price: 1.2,
        },
        where: {
          id: 'id1',
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.updateFood.mockResolvedValue(data);
      const food = await resolver.updateFood(
        {
          foodId: 'id1',
          name: 'changedFood',
          price: 2.1,
        },
        'info',
      );
      expect(food).toEqual(data);
    });
  });

  describe('deleteFood', () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.deleteFood(
        {
          id: 'id1',
        },
        'info',
      );
      expect(prismaServiceMock.mutation.deleteFood).toBeCalledWith({
        where: {
          id: 'id1',
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.deleteFood.mockResolvedValue(data);
      const food = await resolver.deleteFood(
        {
          id: 'id1',
        },
        'info',
      );
      expect(food).toEqual(data);
    });
  });
});
