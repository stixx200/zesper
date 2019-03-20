import { Injectable } from '@nestjs/common';
import { Message } from '@zesper/api-interface';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
