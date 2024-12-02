import { Injectable } from '@nestjs/common';
import { ApplicationInputModel, ApplicationsModel } from './applications.model';
import { DynamoDbService } from '../dynamodb';
import { ApplicationStatus } from './applications.model';
// import { NewApplicationInput } from '../dtos/newApplicationsDTO';

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

  /**
   * Gets all applications that are first applications.
   *
   * @returns a list of all first applications as ApplicationsModel objects.
   */
  public async getFirstApplications(): Promise<ApplicationsModel[]> {
    try {
      const data = await this.dynamoDbService.scanTable(this.tableName, 'isFirstApplication = :isFirst', {
        ':isFirst': { BOOL: true },
      });
      return data.map(this.mapDynamoDBItemToApplication);
    } catch (e) {
      throw new Error('Unable to retrieve first applications: ' + e);
    }
  }

  /**
   * Updates the status of the given application id.
   *
   * @returns the modified application.
   * @throws an error if an application with the given id is not found.
   */
  public async updateApplicationStatus(
    appId: number,
    appStatus: ApplicationStatus,
  ): Promise<ApplicationsModel> {
    try {
      const key = { 'Object ID?': { N: appId } };
      const application = await this.dynamoDbService.updateItem(
        this.tableName,
        key,
        appStatus,
      );

      return application;
    } catch (e) {
      throw new Error('Unable to update application status: ' + e);
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
