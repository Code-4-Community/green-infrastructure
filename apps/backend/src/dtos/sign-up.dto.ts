import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({description: "The user's email address", example: "test@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({description: "The user's password", example: "password123"})
  @IsString()
  password: string;
}
