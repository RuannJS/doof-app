import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConsumerAuth } from './dto/ConsumerAuth.dto';

@Controller('consumer/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  //   CONSUMER LOGIN

  @Post()
  async consumerLogin(@Body() data: ConsumerAuth): Promise<string> {
    return await this.service.consumerLogin(data);
  }
}
