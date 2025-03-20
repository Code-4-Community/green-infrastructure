import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

import type { UserStatus } from './user.model';

@Entity()
export class User {
  @Column({ primary: true })
  id: number;

  @Column()
  status: UserStatus;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
}