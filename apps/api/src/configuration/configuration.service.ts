import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigurationService {
  private readonly envConfig: EnvConfig;

  static validateInput(envConfig: EnvConfig): EnvConfig {
    const envConfigSchema: joi.ObjectSchema = joi.object({
      NODE_ENV: joi
        .string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      JWT_SECRET: joi.string().required(),
      PRISMA_ENDPOINT: joi.string().required(),
      PRISMA_SECRET: joi.string().required(),
    });
    const { error, value } = joi.validate(envConfig, envConfigSchema);
    if (error) {
      throw new Error(`Configuration validation error: ${error.message}`);
    }
    return value;
  }

  public constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigurationService.validateInput(config);
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get prismaSecret(): string {
    return this.envConfig.PRISMA_SECRET;
  }

  get prismaEndpoint(): string {
    return this.envConfig.PRISMA_ENDPOINT;
  }

  // public getPrismaSecret(): string {
  //   return process.env.JWT_SECRET || 'devSecret';
  // }
}
