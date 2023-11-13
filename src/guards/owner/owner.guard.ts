import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthJWT } from 'src/owner/auth/auth.entity';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')[1];

    if (token === undefined) {
      return false;
    }

    try {
      jwt.verify(token, process.env.OWNER_KEY) as AuthJWT;
    } catch (err) {
      return false;
    }

    return true;
  }
}
