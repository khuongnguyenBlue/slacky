import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const users = [];

    for (let i = 0; i < 30; i++) {
      users.push({
        email: faker.internet.email(),
      });
    }

    await this.prisma.user.createMany({ data: users });
  }
}
