import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

exports.handler = async (event: any) => {
  const { firstName, userEmail } = event;

  try {
    // Send email using SES
    const emailParams = {
      Destination: {
        ToAddresses: [userEmail],
      },
      Message: {
        Body: {
          Text: {
            Data: `Hi ${firstName},\n\nWe regret to inform you that your application has not been approved at this time. Please contact the Office of Green Infrastructure if you have any questions or concerns about your application.\n\nSincerely,\nOffice of Green Infrastructure`,
          },
        },
        Subject: {
          Data: 'Green Infrastructure Volunteer Application Update',
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
