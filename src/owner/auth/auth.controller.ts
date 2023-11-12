import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnerAuth } from './dto/OwnerAuth.dto';

@Controller('owner/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async ownerLogin(@Body() data: OwnerAuth): Promise<string> {
    return await this.service.ownerLogin(data);
  }
}
