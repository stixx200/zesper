import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Resolver, Query, Mutation, Args, Info, Context } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User, CreateUserInput, LoginUserInput, AuthPayload, UserQuery } from '@zesper/api-interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { UserCreateInput } from '@zesper/api/prisma/generated/prisma.binding';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  private static generateToken(data: { id: String }) {
    return jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  private static getUserId(headers: Headers, requireAuth = true) {
    const authHeader = headers['authorization'];
  
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      return decoded.userId;
    }
  
    if (requireAuth) {
      throw new Error('Authentication required');
    }
  
    return null;
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async users(@Args() args, @Info() info): Promise<User[]> {
    return await this.prisma.query.users(args, info);
  }

  /**
   * Queries a user with either id or email. If both are provided id is used.
   * @param args
   * @param info
   */
  @Query()
  @UseGuards(GqlAuthGuard)
  async user(@Args() args, @Info() info): Promise<User> {
    const query: UserQuery = args.query;

    if (!query.id && !query.email) {
      throw new Error('You must provide either id or email!');
    }

    let opArgs;
    if (query.id) {
      opArgs = { where: { id: query.id } };
    } else {
      opArgs = { where: { email: query.email } };
    }

    return await this.prisma.query.user(opArgs, info);
  }

  @Mutation()
  async createUser(@Args() args: { data: CreateUserInput }, @Info() info): Promise<AuthPayload> {
    const emailTaken = await this.prisma.exists.User({
      email: args.data.email,
    });
    if (emailTaken) {
      throw new Error('Email already taken!');
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const data: UserCreateInput = {
      name: args.data.name,
      email: args.data.email,
      password,
      admin: !!args.data.isAdmin,
    };
    const user = await this.prisma.mutation.createUser({
      data,
    });

    return {
      user: {
        ...user,
        isAdmin: user.admin,
      },
      token: UsersResolver.generateToken({ id: user.id }),
    };
  }

  @Mutation()
  async login(@Args() args: { data: LoginUserInput }, @Info() info): Promise<AuthPayload> {
    const user = await this.prisma.query.user({
      where: {
        email: args.data.email,
      },
    });
    if (!user) {
      throw new Error('Unable to authenticate');
    }
    if (!(await bcrypt.compare(args.data.password, user.password))) {
      throw new Error('Unable to authenticate');
    }
    return {
      user: {
        ...user,
        isAdmin: user.admin,
      },
      token: UsersResolver.generateToken({ id: user.id }),
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args() args, @Context() ctx, @Info() info): Promise<User> {
    const userId = UsersResolver.getUserId(ctx.req.headers);
    return await this.prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info,
    );
  }
}