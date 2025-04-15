import { Injectable, BadRequestException } from '@nestjs/common';
import { ApplicationInputModel, ApplicationsModel } from './applications.model';
import { DynamoDbService } from '../dynamodb';
import { ApplicationStatus } from './applications.model';
import { NewApplicationInput } from '../dtos/newApplicationsDTO';
import { LambdaService } from '../lambda';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { Role } from '../user/user.model';

@Injectable()
export class ApplicationsService {
  private readonly tableName = 'gibostonApplications';
  constructor(
    private readonly dynamoDbService: DynamoDbService,
    private readonly lambdaService: LambdaService,
    private readonly userService: UserService,
    private readonly siteService: SiteService,
  ) {}

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
      const data = await this.dynamoDbService.scanTable(
        this.tableName,
        'isFirstApplication = :isFirst',
        {
          ':isFirst': { BOOL: true },
        },
      );
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
      const key = { appId: { N: appId } };
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
      if (appStatus === ApplicationStatus.APPROVED) {
        const user = await this.userService.getUser(application.userId.N);
        const site = await this.siteService.getSite(application.siteId.N);
        const name = user.firstName;
        const email = user.email;
        const userId = user.userId;

        const siteName = site.siteName;
        const timeFrame = '30 days';
        const emailData = {
          firstName: name,
          userEmail: email,
          siteName: siteName,
          timeFrame: timeFrame,
          userId: userId,
        };
        const lambdaResult = await this.lambdaService.invokeLambda(
          'giSendApplicationApproved',
          emailData,
        );
        console.log('Lambda result: ', lambdaResult);
      }
      return this.mapDynamoDBItemToApplication(updatedApplication);
    } catch (e) {
      throw new Error('Unable to update application status: ' + e);
    }
  }

  public async postApplication(applicationData: NewApplicationInput) {
    let userId = applicationData.userId;

    // Handle first-time applications - create new user
    if (applicationData.isFirstApplication === true) {
      if (!userId) {
        // Validate required fields for user creation
        if (
          !applicationData.firstName ||
          !applicationData.lastName ||
          !applicationData.email ||
          !applicationData.phoneNumber ||
          !applicationData.zipCode ||
          !applicationData.birthDate
        ) {
          throw new BadRequestException(
            'First name, last name, email, phone number, zip code, and birth date are required for first-time applications',
          );
        }

        // Create a new user using postUser method
        try {
          const newUserResult = await this.userService.postUser(
            {
              firstName: applicationData.firstName,
              lastName: applicationData.lastName,
              email: applicationData.email,
              phoneNumber: applicationData.phoneNumber,
              zipCode: applicationData.zipCode,
              birthDate: applicationData.birthDate,
            },
            Role.VOLUNTEER,
          );

          // Extract the new user ID from the result - fix the way we access newUserID
          userId = parseInt(newUserResult.newUserID);
          console.log('Created new user with ID:', userId);
        } catch (error) {
          throw new BadRequestException(
            `Failed to create new user: ${error.message}`,
          );
        }
      } else {
        throw new BadRequestException(
          'Not expecting userId for first-time applications.',
        );
      }
    } else if (!userId) {
      // For non-first-time applications, userId is required
      throw new BadRequestException(
        'User ID is required for non-first-time applications',
      );
    }

    // Ensure we have names array to avoid undefined issues
    const names = applicationData.names || [];

    const newId =
      (await this.dynamoDbService.getHighestAppId(this.tableName)) + 1;

    try {
      // Create application with proper types
      const applicationModel = {
        appId: { N: newId.toString() },
        userId: { N: userId.toString() },
        siteId: { N: applicationData.siteId.toString() },
        names: { SS: names.length > 0 ? names : [''] }, // Ensure non-empty array with at least one element
        status: { S: applicationData.status || ApplicationStatus.PENDING },
        dateApplied: {
          S: applicationData.dateApplied || new Date().toISOString(),
        },
        isFirstApplication: { BOOL: applicationData.isFirstApplication }, // Use BOOL type directly
      };

      const result = await this.dynamoDbService.postItem(
        this.tableName,
        applicationModel,
      );

      const user = await this.userService.getUser(userId);
      const site = await this.siteService.getSite(applicationData.siteId);
      const name = user.firstName;
      const email = user.email;

      const siteName = site.siteName;
      const timeFrame = '30 days';
      const emailData = {
        firstName: name,
        userEmail: email,
        siteName: siteName,
        timeFrame: timeFrame,
        userId: userId,
      };

      const lambdaResult = await this.lambdaService.invokeLambda(
        'giSendApplicationConfirmation',
        emailData,
      );
      console.log('Lambda result: ', lambdaResult);

      return { ...result, newApplicationId: newId.toString() };
    } catch (e) {
      console.error('Error posting application:', e);
      throw new Error('Unable to post new application: ' + e);
    }
  }

  // Fix PostInputToApplicationModel method to handle the BOOL type correctly
  private PostInputToApplicationModel = (
    input: NewApplicationInput,
    appId: string,
  ): ApplicationInputModel => {
    return {
      appId: { N: appId },
      userId: { N: input.userId.toString() },
      siteId: { N: input.siteId.toString() },
      names: { SS: input.names && input.names.length > 0 ? input.names : [''] }, // Ensure non-empty
      status: { S: input.status as ApplicationStatus },
      dateApplied: { S: input.dateApplied },
      isFirstApplication: { BOOL: input.isFirstApplication }, // Change to BOOL type
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
