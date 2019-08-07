import { Test, TestingModule } from '@nestjs/testing';
import { FoodResolver } from './food.resolver';

describe('FoodResolver', () => {
  let resolver: FoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodResolver],
    }).compile();

    resolver = module.get<FoodResolver>(FoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
