import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationsService } from '../applications/applications.service';
import { Application } from '../applications/applications.entity';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ApplicationsService, JwtStrategy, CurrentUserInterceptor],
})
export class AuthModule {}