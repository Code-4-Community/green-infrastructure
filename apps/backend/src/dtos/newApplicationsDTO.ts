import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsArray,
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsEmail,
} from 'class-validator';

export enum ApplicationStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  DENIED = 'Denied',
}

export class NewApplicationInput {
  @ApiProperty({
    description:
      'User ID of the applicant (optional for first-time applications)',
    example: 123,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    description:
      'First name of the applicant (required for first-time applications)',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description:
      'Last name of the applicant (required for first-time applications)',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description:
      'Email of the applicant (required for first-time applications)',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description:
      'Phone number of the applicant (required for first-time applications)',
    example: '6175551234',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description:
      'ZIP code of the applicant (required for first-time applications)',
    example: '02108',
    required: false,
  })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({
    description:
      'Birth date of the applicant (required for first-time applications)',
    example: '1990-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'Site ID associated with the application',
    example: 456,
  })
  @IsNumber()
  siteId: number;

  @ApiProperty({
    description:
      'Array of names associated with the application (defaults to an empty array if not provided)',
    example: ['John Doe', 'Jane Doe'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  names: string[] = []; // Default to an empty array if not provided

  @ApiProperty({
    description: 'Status of the application',
    enum: ApplicationStatus,
    example: ApplicationStatus.PENDING,
    required: false,
  })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status: ApplicationStatus = ApplicationStatus.PENDING; // Default to "PENDING"

  @ApiProperty({
    description:
      'Date the application was submitted (defaults to an ISO string if not provided)',
    example: '2025-02-06T10:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  dateApplied: string = new Date().toISOString(); // Default to ISO string

  @ApiProperty({
    description: 'Indicates if this is the user’s first application',
    example: true,
  })
  @IsBoolean()
  isFirstApplication: boolean;
}
