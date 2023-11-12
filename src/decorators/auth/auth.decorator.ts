import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthJWT } from 'src/consumer/auth/auth.entity';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const bearerToken = request.token;

    const user = jwt.decode(bearerToken) as AuthJWT;

    return user;
  },
);
