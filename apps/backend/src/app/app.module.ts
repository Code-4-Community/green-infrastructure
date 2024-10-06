import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from '../site/site.module';
import { DynamoDbService } from '../dynamodb';

@Module({
  imports: [SiteModule],
  controllers: [AppController],
  providers: [AppService, DynamoDbService],
})
export class AppModule {}
