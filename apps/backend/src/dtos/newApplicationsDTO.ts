import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export enum ApplicationStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  DENIED = 'Denied',
}

export class NewApplicationInput {
  @ApiProperty({
    description: 'User ID of the applicant',
    example: 123,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Site ID associated with the application',
    example: 456,
  })
  @IsNumber()
  siteId: number;

  @ApiProperty({
    description: 'Array of names associated with the application (defaults to an empty array if not provided)',
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
    description: 'Date the application was submitted (defaults to an ISO string if not provided)',
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
