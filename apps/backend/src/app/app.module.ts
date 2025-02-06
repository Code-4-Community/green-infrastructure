import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from '../site/site.module';
import { ApplicationsModule } from '../applications/applications.module';
import { DynamoDbService } from '../dynamodb';
import { LambdaService } from '../lambda';


@Module({
  imports: [SiteModule,UserModule, ApplicationsModule],
  controllers: [AppController],
  providers: [AppService, DynamoDbService, LambdaService],
})
export class AppModule {}
