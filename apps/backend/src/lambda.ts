import { Injectable } from '@nestjs/common';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

@Injectable()
export class LambdaService {
  private readonly lambdaClient: LambdaClient;

  constructor() {
    this.lambdaClient = new LambdaClient({
      region: process.env.AWS_REGION, 
    });
  }

  public async invokeLambda(functionName: string, payload: Record<string, any>) {
    try {
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: Buffer.from(JSON.stringify(payload)), 
      });

      const response = await this.lambdaClient.send(command);

      if (response.Payload) {
        return JSON.parse(Buffer.from(response.Payload).toString());
      }

      throw new Error('No response payload from Lambda function');
    } catch (error) {
      console.error('Error invoking Lambda:', error);
      throw error;
    }
  }
}
