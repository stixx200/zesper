import { Module } from '@nestjs/common';
import { HttpStrategy } from './http-strategy';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [PrismaModule, ConfigurationModule],
  exports: [],
  providers: [HttpStrategy, AuthService, UsersResolver],
})
export class AuthModule {}
