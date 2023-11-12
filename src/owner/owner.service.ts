import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwner } from './dto/CreateOwner.dto';
import { Owner } from './owner.entity';
import * as bcrypt from 'bcrypt';
import { UpdateOwner } from './dto/UpdateOwner.dto';
import { AuthJWT } from './auth/auth.entity';

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

  async updateOwner(data: UpdateOwner, owner: AuthJWT): Promise<Owner> {
    const verifyOwner = await this.prisma.owner.findUnique({
      where: { email: owner.email },
    });

    if (verifyOwner.email !== owner.email) {
      throw new UnauthorizedException();
    }

    if (data.password) {
      const saltRounds = 5;

      const updateHash = await bcrypt.hash(data.password, saltRounds);

      const updatedOwner = await this.prisma.owner.update({
        where: { email: owner.email },
        data: { ...data, password: updateHash },
      });

      return updatedOwner;
    }

    const updatedOwner = await this.prisma.owner.update({
      where: { email: owner.email },
      data,
    });

    return updatedOwner;
  }

  async deleteOwner(owner: AuthJWT): Promise<boolean> {
    const verifyOwner = await this.prisma.owner.findUnique({
      select: { email: true, restaurants: true },
      where: { email: owner.email },
    });

    if (verifyOwner.email !== owner.email) {
      throw new UnauthorizedException();
    }

    // DELETING OWNER RESTAURANTS TO PREVENT DATABASE ERRORS

    const deletedRestaurants = await this.prisma.restaurant.deleteMany({
      where: { ownerId: owner.id },
    });

    if (deletedRestaurants) {
      await this.prisma.owner.delete({
        where: {
          id: owner.id,
        },
      });

      return true;
    }

    return false;
  }
}
