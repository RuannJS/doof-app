import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OwnerAuth } from './dto/OwnerAuth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthJWT } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async ownerLogin(data: OwnerAuth): Promise<string> {
    const owners = await this.prisma.owner.findMany();

    const verifyOwner = owners.find((owner) => owner.email === data.email);

    if (!verifyOwner) {
      throw new NotFoundException('Invalid credentials!');
    }

    const verifyPassword = await bcrypt.compare(
      data.password,
      verifyOwner.password,
    );

    if (!verifyPassword) {
      throw new NotFoundException('Invalid Credentials');
    }

    const ownerJWT: AuthJWT = {
      email: verifyOwner.email,
      firstName: verifyOwner.firstName,
      id: verifyOwner.id,
    };

    const token = jwt.sign(ownerJWT, process.env.OWNER_KEY);

    return `Bearer ${token}`;
  }
}
