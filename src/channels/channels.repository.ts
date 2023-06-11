import { Injectable } from '@nestjs/common';
import { Channel, ChannelMember } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './channels.dtos';

@Injectable()
export class ChannelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findChannelsByUser(
    memberId: number,
    workspaceId: number,
  ): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: { workspaceId, Members: { some: { userId: memberId } } },
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

  async findMemberByChannelAndUser(
    channelId: number,
    userId: number,
  ): Promise<ChannelMember> {
    return await this.prisma.channelMember.findFirst({
      where: { channelId, userId },
    });
  }
}
