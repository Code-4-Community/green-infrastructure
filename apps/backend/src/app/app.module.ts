import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from '../site/site.module';
import { ApplicationsModule } from '../applications/applications.module';
import { DynamoDbService } from '../dynamodb';
import { AuthModule } from '../auth/auth.module';
import { LambdaService } from '../lambda';


@Module({
  imports: [
    SiteModule,
    UserModule, 
    ApplicationsModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DynamoDbService, LambdaService],
})
export class AppModule {}
