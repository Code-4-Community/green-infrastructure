import { UserStatus, UserRole } from '../types';
import {
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class UpdateUserRequestDTO {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

}