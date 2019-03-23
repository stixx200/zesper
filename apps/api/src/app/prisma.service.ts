import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma-binding';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      typeDefs: 'apps/api/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    });
  }
}
