import { Resolver, Query } from '@nestjs/graphql';
import { User } from '@zesper/api-interface';
import { PrismaService } from './prisma.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly prismaService: PrismaService) {}
  @Query()
  async users(): Promise<User> {
    return this.prismaService.query.users();
  }
}
