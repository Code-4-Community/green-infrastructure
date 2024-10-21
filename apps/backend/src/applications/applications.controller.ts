import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsModel } from './applications.model';
import { ApplicationStatus } from './applications.model';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get('applicationsInfo')
  public async getApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getApplications();
  }

  @Put('applicationStatus/:appId')
  public async changeApplicationStatus(
    @Param('appId') appId: number,
    @Body('appStatus') appStatus: ApplicationStatus,
  ): Promise<ApplicationsModel> {
    // Check if the provided appStatus is a valid enum value
    if (!Object.values(ApplicationStatus).includes(appStatus)) {
      throw new Error(`Invalid application status: ${appStatus}`);
    }

    const applications = await this.applicationsService.getApplications();

    const appToModify = applications.find((app) => app.appId === appId);

    if (appToModify) {
      appToModify.status = appStatus;
    }

    return appToModify;
  }
}
