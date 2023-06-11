import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './messages.dtos';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    userId: number,
    payload: CreateMessageDto,
  ): Promise<Message> {
    return await this.prisma.message.create({
      data: {
        ...payload,
        userId,
      },
    });
  }
}
