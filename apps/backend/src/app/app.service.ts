import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly dynamoDB = new AWS.DynamoDB.DocumentClient();

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getAllApplications(): { id: number } {
    return;
  }

  async getApplicationDetails(tableName: string, key: any): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      const result = await this.dynamoDB.get(params).promise();
      console.log('Result from DynamoDB:', result.Item);
      return result.Item;
    } catch (error) {
      console.error('Error getting document from DynamoDB:', error);
      throw error;
    }
  }
}
