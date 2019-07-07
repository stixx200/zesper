import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(`config/${process.env.NODE_ENV}.env`),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
