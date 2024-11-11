import { Injectable } from '@nestjs/common';
import {
  AdminInitiateAuthCommand,
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
import { UserStatus } from '../user/user.model';

@Injectable()
export class AuthService {
  private readonly providerClient: CognitoIdentityProviderClient;
  private readonly clientSecret: string;

  constructor() {
    this.providerClient = new CognitoIdentityProviderClient({
      region: CognitoAuthConfig.region,
      credentials: {
        accessKeyId: process.env.NX_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NX_AWS_SECRET_ACCESS_KEY,
      },
    });

    this.clientSecret = process.env.COGNITO_CLIENT_SECRET;
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
    { firstName, lastName, email, password }: SignUpDto,
    status: UserStatus = UserStatus.PENDING,
  ): Promise<boolean> {
    // Needs error handling
    const signUpCommand = new SignUpCommand({
      ClientId: CognitoAuthConfig.clientId,
      SecretHash: this.calculateHash(email),
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'name',
          Value: `${firstName} ${lastName}`,
        },
        // Optional: add a custom Cognito attribute called "role" that also stores the user's status/role
        // If you choose to do so, you'll have to first add this custom attribute in your user pool
        {
          Name: 'custom:role',
          Value: status,
        },
      ],
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

    return {
      accessToken: response.AuthenticationResult.AccessToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      idToken: response.AuthenticationResult.IdToken,
    };
  }

}
