import { Test, TestingModule } from '@nestjs/testing';
import { FoodResolver } from './food.resolver';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('FoodResolver', () => {
  let resolver: FoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, FoodResolver],
    }).compile();

    resolver = module.get<FoodResolver>(FoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
