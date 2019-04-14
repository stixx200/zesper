import { Request } from 'express';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./apps/api/src/schema.graphql'], // Schema for api graphql interface
      context(request: { req: Request }) {
        return {
          request: request.req,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
