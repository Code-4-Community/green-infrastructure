import {
    IsArray,
    IsBoolean,
    IsPositive,
    IsEnum,
  } from 'class-validator';
  import { Entity, Column } from 'typeorm';
import { ApplicationStatus } from './types';
  
  @Entity()
  export class Application {
    @Column({ primary: true, generated: true })
    @IsPositive()
    applicationId: number;

    @Column()
    @IsPositive()
    userId: number;

    @Column()
    @IsPositive()
    featureId: number;
  
    @Column('varchar')
    @IsBoolean()
    safety?: boolean;
  
    @Column()
    @IsBoolean()
    privacy?: boolean;
  
    @Column()
    @IsBoolean()
    release?: boolean;
  
    @Column({array: true, nullable: false})
    @IsArray()
    names: string[];

    @Column({nullable: false})
    @IsEnum(ApplicationStatus)
    status: ApplicationStatus;

  }