import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly service: OwnerService) {}
}
