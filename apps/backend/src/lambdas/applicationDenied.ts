import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const sesClient = new SESClient({ region: process.env.AWS_REGION });

exports.handler = async (event: any) => {
  const tableName = process.env.TABLE_NAME;
  const { userId } = event;

  try {
    // Fetch user info
    const getUserParams = {
      TableName: tableName,
      Key: {
        userId: { S: userId },
      },
    };
    const getUserCommand = new GetItemCommand(getUserParams);
    const userResult = await dynamoDbClient.send(getUserCommand);

    if (!userResult.Item) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const userEmail = userResult.Item.email.S;

    // Send email using SES
    const emailParams = {
      Destination: {
        ToAddresses: [userEmail],
      },
      Message: {
        Body: {
          Text: {
            Data: 'Sorry, your application to adopt has not been approved at this time. Please contact the Office of Green Infrastructure if you have any questions or concerns about your application.',
          },
        },
        Subject: {
          Data: 'Application Denied',
        },
      },
      Source: process.env.SES_SOURCE_EMAIL,
    };

    const sendEmailCommand = new SendEmailCommand(emailParams);
    await sesClient.send(sendEmailCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error sending email: ${error.message}`,
      }),
    };
  }
};
