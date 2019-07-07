import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';
// import * as mock from 'mock-fs';
import mock from 'mock-fs';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let configContent: string;

  describe('invalid configuration', function() {
    afterEach(() => {
      mock.restore();
    });

    it('throws error if PRISMA_ENDPOINT is missing', async () => {
      configContent = `
        PRISMA_SECRET=secret1        
        JWT_SECRET=secret2
      `;

      mock({
        'config/test.env': configContent,
      });

      expect(() => new ConfigurationService(`config/${process.env.NODE_ENV}.env`)).toThrow(/validation error/);
    });

    it('throws error if PRISMA_SECRET is missing', async () => {
      configContent = `
        PRISMA_ENDPOINT=http://endpoint        
        JWT_SECRET=secret2
      `;

      mock({
        'config/test.env': configContent,
      });

      expect(() => new ConfigurationService(`config/${process.env.NODE_ENV}.env`)).toThrow(/validation error/);
    });

    it('throws error if JWT_SECRET is missing', async () => {
      configContent = `
        PRISMA_ENDPOINT=http://endpoint        
        PRISMA_SECRET=secret1                
      `;

      mock({
        'config/test.env': configContent,
      });

      expect(() => new ConfigurationService(`config/${process.env.NODE_ENV}.env`)).toThrow(/validation error/);
    });
  });

  describe('with valid configuration', function() {
    beforeEach(async () => {
      configContent = `
        JWT_SECRET=secret
        PRISMA_ENDPOINT=ep
        PRISMA_SECRET=secret2
      `;

      mock({
        'config/test.env': configContent,
      });

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ConfigurationService,
            useValue: new ConfigurationService(`config/${process.env.NODE_ENV}.env`),
          },
        ],
      }).compile();

      service = module.get<ConfigurationService>(ConfigurationService);
    });

    afterEach(() => {
      mock.restore();
    });

    it('returns expected value with jwtSecret getter', function() {
      expect(service.jwtSecret).toEqual('secret');
    });

    it('returns expected value with prismaSecret getter', function() {
      expect(service.prismaSecret).toEqual('secret2');
    });

    it('returns expected value with jwtSecret getter', function() {
      expect(service.prismaEndpoint).toEqual('ep');
    });
  });
});
