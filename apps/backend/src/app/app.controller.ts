import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Example Route
  @Get()
  async getData() {
    return this.appService.getData();
  }

  // Grab all GIApplications in the db
  @Get('/applications')
  async getAllApplications() {
    return this.appService.getAllGIApplications();
  }

// Grab the application that matches the id provided
  @Get('/applications/:id')
  async getGIApplicationDetails(@Param('id') id: number) {
    const tableName = 'GIApplications';
    /* Key carrying: {
        - ID of application
    }
    */
    const key = { appID: id };
    try {
      const document = await this.appService.getGIApplicationDetails(
        tableName,
        key,
      );
      return document.message; // { success: true, data: document };
    } catch (error) {
      return { success: false, error: 'Failed to get document from DynamoDB' };
    }
  }
  
}
