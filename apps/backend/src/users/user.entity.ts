import {
    IsArray,
    IsEmail,
    IsEnum,
    IsPositive,
    IsString,
    IsPhoneNumber,
  } from 'class-validator';
  import { Entity, Column } from 'typeorm';
  import { UserStatus } from './types';
  
  @Entity()
  export class User {
    @Column({ primary: true, generated: true })
    @IsPositive()
    id: number;
  
    @Column('varchar')
    @IsEnum(UserStatus)
    status: UserStatus;
  
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
    @IsPhoneNumber('US')
    phoneNumber: number;

    @Column()
    @IsString()
    address: string;

    @Column({array: true, nullable: true})
    @IsArray()
    siteIDs: number[] | null;

  }