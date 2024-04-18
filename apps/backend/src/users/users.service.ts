import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { MongoRepository } from 'typeorm';
  import { User } from './users.entity';
  import { UpdateUserRequestDTO } from './dtos/update-user.request.dto';
  import { UserStatus, UserRole } from './types';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: MongoRepository<User>,
    ) {}
  
    async create(
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: number,
      zipCode: number,
      birthDate: string,
      role: UserRole
    ): Promise<User> {
      const user = this.usersRepository.create({
        status: UserStatus.PENDING,
        role: role,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
        birthDate: birthDate
      });
  
      return this.usersRepository.save(user);
    }
  
    // TODO not currently used and not refactored
    async findAll(currentUser: User, getAllMembers: boolean): Promise<User[]> {
      if (!getAllMembers) return [];
  
      if (currentUser.role === UserRole.VOLUNTEER) {
        throw new UnauthorizedException();
      }
  
      const users: User[] = await this.usersRepository.find({
        where: {
          role: { $not: { $eq: UserRole.VOLUNTEER } },
        },
      });
  
      return users;
    }
  
    // TODO refactor method to not take in currentUser
    async findOne(currentUser: User, userId: number): Promise<User> {
      const user = await this.usersRepository.findOne({
        where: { id: userId }
      });
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      const currentStatus = currentUser.role;
      const targetStatus = user.role;
  
      switch (currentStatus) {
        case UserRole.ADMIN:
          break;
        case UserRole.VOLUNTEER:
          if (targetStatus === UserRole.ADMIN) {
            throw new NotFoundException(`User with ID ${userId} not found`);
          }
          if (
            targetStatus === UserRole.VOLUNTEER &&
            currentUser.id !== user.id
          ) {
            throw new NotFoundException(`User with ID ${userId} not found`);
          }
          break;
      }
  
      return user;
    }
  
    findByEmail(email: string): Promise<User[]> {
      return this.usersRepository.find({
        where: { email },
        relations: ['applications'],
      });
    }
  
    async updateUser(
      currentUser: User,
      userId: number,
      updateUserDTO: UpdateUserRequestDTO,
    ): Promise<User> {
      const user: User = await this.findOne(currentUser, userId);
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      try {
        await this.usersRepository.update({ id: userId }, updateUserDTO);
      } catch (e) {
        throw new BadRequestException('Cannot update user');
      }
  
      return await this.findOne(currentUser, userId);
    }
  
    async remove(currentUser: User, userId: number): Promise<User> {
      const user = await this.findOne(currentUser, userId);
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      return this.usersRepository.remove(user);
    }
  }