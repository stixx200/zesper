import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}

  async validateUser(token: string): Promise<any> {
    return { a: 1 }; //await this.usersService.findOneByToken(token);
  }
}
