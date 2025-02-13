import {
    BadRequestException,
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInResponseDto } from '../dtos/sign-in-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Post('/signup')
    async createUser(@Body() signUpDto: SignUpDto) {
        try {
        await this.authService.signup(signUpDto);
        } catch (e) {
        throw new BadRequestException(e.message);
        }
    }

    @Post('/signin')
    signin(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signin(signInDto);
    }

}