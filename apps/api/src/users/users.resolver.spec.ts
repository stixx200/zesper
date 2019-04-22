import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthPayload } from '@zesper/api-interface';

jest.mock('bcryptjs');
jest.mock('../prisma/prisma.service');

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let prismaServiceMock;

  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, PrismaService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('users', () => {
    it('sends the expected query to prisma service', async () => {
      await resolver.users('args', 'info');
      expect(prismaServiceMock.query.users).toBeCalledWith('args', 'info');
    });
  });

  describe('createUser', () => {
    const createUserData = {
      data: {
        email: 'test@email.de',
        name: 'name',
        password: '1234',
      },
    };

    const createUserReturnData: AuthPayload = {
      token: 'token',
      user: {
        id: '1',
        email: createUserData.data.email,
        name: createUserData.data.name,
      },
    };

    beforeEach(() => {
      prismaServiceMock.exists.User.mockResolvedValue(false);
      prismaServiceMock.mutation.createUser.mockResolvedValue(createUserReturnData);
    });

    it('queries prisma for user with email', async () => {
      await resolver.createUser(createUserData, '');
      expect(prismaServiceMock.exists.User).toBeCalledWith({
        email: 'test@email.de',
      });
    });

    it('throws an error if email is already taken', async () => {
      expect.assertions(1);
      prismaServiceMock.exists.User.mockResolvedValueOnce(true);
      try {
        await resolver.createUser(createUserData, '');
      } catch (err) {
        expect(err.message).toMatch(/already taken/);
      }
    });

    it('uses bcrypt to hash password', async () => {
      await resolver.createUser(createUserData, '');
      expect(bcrypt.hash).toBeCalledWith(createUserData.data.password, 10);
    });

    it('creates the user with prisma mutation with hashed password', async () => {
      bcrypt.hash.mockResolvedValue('hashed');
      await resolver.createUser(createUserData, '');
      expect(prismaServiceMock.mutation.createUser).toBeCalledWith({
        data: {
          ...createUserData.data,
          password: 'hashed',
        },
      });
    });

    it('returns an object containing the user and the jwt', async () => {
      const result = await resolver.createUser(createUserData, '');
      expect(result.user).toEqual({
        token: 'token',
        user: {
          id: '1',
          name: createUserData.data.name,
          email: createUserData.data.email,
        },
      });
    });
  });
});
