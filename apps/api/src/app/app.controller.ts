import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): string {
    return this.appService.getData();
  }
}
