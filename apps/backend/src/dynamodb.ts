import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
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

  public async scanTable(tableName: string, filterExpression?: string, expressionAttributeValues?: { [key: string]: any }, expressionAttributeNames?: { [key: string]: any }): Promise<any[]> {
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
    if (expressionAttributeNames) {
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

}
