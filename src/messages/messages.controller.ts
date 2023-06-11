import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserContext } from 'src/global/user-context';
import { CreateMessageDto } from './messages.dtos';
import { ChannelsService } from 'src/channels/channels.service';

@Controller(':memberCode/messages')
export class MessagesController {
  constructor(
    private readonly userContext: UserContext,
    private readonly messageService: MessagesService,
    private readonly channelService: ChannelsService,
  ) {}

  @Post()
  async postMessage(@Body() body: CreateMessageDto) {
    const jwtPayload = this.userContext.getJwtPayload();
    const userId = jwtPayload.sub;
    const channelMember = await this.channelService.findMemberByChannelAndUser(
      body.channelId,
      userId,
    );
    if (!channelMember) {
      throw new ForbiddenException('User not in channel');
    }

    return this.messageService.createMessage(userId, body);
  }
}
