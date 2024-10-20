import { Injectable } from '@nestjs/common';
import { ApplicationsModel } from './applications.model';
import { DynamoDbService } from '../dynamodb';
import { ApplicationStatus } from './applications.model';

@Injectable()
export class ApplicationsService {
  private readonly tableName = 'gibostonApplications';
  constructor(private readonly dynamoDbService: DynamoDbService) {}

  /**
   * Gets all applications.
   *
   * @returns a list of all applications as ApplicationsModel objects.
   */
  public async getApplications(): Promise<ApplicationsModel[]> {
    try {
      const data = await this.dynamoDbService.scanTable(this.tableName);
      return data.map(this.mapDynamoDBItemToApplication);
    } catch (e) {
      throw new Error('Unable to retrieve applications: ' + e);
    }
  }

  private mapDynamoDBItemToApplication = (item: {
    [key: string]: any;
  }): ApplicationsModel => {
    return {
      appId: item['appId'].N,
      dateApplied: new Date(item['dateApplied'].S),
      isFirstApplication: item['isFirstApplication'].BOOL,
      names: item['names'].SS,
      siteId: item['siteId'].N,
      status: item['status'].S as ApplicationStatus,
      userId: item['userId'].N,
    };
  };
}
