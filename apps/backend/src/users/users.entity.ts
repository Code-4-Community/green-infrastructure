import {
    IsEmail,
    IsEnum,
    IsPositive,
    IsString,
    IsPhoneNumber,
    IsNumber,
    IsDate,
  } from 'class-validator';
  import { Entity, Column } from 'typeorm';
  import { UserRole, UserStatus } from './types';
  
  @Entity()
  export class User {
    @Column({ primary: true, generated: true })
    @IsPositive()
    id: number;
  
    @Column('varchar')
    @IsEnum(UserStatus)
    status: UserStatus;

    @Column('varchar')
    @IsEnum(UserRole)
    role: UserRole;
  
    @Column()
    @IsString()
    firstName: string;
  
    @Column()
    @IsString()
    lastName: string;
  
    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsPhoneNumber()
    phoneNumber: number;

    @Column()
    @IsNumber()
    zipCode: number;

    @Column()
    @IsDate()
    birthDate: string;

  }