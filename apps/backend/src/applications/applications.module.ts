import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { DynamoDbService } from '../dynamodb';

@Module({
  imports: [],
  providers: [ApplicationsService, DynamoDbService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
