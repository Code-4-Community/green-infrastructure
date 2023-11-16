import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Site as siteSchema } from 'apps/common/src/lib/dto/Site';
import type { Site } from 'apps/common/src/lib/dto/Site';
import { Request } from 'express';

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('AWS Access Key not configured');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('AWS Secret Access Key not configured');
}

const client = new DynamoDBClient({ region: 'us-east-2' });

export async function scanAllSites(): Promise<unknown[]> {
  const command = new ScanCommand({
    TableName: 'GIBostonSites',
  });
  const dynamoRawResult = await client.send(command);
  if (dynamoRawResult == null || dynamoRawResult.Items == null) {
    throw new Error('Invalid response from DynamoDB, got undefined/null');
  }
  const unmarshalledItems = dynamoRawResult.Items.map((i) => unmarshall(i));
  console.log(unmarshalledItems);

  // const sites = unmarshalledItems.map((i) =>
  //   siteSchema.parse(i)
  // );
  return unmarshalledItems;
}

// export async function postPractitioner(req: Request): Promise<Practitioner> {
//   const parameters = {
//     TableName: 'Practitioners',
//     Item: marshall({
//       phoneNumber: req.body.phoneNumber,
//       fullName: req.body.fullName,
//       businessLocation: req.body.businessLocation,
//       businessName: req.body.businessName,
//       email: req.body.email,
//       geocode: {
//         lat: 0,
//         long: 0,
//       },
//       languagesList: req.body.languagesList,
//       minAgeServed: req.body.minAgeServed,
//       modality: req.body.modality,
//       website: req.body.website,
//       languages: req.body.languages,
//     }),
//   };

//   const command = new PutItemCommand(parameters);
//   await client.send(command);

//   const newItemParameters = {
//     TableName: 'Practitioners',
//     Key: {
//       phoneNumber: {
//         "S": req.body.phoneNumber,
//       },
//       fullName: {
//         "S": req.body.fullName,
//       },
//     },
//   }

//   const getCommand = new GetItemCommand(newItemParameters);
//   const practitioner = await client.send(getCommand);

//   return practitionerSchema.parse(unmarshall(practitioner.Item));
// }

// export async function deletePractitioner(req: Request): Promise<Key> {
//   const parameters = {
//     TableName: 'Practitioners',
//     Key: {
//       phoneNumber: { S: req.body.phoneNumber },
//       fullName: { S: req.body.fullName },
//     },
//   };

//   const command = new DeleteItemCommand(parameters);
//   await client.send(command);

//   return { phoneNumber: req.body.phoneNumber, fullName: req.body.fullName };
// }
