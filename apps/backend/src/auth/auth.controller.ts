import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UseInterceptors,
  } from '@nestjs/common';
  
  import { SignInRequestDto } from './dtos/sign-in.request.dto';
  import { SignUpRequestDTO } from './dtos/sign-up.request.dto';
  import { AuthService } from './auth.service';
  import { SignInResponseDto } from './dtos/sign-in.response.dto';
  import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { ApplicationsService } from '../applications/applications.service';
import { Application } from '../applications/applications.entity';
  
  @Controller('auth')
  @UseInterceptors(CurrentUserInterceptor)
  export class AuthController {
    constructor(
      private authService: AuthService,
      private applicationsService: ApplicationsService,
    ) {}
  
    @Post('/signup')
    async createUser(@Body() signUpDto: SignUpRequestDTO): Promise<Application> {
  
      try {
        await this.authService.signup(signUpDto);
      } catch (e) {
        throw new BadRequestException(e.message);
      }
  
      const user = await this.applicationsService.create(
        signUpDto.userId,
        signUpDto.featureId,
        signUpDto.safetyChecked, 
        signUpDto.privacyChecked, 
        signUpDto.releaseChecked, 
        signUpDto.names,
      );
  
      return user;
    }
  
    @Post('/signin')
    signin(@Body() signInDto: SignInRequestDto): Promise<SignInResponseDto> {
      return this.authService.signin(signInDto);
    }

  }