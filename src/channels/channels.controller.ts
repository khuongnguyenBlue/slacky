import { Controller, Get } from '@nestjs/common';
import { UserContext } from 'src/global/contexts/user.context';
import { ChannelsService } from './channels.service';

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
}
