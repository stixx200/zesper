import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { AuthModule } from '../auth/auth.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodResolver } from './food.resolver';

@Module({
  imports: [PrismaModule, AuthModule, ConfigurationModule],
  providers: [MenuService, MenuResolver, FoodResolver],
})
export class MenuModule {}
