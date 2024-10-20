import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDbService {
  private readonly dynamoDbClient: DynamoDBClient;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public async getItem(
    tableName: string,
    key: { [key: string]: any },
  ): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      const data = await this.dynamoDbClient.send(new GetItemCommand(params));
      return data.Item || null;
    } catch (error) {
      console.error('DynamoDB GetItem Error:', error);
      throw new Error(`Unable to get item from ${tableName}`);
    }
  }

  public async scanTable(tableName: string): Promise<any[]> {
    const params = {
      TableName: tableName,
    };
    const command = new ScanCommand(params);
    const result = await this.dynamoDbClient.send(command);
    return result.Items;
  }
}
