import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Food } from '@zesper/api-interface';

@Resolver('Food')
export class FoodResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async foods(@Args() args, @Info() info): Promise<Food[]> {
    return this.prisma.query.foods(args, info);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createFood(@Args() args, @Info() info): Promise<Food> {
    return this.prisma.mutation.createFood({
      data: {
        name: args.name,
        price: args.price,
      },
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateFood(@Args() args, @Info() info): Promise<Food> {
    return this.prisma.mutation.updateFood({
      data: {
        name: args.name,
        price: args.price,
      },
      where: {
        id: args.foodId,
      },
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteFood(@Args() args, @Info() info): Promise<Food> {
    return this.prisma.mutation.deleteFood({ where: { id: args.id } });
  }
}
