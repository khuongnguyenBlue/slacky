import { BadRequestException, Injectable } from '@nestjs/common';
import { ChannelsRepository } from './channels.repository';
import { CreateChannelDto } from './channels.dtos';

@Injectable()
export class ChannelsService {
  constructor(private readonly channelsRepository: ChannelsRepository) {}

  async findChannelsByMemberId(memberId: number) {
    const channels = await this.channelsRepository.findChannelsByMemberId(
      memberId,
    );

    return channels;
  }

  async createChannel(userId: number, body: CreateChannelDto) {
    const existingChannel = await this.channelsRepository.findChannelByName(
      body.name,
    );
    if (existingChannel) {
      throw new BadRequestException('Channel name has been taken');
    }

    const newChannel = await this.channelsRepository.createChannel(
      userId,
      body,
    );

    return newChannel;
  }
}
