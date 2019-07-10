import { Module } from '@nestjs/common';
import { HttpStrategy } from './http-strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '@zesper/api/auth/users.module';

@Module({
  imports: [UsersModule],
  exports: [UsersModule],
  providers: [HttpStrategy, AuthService],
})
export class AuthModule {}
