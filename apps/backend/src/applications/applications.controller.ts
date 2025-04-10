import { Controller, UseGuards, Get, Put, Post, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationsService } from './applications.service';
import { ApplicationsModel } from './applications.model';
import { ApplicationStatus } from './applications.model';
import { NewApplicationInput } from '../dtos/newApplicationsDTO';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('applicationsInfo')
  public async getApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getApplications();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getNonFirstApplications')
  public async getNonFirstTimeApplications(): Promise<ApplicationsModel[]> {
    return (await this.applicationsService.getApplications()).filter(
      (app) => app.isFirstApplication === false,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getFirstApplications')
  public async getFirstApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getFirstApplications();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('editApplication/:appId')
  public async changeApplicationStatus(
    @Param('appId') appId: number,
    @Query('applicationStatus') appStatus: ApplicationStatus
  ): Promise<ApplicationsModel> {
    // Check if the provided appStatus is a valid enum value
    if (!Object.values(ApplicationStatus).includes(appStatus)) {
      throw new Error(`Invalid application status: ${appStatus}`);
    }

    return this.applicationsService.updateApplicationStatus(appId, appStatus);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async postApplication(@Body() applicationData: NewApplicationInput) {
      return this.applicationsService.postApplication(applicationData);
  }

}
