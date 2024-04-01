import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sites/:id')
  async getGISiteInfoById(@Param('id') id: number) {
    const tableName = 'GIBostonSites';
    const key = { siteId: id };

    try {
      const document = await this.appService.getGISiteById(
        tableName,
        key,
      );
      return document.message; // success: true
    } catch (error) {
      return { success: false, error: 'Failed to get site document from DynamoDB' };
    }
  }

  @Get('/applications/:id/site')
  async getSiteIdAssocWithApp(@Param('id') id: number) {
    const tableName = 'GIApplications';
    const key = { appId: id };

    try {
      const document = await this.appService.getSiteIdAssocWithApp(
        tableName,
        key,
      );
      return document.message; // success: true
    } catch (error) {
      return { success: false, error: 'Failed to get site document from DynamoDB' };
    }
  }
}

