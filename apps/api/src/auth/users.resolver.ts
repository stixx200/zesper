import * as bcrypt from 'bcryptjs';
import { Resolver, Query, Mutation, Args, Info, Context } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput, LoginUserInput, AuthPayload, UserQuery } from '@zesper/api-interface';
import { User } from '../generated/prisma.binding';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { UserCreateInput } from '../generated/prisma.binding';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthService } from './auth.service';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigurationService,
    private readonly auth: AuthService,
  ) {}

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
    const users = await this.prisma.query.users({});

    const hashedPassword = await bcrypt.hash(args.data.password, 10);

    const data: UserCreateInput = {
      name: args.data.name,
      email: args.data.email,
      password: hashedPassword,
      admin: users.length === 0,
    };
    const user = await this.prisma.mutation.createUser({
      data,
    });

    return {
      user: {
        ...this.adaptUserForPayload(user),
        isAdmin: user.admin,
      },
      token: this.auth.generateToken({ id: user.id }),
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
        ...this.adaptUserForPayload(user),
        isAdmin: user.admin,
      },
      token: this.auth.generateToken({ id: user.id }),
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args() args, @Context() ctx, @Info() info): Promise<User> {
    // const userId = UsersResolver.getUserId(ctx.request);
    const id = await this.auth.validateToken(ctx.req.headers.authorization);
    return await this.prisma.mutation.deleteUser(
      {
        where: {
          id,
        },
      },
      info,
    );
  }

  private adaptUserForPayload(input: User) {
    const { admin, password, ...remaining } = input;
    return remaining;
  }
}
