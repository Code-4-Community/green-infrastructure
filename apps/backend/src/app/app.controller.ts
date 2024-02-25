import { Controller, Get, Post, Request } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sites')
  async getData() {
    return this.appService.getData();
  }

  @Post('/application')
  async postApplication(@Request() data: any) {
    return this.appService.postApplication(data);
  }
}
