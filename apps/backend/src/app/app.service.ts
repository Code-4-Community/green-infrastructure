import { Injectable } from '@nestjs/common';
import getAllSites from '../workflows/getAllSites';
import { scanAllSites } from '../dynamodb';
import { Site } from 'apps/common/src/lib/dto/Site';

const getAllSitesHandler = async () =>
  getAllSites(scanAllSites);

@Injectable()
export class AppService {
  async getData(): Promise<{ message: unknown[]; }> {
    return { message: await getAllSitesHandler() };
    // return { message: 'Hello API' };
  }
}
