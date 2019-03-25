import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UserResolver } from './user.resolver';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./apps/api/src/app/appmodel.graphql'],
    }) // settings for underlaying apollo server
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserResolver]
})
export class AppModule {}
