import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkspaceSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    await this.prisma.workspace.create({
      data: {
        name: faker.name.findName(),
      },
    });
  }
}
