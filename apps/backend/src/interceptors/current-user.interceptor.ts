import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { AuthService } from '../auth/auth.service';
  
  @Injectable()
  export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
      private authService: AuthService
    ) {}
  
    async intercept(context: ExecutionContext, handler: CallHandler) {
      const request = context.switchToHttp().getRequest();
  
      if (request.user?.idUser != null) {
        const cognitoUserAttributes = await this.authService.getUserAttributes(
          request.user.idUser,
        );
        const userEmail = cognitoUserAttributes.find(
          (attribute) => attribute.Name === 'email',
        ).Value;
        // const users = await this.authService.findByEmail(userEmail);
  
        // if (users.length > 0) {
        //   const user = users[0];
  
        //   request.user = user;
        // }
      }
  
      return handler.handle();
    }
  }