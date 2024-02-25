import { Injectable } from '@nestjs/common';
import getAllSites from '../workflows/getAllSites';
import postApplication from '../workflows/postApplication';
import { scanAllSites, postApplicationToDB } from '../dynamodb';
import { Site } from 'apps/common/src/lib/dto/Site';

const getAllSitesHandler = async () =>
  getAllSites(scanAllSites);

const postApplicationHandler = async (data: any) =>
  postApplication(postApplicationToDB, data);

@Injectable()
export class AppService {
  async getData(): Promise<{ message: unknown[]; }> {
    return { message: await getAllSitesHandler() };
    // return { message: 'Hello API' };
  }
  
  async postApplication(data: any): Promise<unknown[]> {
    return postApplicationHandler(data);
  }
}
