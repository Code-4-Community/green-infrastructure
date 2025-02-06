import {
BadRequestException,
Body,
Controller,
Post
} from '@nestjs/common';

import { NewUserInput } from '../dtos/newUserDTO';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInResponseDto } from '../dtos/sign-in-response.dto';
//import { AuthGuard } from '@nestjs/passport';
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
        // By default, creates a standard user
        try {
        await this.authService.signup(signUpDto);
        } catch (e) {
        throw new BadRequestException(e.message);
        }

        const newUser: NewUserInput = {
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            phoneNumber: signUpDto.phoneNumber,
            email: signUpDto.email,
            zipCode: signUpDto.zipCode,
            birthDate: signUpDto.birthDate,
        };

        const user = await this.userService.postUserVolunteer(newUser);

        return user;
    }

    @Post('/signin')
    signin(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signin(signInDto);
    }

}