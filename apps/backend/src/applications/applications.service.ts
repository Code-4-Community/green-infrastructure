import { Injectable } from '@nestjs/common';
import { ApplicationInputModel, ApplicationsModel } from './applications.model';
import { DynamoDbService } from '../dynamodb';
import { ApplicationStatus } from './applications.model';
import { NewApplicationInput } from '../dtos/newApplicationsDTO';

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

  public async postSite(applicationData: NewApplicationInput) {
    const applicationModel = this.PostInputToSiteModel(applicationData);
    const newId = await this.dynamoDbService.getHighestSiteId(this.tableName) + 1;
    applicationModel.appId.S = newId.toString();
    console.log("Using new ID:" + applicationModel.appId.S)
    try {
        const result = await this.dynamoDbService.postItem(this.tableName, applicationModel);
        return {...result, newApplicationId: newId.toString()};
    } catch (e) {
        throw new Error("Unable to post new application: " + e);
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

  private PostInputToSiteModel = (input: NewApplicationInput): ApplicationInputModel => {
    return {
        appId: {S: input.appId},
        userId: {S: input.userId},
        siteId: {S: input.siteId},
        names: {S: input.names},
        status: {S: input.status as ApplicationStatus},
        dateApplied: {S: input.dateApplied},
        isFirstApplication: {S: input.isFirstApplication},
    };
 }
}
