import { Injectable } from '@nestjs/common';
import { Channel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findChannelsByMemberId(memberId: number): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: { Members: { some: { userId: memberId } } },
    });
  }
}
