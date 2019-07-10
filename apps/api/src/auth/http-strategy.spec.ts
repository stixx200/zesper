import { Test, TestingModule } from '@nestjs/testing';
import { HttpStrategy } from './http-strategy';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('HttpStrategy', () => {
  let provider: HttpStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpStrategy, AuthService],
    }).compile();

    provider = module.get<HttpStrategy>(HttpStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
