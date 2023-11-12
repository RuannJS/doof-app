import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwner } from './dto/CreateOwner.dto';
import { Owner } from './owner.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async createOwner(data: CreateOwner): Promise<Owner> {
    const owners = await this.prisma.owner.findMany();

    const ownerEmail = owners.find((owner) => owner.email === data.email);

    if (ownerEmail) {
      throw new ConflictException('Email already in use!');
    }

    const saltRounds = 5;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newOwner = await this.prisma.owner.create({
      data: { ...data, password: hashedPassword },
    });

    return newOwner;
  }

  async listOwners(): Promise<Owner[]> {
    const owners = await this.prisma.owner.findMany();

    return owners;
  }
}
