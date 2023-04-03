import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkspaceMemberSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const workspaceMembers = [];

    const users = await this.prisma.user.findMany();
    const workspace = await this.prisma.workspace.findFirst();

    users.map((user) => {
      const username = faker.name.findName();
      const userCode = username.toLowerCase().replace(/ /g, '.');
      workspaceMembers.push({
        workspaceId: workspace.id,
        userId: user.id,
        userCode,
        username,
      });
    });

    await this.prisma.workspaceMember.createMany({ data: workspaceMembers });
  }
}
