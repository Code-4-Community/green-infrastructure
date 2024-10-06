import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";

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

  public async getItem(tableName: string, key: { [key: string]: any }): Promise<any> {
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

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      return data.Items || [];
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
  }

  public async putItem(tableName: string, item: { [key: string]: any }): Promise<void> {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await this.dynamoDbClient.send(new PutItemCommand(params));
    } catch (error) {
      console.error('DynamoDB PutItem Error:', error);
      throw new Error(`Unable to put item into ${tableName}`);
    }
  }

  public async deleteItem(tableName: string, key: { [key: string]: any }): Promise<void> {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      await this.dynamoDbClient.send(new DeleteItemCommand(params));
    } catch (error) {
      console.error('DynamoDB DeleteItem Error:', error);
      throw new Error(`Unable to delete item from ${tableName}`);
    }
  }
}
