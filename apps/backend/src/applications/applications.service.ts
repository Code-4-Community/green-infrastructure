import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Application } from './applications.entity';
import { ApplicationStatus } from './types';
import { UserStatus } from '../auth/types';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: MongoRepository<Application>,
  ) { }

  async create(
    userId: number,
    featureId: number,
    safetyChecked: boolean,
    privacyChecked: boolean,
    releaseChecked: boolean,
    names: string[],
  ): Promise<Application> {
    const userStatus = UserStatus.APPROVED; // replace with actual logic to get user status
    if (safetyChecked && privacyChecked && releaseChecked) {
      let applicationStatus;
      if (userStatus === UserStatus.APPROVED) {
        applicationStatus = ApplicationStatus.APPROVED;
      } else if (userStatus === UserStatus.PENDING) {
        applicationStatus = ApplicationStatus.PENDING;
      } else {
        throw new BadRequestException('User must be approved or pending approval');
      }
      const application = this.applicationsRepository.create({
        userId: userId,
        featureId: featureId,
        names: names,
        status: applicationStatus,
      });
      return this.applicationsRepository.save(application);
    }
    else {
      throw new BadRequestException('User must agree to the agreements');
    }
  }
}