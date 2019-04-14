import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Resolver, Query, Mutation, Args, Info, Context } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User, CreateUserInput, LoginUserInput, AuthPayload } from '@zesper/api-interface';
import { updateSourceFileNode } from 'typescript';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  private generateToken(data: { id: String }) {
    return jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  private getUserId(request: Request, requireAuth = true) {
    const header = request.headers.authorization as string;

    if (header) {
      const token = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.userId;
    }

    if (requireAuth) {
      throw new Error('Authentication required');
    }

    return null;
  }

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
      token: this.generateToken({ id: user.id }),
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
      user,
      token: this.generateToken({ id: user.id }),
    };
  }

  @Mutation()
  async deleteUser(@Args() args, @Context() ctx, @Info() info): Promise<User> {
    const userId = this.getUserId(ctx.request);
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
