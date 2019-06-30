/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { environment } from './environments/environment';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(environment.dotenvPath) });
console.log(`Using env file: ${resolve(environment.dotenvPath)}`);

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api`);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();
