import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsModel } from './applications.model';
import { ApplicationStatus } from './applications.model';
import { NewApplicationInput } from '../dtos/newApplicationsDTO';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get('applicationsInfo')
  public async getApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getApplications();
  }

  @Get('getNonFirstApplications')
  public async getNonFirstTimeApplications(): Promise<ApplicationsModel[]> {
    return (await this.applicationsService.getApplications()).filter(
      (app) => app.isFirstApplication === false,
    );
  }

  @Get('getFirstApplications')
  public async getFirstApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getFirstApplications();
  }

  @Put('editApplication/:appId')
  public async changeApplicationStatus(
    @Param('appId') appId: number,
    @Query('applicationStatus') appStatus: ApplicationStatus,
  ): Promise<ApplicationsModel> {
    // Check if the provided appStatus is a valid enum value
    if (!Object.values(ApplicationStatus).includes(appStatus)) {
      throw new Error(`Invalid application status: ${appStatus}`);
    }

    return this.applicationsService.updateApplicationStatus(appId, appStatus);
  }

  @Post()
  public async postApplication(@Body() applicationData: NewApplicationInput) {
    try {
      return this.applicationsService.postApplication(applicationData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
