import { Injectable } from '@nestjs/common';
import {
  AdminInitiateAuthCommand,
  AdminGetUserCommand,
  AttributeType,
  CognitoIdentityProviderClient,
  ListUsersCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import CognitoAuthConfig from './aws-exports';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignInResponseDto } from '../dtos/sign-in-response.dto';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  private readonly providerClient: CognitoIdentityProviderClient;
  private readonly clientSecret: string;

  constructor() {
    this.providerClient = new CognitoIdentityProviderClient({
      region: CognitoAuthConfig.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET;
  }

  // Computes secret hash to authenticate this backend to Cognito
  // Hash key is the Cognito client secret, message is username + client ID
  // Username value depends on the command
  // (see https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html#cognito-user-pools-computing-secret-hash)
  calculateHash(username: string): string {
    const hmac = createHmac('sha256', this.clientSecret);
    hmac.update(username + CognitoAuthConfig.clientId);
    return hmac.digest('base64');
  }

  async getUser(userSub: string): Promise<AttributeType[]> {
    const listUsersCommand = new ListUsersCommand({
      UserPoolId: CognitoAuthConfig.userPoolId,
      Filter: `sub = "${userSub}"`,
    });

    // TODO need error handling
    const { Users } = await this.providerClient.send(listUsersCommand);
    return Users[0].Attributes;
  }

  async signup(
    { email, password }: SignUpDto,
  ): Promise<boolean> {
    const signUpCommand = new SignUpCommand({
      ClientId: CognitoAuthConfig.clientId,
      SecretHash: this.calculateHash(email),
      Username: email,
      Password: password,
    });

    const response = await this.providerClient.send(signUpCommand);
    return response.UserConfirmed;
  }

  async signin({ email, password }: SignInDto): Promise<SignInResponseDto> {
    const signInCommand = new AdminInitiateAuthCommand({
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      ClientId: CognitoAuthConfig.clientId,
      UserPoolId: CognitoAuthConfig.userPoolId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.calculateHash(email),
      },
    });

    const response = await this.providerClient.send(signInCommand);

    const getUserCommand = new AdminGetUserCommand({
      UserPoolId: CognitoAuthConfig.userPoolId,
      Username: email,
    });
    const userResponse = await this.providerClient.send(getUserCommand);

    // Find userId in the user's custom attributes
    const userId = userResponse.UserAttributes?.find(
      (attr) => attr.Name === 'custom:userId'
    )?.Value;

    return {
      accessToken: response.AuthenticationResult.AccessToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      idToken: response.AuthenticationResult.IdToken,
      userId
    };
  }

}
