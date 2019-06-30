import { Injectable } from '@nestjs/common';
import { Prisma } from './generated/prisma.binding';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      endpoint: 'http://localhost:4466/zesper/dev',
      debug: false,
      secret: process.env.PRISMA_SECRET,
    });
  }
}
