import { Injectable } from '@nestjs/common';
import { ChannelType } from '@prisma/client';
import * as faker from 'faker';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const users = await this.prisma.user.findMany({
      take: 3,
      orderBy: {
        id: 'asc',
      },
    });

    const workspace = await this.prisma.workspace.findFirst();

    await this.prisma.channel.create({
      data: {
        workspaceId: workspace.id,
        creatorId: users[0].id,
        name: 'general',
        type: ChannelType.PUBLIC,
        archived: false,
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        Members: {
          create: [
            { userId: users[0].id },
            { userId: users[1].id },
            { userId: users[2].id },
          ],
        },
      },
    });
  }
}
