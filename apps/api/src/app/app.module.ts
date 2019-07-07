import { Request } from 'express';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';

import { UsersModule } from '@zesper/api/users/users.module';
import { AppService } from './app.service';

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
