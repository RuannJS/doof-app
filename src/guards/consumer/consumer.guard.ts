import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthJWT } from 'src/consumer/auth/auth.entity';

@Injectable()
export class ConsumerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string = request?.headers?.authorization?.split(' ')[1];

    if (token === undefined) {
      return false;
    }

    try {
      jwt.verify(token, process.env.CONSUMER_KEY) as AuthJWT;
    } catch (error) {
      return false;
    }

    return true;
  }
}
