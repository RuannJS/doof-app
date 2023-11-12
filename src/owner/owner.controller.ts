import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';
import { CreateOwner } from './dto/CreateOwner.dto';

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
}
