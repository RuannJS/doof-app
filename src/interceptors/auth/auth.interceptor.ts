import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // HTTP REQUEST
    const request = context.switchToHttp().getRequest();

    const bearerToken: string = request?.headers?.authorization?.split(' ')[1];

    request.token = bearerToken;

    return next.handle();
  }
}
