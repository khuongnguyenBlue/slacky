import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserContext } from 'src/global/contexts/user.context';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './channels.dtos';

@Controller(':clientToken/channels')
export class ChannelsController {
  constructor(
    private readonly userContext: UserContext,
    private readonly channelsService: ChannelsService,
  ) {}

  @Get()
  async getUserChannels() {
    const userId = this.userContext.getUserId();
    const channels = await this.channelsService.findChannelsByMemberId(userId);
    return { channels };
  }

  @Post()
  async createChannel(@Body() body: CreateChannelDto) {
    const userId = this.userContext.getUserId();
    const channel = await this.channelsService.createChannel(userId, body);
    return { channel };
  }
}
