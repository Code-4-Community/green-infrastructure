import { Injectable } from '@nestjs/common';
import { ApplicationInputModel, ApplicationsModel } from './applications.model';
import { DynamoDbService } from '../dynamodb';
import { ApplicationStatus } from './applications.model';
import { NewApplicationInput } from '../dtos/newApplicationsDTO';
import { LambdaService } from '../lambda';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';

@Injectable()
export class ApplicationsService {
  private readonly tableName = 'gibostonApplications';
  constructor(private readonly dynamoDbService: DynamoDbService, private readonly lambdaService:LambdaService, 
    private readonly userService: UserService, private readonly siteService: SiteService) {}

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
      const key = { 'appId': { N: appId } };
      const application = await this.dynamoDbService.getItem(
        this.tableName,
        key,
      );
      if (!application) {
        throw new Error('Application not found');
      }
      const updatedApplication = await this.dynamoDbService.updateItem(
        this.tableName,
        key,
        appStatus,
      );
      return this.mapDynamoDBItemToApplication(updatedApplication);
    } catch (e) {
      throw new Error('Unable to update application status: ' + e);
    }
  }
 
  public async postApplication(applicationData: NewApplicationInput) {
    const newId = await this.dynamoDbService.getHighestAppId(this.tableName) + 1;
    const applicationModel = this.PostInputToApplicationModel(applicationData, newId.toString());
    console.log("Received application data:", applicationData);
    try {
        const result = await this.dynamoDbService.postItem(this.tableName, applicationModel);

        if (result.$metadata.httpStatusCode !== 200) {
            throw new Error('Error posting application');
        }
        const user = await this.userService.getUser(applicationData.userId);
        const site = await this.siteService.getSite(applicationData.siteId);
        const name = user.firstName;
        const email = user.email;
 
        const siteName = site.siteName;
        const timeFrame = "30 days"
        const emailData = {"firstName":name, "userEmail":email, "siteName":siteName, "timeFrame":timeFrame};



        const lambdaResult = await this.lambdaService.invokeLambda('giSendApplicationConfirmation', emailData );
        console.log("Lambda result: ", lambdaResult);


        
        return {...result, newApplicationId: newId.toString()};
    } catch (e) {
        throw new Error("Unable to post new application: " + e);
    }
}


private PostInputToApplicationModel = (input: NewApplicationInput, appId: string): ApplicationInputModel => {

  return {
    appId: { N: appId },
    userId: { N: input.userId.toString() }, 
    siteId: { N: input.siteId.toString() }, 
    names: { SS: input.names },
    status: { S: input.status as ApplicationStatus}, 
    dateApplied: { S: input.dateApplied}, 
    isFirstApplication: { S: input.isFirstApplication.toString() }, 
  };
};





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


