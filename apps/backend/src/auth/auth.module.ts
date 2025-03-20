import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt '}),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}