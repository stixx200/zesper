import { Test, TestingModule } from '@nestjs/testing';
import { MenuResolver } from './menu.resolver';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('MenuResolver', () => {
  let resolver: MenuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, MenuResolver],
    }).compile();

    resolver = module.get<MenuResolver>(MenuResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
