import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  DeleteItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  UpdateItemCommandInput
} from '@aws-sdk/client-dynamodb';
import { Injectable, Put } from '@nestjs/common';
import { table } from 'console';

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

  public async deleteItem(
    tableName: string,
    key: { [key: string]: any },
  ): Promise<void> {
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

  public async scanTable(
    tableName: string,
    filterExpression?: string,
    expressionAttributeValues?: { [key: string]: any },
    expressionAttributeNames? : { [key: string]: any},
  ): Promise<any[]> {
    // By default, scan the entire table
    const params: any = {
      TableName: tableName,
    };
    // Conditionally add FilterExpression and ExpressionAttributeValues if they exist
    if (filterExpression) {
      params.FilterExpression = filterExpression;
    }
    if (expressionAttributeValues) {
      params.ExpressionAttributeValues = expressionAttributeValues;
    }
    if(expressionAttributeNames) {
      params.ExpressionAttributeNames = expressionAttributeNames;
    }
    
    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      return data.Items || [];
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
  }

  public async getHighestUserId(tableName: string): Promise<number | undefined> {
    const params: any = {
      TableName: tableName,
      ProjectionExpression: "userId" // Project only the userId attribute
    };

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      const userIds = data.Items.map(item => parseInt(item.userId.N, 10)); // Convert to numbers

      // Handle potential parsing errors
      const validUserIds = userIds.filter(id => !isNaN(id));

      if (validUserIds.length === 0) {
        return undefined; // No valid user IDs found
      }

      const highestUserId = validUserIds.reduce((max, current) => Math.max(max, current));
      return highestUserId;
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
  }

  public async getHighestSiteId(
    tableName: string,
  ): Promise<number | undefined> {
    const params: any = {
      TableName: tableName,
      ProjectionExpression: 'siteId', // Project only the siteId attribute
    };

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      const siteIds = data.Items.map((item) => parseInt(item.siteId.S, 10)); // Convert to numbers

      // Handle potential parsing errors
      const validSiteIds = siteIds.filter((id) => !isNaN(id));

      if (validSiteIds.length === 0) {
        return undefined; // No valid site IDs found
      }

      const highestSiteId = validSiteIds.reduce((max, current) =>
        Math.max(max, current),
      );
      return highestSiteId;
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
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

  public async postItem(tableName: string, item) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    console.log(command);
    try {
      const result = await this.dynamoDbClient.send(command);
      return result;
    } catch (error) {
      console.log(`Error posting item to table ${tableName}`);
      throw new Error(error);
    }
  }

  public async updateItem(
    tableName: string,
    key: { [key: string]: any },
    status: string,
  ): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: `SET status = ${status}`,
      ReturnValue: 'ALL_NEW',
    };
    const command = new UpdateItemCommand(params);
    const result = await this.dynamoDbClient.send(command);
    return result.Attributes;
  }

  public async updateItemWithExpression(
    tableName: string,
    key: { [key: string]: any },
    updateExpression: string,
    expressionAttributeValues?: Record<string, any>,
    expressionAttributeNames?: Record<string, string>,
): Promise<any> {
    const params: UpdateItemCommandInput = {
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ReturnValues: 'ALL_NEW',
    };


    if (expressionAttributeNames) {
        params.ExpressionAttributeNames = expressionAttributeNames;
    }
    

    if (expressionAttributeValues) {
        params.ExpressionAttributeValues = expressionAttributeValues;
    }

    try {
        const command = new UpdateItemCommand(params);
        const result = await this.dynamoDbClient.send(command);
        return result.Attributes;
    } catch (error) {
        // Log detailed error info
        console.error("DynamoDB Update Error:", error);
        throw new Error(`Failed to update item in DynamoDB: ${error.message}`);
    }

 
}


}

