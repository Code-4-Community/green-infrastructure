import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { DynamoDbService } from '../dynamodb';
import { LambdaService } from '../lambda';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';

@Module({
  imports: [],
  providers: [ApplicationsService, DynamoDbService, LambdaService, UserService, SiteService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
