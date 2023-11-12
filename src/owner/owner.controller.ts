import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';
import { UpdateOwner } from './dto/UpdateOwner.dto';
import { CreateOwner } from './dto/CreateOwner.dto';
import { OwnerGuard } from 'src/guards/owner/owner.guard';
import { AuthInterceptor } from 'src/interceptors/auth/auth.interceptor';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { AuthJWT } from './auth/auth.entity';

@Controller('owner')
export class OwnerController {
  constructor(private readonly service: OwnerService) {}

  @Post()
  async createOwner(@Body() data: CreateOwner): Promise<Owner> {
    return await this.service.createOwner(data);
  }

  @Get()
  async listOwners(): Promise<Owner[]> {
    return await this.service.listOwners();
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Put()
  async updateOwner(
    @Body() data: UpdateOwner,
    @Auth() owner: AuthJWT,
  ): Promise<Owner> {
    return await this.service.updateOwner(data, owner);
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AuthInterceptor)
  @Delete()
  async deleteOwner(@Auth() owner: AuthJWT) {
    return await this.service.deleteOwner(owner);
  }
}
