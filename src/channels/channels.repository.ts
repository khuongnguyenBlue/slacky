import { Injectable } from '@nestjs/common';
import { Channel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './channels.dtos';

@Injectable()
export class ChannelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findChannelsByMemberId(memberId: number): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: { Members: { some: { userId: memberId } } },
    });
  }

  findChannelByName(name: string): Promise<Channel> {
    return this.prisma.channel.findFirst({
      where: { name },
    });
  }
  async createChannel(
    userId: number,
    body: CreateChannelDto,
  ): Promise<Channel> {
    return await this.prisma.channel.create({
      data: {
        ...body,
        creatorId: userId,
        description: '',
        Members: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });
  }
}
