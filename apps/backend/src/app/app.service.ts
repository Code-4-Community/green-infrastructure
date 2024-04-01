import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { scanGIApplicationForSiteId, scanGISitesById } from '../dynamodb';
import { ApplicationFilters } from '../workflows/filter';
import getGISiteById from '../workflows/sites/getGISiteById';
import getSiteIdAssocWithApp from '../workflows/applications/getSiteIdAssocWithApp';

  const getGISiteByIdHandler = async (tableName: string, key: any) => {
    const filter: ApplicationFilters = { tableName, uniqueIdentifier: key };
    return getGISiteById(scanGISitesById, filter);
  }

  const getSiteIdAssocWithAppHandler = async (tableName: string, key: any) => {
    const filter: ApplicationFilters = { tableName, uniqueIdentifier: key };
    return getSiteIdAssocWithApp(scanGIApplicationForSiteId, filter);
  }
  
@Injectable()
export class AppService {

  private readonly dynamoDB = new AWS.DynamoDB.DocumentClient();

  // endpoint that retrieves a site's information based on the site id
  // Tablename = GIBostonSites
  // key = { siteId: number }
  async getGISiteById(tableName: string, key: any): Promise<any> {
    const siteId = key.siteId;
    return { message: await getGISiteByIdHandler(tableName, siteId) };
  }

  async getSiteIdAssocWithApp(tableName: string, key: any): Promise<any> {
    const appId = key.appId;
    return { message: await getSiteIdAssocWithAppHandler(tableName, appId) };
  }
}