import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/applications')
  getAllApplications() {
    return this.appService.getAllApplications();
  }

  @Get('/applications/:id')
  async getApplicationDetails(@Param('id') id: number) {
    const tableName = 'GIApplications';
    const key = { appID: id };
    try {
      const document = await this.appService.getApplicationDetails(
        tableName,
        key,
      );
      return { success: true, data: document };
    } catch (error) {
      return { success: false, error: 'Failed to get document from DynamoDB' };
    }
  }
}
