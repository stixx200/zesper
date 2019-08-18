import { Test, TestingModule } from '@nestjs/testing';
import { MenuResolver } from './menu.resolver';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('MenuResolver', () => {
  let prismaServiceMock;
  let resolver: MenuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, MenuResolver],
    }).compile();

    prismaServiceMock = module.get<PrismaService>(PrismaService);
    resolver = module.get<MenuResolver>(MenuResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('menus', () => {
    it('sends the expected query to prisma service', async () => {
      await resolver.menus('args', 'info');
      expect(prismaServiceMock.query.menus).toBeCalledWith('args', 'info');
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

      prismaServiceMock.query.menus.mockResolvedValue(data);
      const menus = await resolver.menus('args', 'info');
      expect(menus).toEqual(data);
    });
  });

  describe('createMenu', () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.createMenu({
        name: 'menu1',
        foodIds: ['foodId1', 'foodId2'],
      }, 'info');
      expect(prismaServiceMock.mutation.createMenu).toBeCalledWith({
        data: {
          name: 'menu1',
          items: {
            connect: [
              { id: 'foodId1' },
              { id: 'foodId2' },
            ],
          },
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.createMenu.mockResolvedValue(data);
      const food = await resolver.createMenu({
        name: 'menu1',
        foodIds: ['foodId1', 'foodId2'],
      }, 'info');
      expect(food).toEqual(data);
    });
  });

  describe('updateMenu',  () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.updateMenu({
        name: 'menu1',
        foodIds: ['foodId1', 'foodId2'],
        menuId: 'id1',
      }, 'info');
      expect(prismaServiceMock.mutation.updateMenu).toBeCalledWith({
        data: {
          name: 'menu1',
          items: {
            connect: [
              { id: 'foodId1' },
              { id: 'foodId2' },
            ],
          },
        },
        where: {
          id: 'id1',
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.updateMenu.mockResolvedValue(data);
      const food = await resolver.updateMenu({
        name: 'menu1',
        foodIds: ['foodId1', 'foodId2'],
        menuId: 'id1',
      }, 'info');
      expect(food).toEqual(data);
    });
  });

  describe('deleteMenu',  () => {
    it('sends the expected mutation to prisma service', async () => {
      await resolver.deleteMenu({
        id: 'id1',
      }, 'info');
      expect(prismaServiceMock.mutation.deleteMenu).toBeCalledWith({
        where: {
          id: 'id1',
        },
      });
    });

    it('returns data returned by prisma', async () => {
      const data = { id: 'id1' };
      prismaServiceMock.mutation.deleteMenu.mockResolvedValue(data);
      const food = await resolver.deleteMenu({
        id: 'id1',
      }, 'info');
      expect(food).toEqual(data);
    });
  });
});
