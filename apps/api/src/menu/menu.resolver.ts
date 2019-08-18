import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Menu } from '@zesper/api-interface';

interface CreateMenuArgs {
  name: string;
  foodIds: string[];
}

interface UpdateMenuArgs extends CreateMenuArgs {
  menuId: string;
}

interface DeleteMenuArgs {
  id: string;
}

@Resolver('Menu')
export class MenuResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async menus(@Args() args, @Info() info): Promise<Menu[]> {
    return this.prisma.query.menus(args, info);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createMenu(@Args() args: CreateMenuArgs, @Info() info): Promise<Menu> {
    return this.prisma.mutation.createMenu({
      data: {
        name: args.name,
        items: {
          connect: args.foodIds.map(id => ({ id })),
        },
      },
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateMenu(@Args() args: UpdateMenuArgs, @Info() info): Promise<Menu> {
    return this.prisma.mutation.updateMenu({
      data: {
        name: args.name,
        items: {
          connect: args.foodIds.map(id => ({ id })),
        },
      },
      where: {
        id: args.menuId,
      },
    });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteMenu(@Args() args: DeleteMenuArgs, @Info() info): Promise<Menu> {
    return this.prisma.mutation.deleteMenu({
      where: {
        id: args.id,
      },
    });
  }
}
