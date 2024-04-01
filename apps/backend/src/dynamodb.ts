import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Site as siteSchema } from 'apps/common/src/lib/dto/Site';
import type { Site } from 'apps/common/src/lib/dto/Site';
import { Request } from 'express';
import { ApplicationFilters } from './workflows/filter';

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('AWS Access Key not configured');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('AWS Secret Access Key not configured');
}

const client = new DynamoDBClient({ region: 'us-east-2' });

/* SITES */

/*-> Scan GI Sites and grab the site that matches the id inside the filter */
export async function scanGISitesById(filter: ApplicationFilters): Promise<unknown> {

  // Assuming 'appID' is the name of the attribute and it's of type String
  const siteId: number = filter.uniqueIdentifier;

  const command = new GetItemCommand({
    TableName: filter.tableName,
    Key: {
      'Object ID?': {N: siteId.toString() }
    }
  });

  const dynamoRawResult = await client.send(command);
  if (!dynamoRawResult || !dynamoRawResult.Item) {
    throw new Error('No item found with the given siteId');
  }

  const unmarshalledItem = unmarshall(dynamoRawResult.Item);

  return unmarshalledItem;
}

/* Applications */

/*-> Scan GI Applications and grab the application that matches the id inside the filter */
export async function scanGIApplicationForSiteId(filter: ApplicationFilters): Promise<unknown> {

  // Assuming 'appID' is the name of the attribute and it's of type String
  const appId: number = filter.uniqueIdentifier;

  const command = new GetItemCommand({
    TableName: filter.tableName,
    Key: {
      'appID': {N: appId.toString() }
    }
  });

  const dynamoRawResult = await client.send(command);
  if (!dynamoRawResult || !dynamoRawResult.Item) {
    throw new Error('No item found with the given siteId');
  }

  const unmarshalledItem = unmarshall(dynamoRawResult.Item);

  return unmarshalledItem;
}