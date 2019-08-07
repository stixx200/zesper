import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigurationService) {}

  generateToken(data: { id: string }): string {
    return jwt.sign({ userId: data.id }, this.config.jwtSecret, {
      expiresIn: '1d',
    });
  }

  async validateToken(token: string): Promise<any> {
    const plainToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(plainToken, this.config.jwtSecret) as { userId: string };
    return decoded.userId;
  }
}
