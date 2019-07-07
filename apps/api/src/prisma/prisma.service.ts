import { Injectable } from '@nestjs/common';
import { Prisma } from './generated/prisma.binding';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class PrismaService extends Prisma {
  constructor(private config: ConfigurationService) {
    super({
      endpoint: config.prismaEndpoint,
      debug: false,
      secret: config.prismaSecret,
    });
  }
}
