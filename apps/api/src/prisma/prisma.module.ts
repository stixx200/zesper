import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigurationModule } from '@zesper/api/configuration/configuration.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfigurationModule],
})
export class PrismaModule {}
