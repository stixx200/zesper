import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuthModule } from '@zesper/api/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./apps/api/src/schema.graphql'], // Schema for api graphql interface
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
