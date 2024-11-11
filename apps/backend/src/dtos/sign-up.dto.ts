import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  zipCode: string;

  @IsDate()
  birthDate: string;

}
