import { Test, TestingModule } from '@nestjs/testing';
import { HttpStrategy } from './http-strategy';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('./auth.service');

describe('HttpStrategy', () => {
  let provider: HttpStrategy;
  let authServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpStrategy, AuthService],
    }).compile();

    provider = module.get<HttpStrategy>(HttpStrategy);
    authServiceMock = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('validate', () => {
    it('calls validateToken on auth service to validate user', async () => {
      authServiceMock.validateToken.mockResolvedValue('Hugo');

      await provider.validate('myToken');
      expect(authServiceMock.validateToken).toHaveBeenCalledWith('myToken');
    });

    it('throws UnauthorizedException when validateToken does not return a user', async () => {
      authServiceMock.validateToken.mockResolvedValue(null);

      await expect(provider.validate('myToken')).rejects.toThrow(UnauthorizedException);
    });
  });
});
