import { Controller, Get } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsModel } from './applications.model';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get('applicationsInfo')
  public async getApplications(): Promise<ApplicationsModel[]> {
    return this.applicationsService.getApplications();
  }
}
