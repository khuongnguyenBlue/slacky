import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './messages.dtos';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async createMessage(userId: number, payload: CreateMessageDto) {
    return await this.messagesRepository.createMessage(userId, payload);
  }
}
