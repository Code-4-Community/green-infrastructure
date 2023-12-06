import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { scanAllGIApplications, scanAllSites, scanGIApplicationDetails } from '../dynamodb';
import getAllSites from '../workflows/sites/getAllSites';
import getAllGIApplications from '../workflows/applications/getAllGIApplications';
import getGIApplicationDetails from '../workflows/applications/getGIApplicationDetails';
import { ApplicationFilters } from '../workflows/applications/requestTypes/types';


const getAllSitesHandler = async () =>
  getAllSites(scanAllSites);

  const getAllGIApplicationsHandler = async () =>
  getAllGIApplications(scanAllGIApplications);

  const getGIApplicationDetailsHandler = async (tableName: string, key: any) => {
    // Search filter that uses the table name and unique identifier for that table
    const filter: ApplicationFilters = { tableName, uniqueIdentifier: key };
    return getGIApplicationDetails(scanGIApplicationDetails, filter);
  }
  
@Injectable()
export class AppService {
  private readonly dynamoDB = new AWS.DynamoDB.DocumentClient();

  async getData(): Promise<{ message: unknown[]; }> {
    return { message: await getAllSitesHandler() };
  }

  // Grab all GIApplications in the database
  // Implicit use of the GIApplications table
  async getAllGIApplications(): Promise<{ message: unknown[]; }> {
    return { message: await getAllGIApplicationsHandler() };
  }

  // Grab application details based on an application id
  // Tablename = GIApplications
  // key = { id: number }
  async getGIApplicationDetails(tableName: string, key: any): Promise<any> {
    const appID = key.appID;
    return { message: await getGIApplicationDetailsHandler(tableName, appID) };
  }
}
