import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User, CreateUserInput, AuthPayload } from '@zesper/api-interface';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async users(@Args() args, @Info() info): Promise<User[]> {
    return await this.prisma.query.users(args, info);
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

    const user = await this.prisma.mutation.createUser({
      data: {
        name: args.data.name,
        email: args.data.email,
        password,
      },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      }),
    };
  }
}
