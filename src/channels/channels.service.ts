import { Injectable } from '@nestjs/common';
import { ChannelsRepository } from './channels.repository';

@Injectable()
export class ChannelsService {
  constructor(private readonly channelsRepository: ChannelsRepository) {}

  async findChannelsByMemberId(memberId: number) {
    const channels = await this.channelsRepository.findChannelsByMemberId(
      memberId,
    );

    return channels;
  }
}
