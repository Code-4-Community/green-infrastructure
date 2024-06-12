import { IsArray, IsBoolean, IsDate, IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpRequestDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phoneNumber: number;

  @IsNumber()
  zipCode: number;

  @IsDate()
  birthdate: Date;

  @IsNumber() 
  userId: number;

  @IsNumber() 
  featureId: number;
  
  @IsBoolean()
  safetyChecked: boolean;

  @IsBoolean()
  privacyChecked: boolean;

  @IsBoolean()
  releaseChecked: boolean;

  @IsArray()
  names: string[]

}