import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './channels.dtos';
import { UserContext } from 'src/global/user-context';

@Controller(':memberCode/channels')
export class ChannelsController {
  constructor(
    private readonly userContext: UserContext,
    private readonly channelsService: ChannelsService,
  ) {}

  @Get()
  async getUserChannels() {
    const jwtPayload = this.userContext.getJwtPayload();
    const workspaceId = this.userContext.getWorkspaceId();
    const channels = await this.channelsService.findChannelsByUser(
      jwtPayload.sub,
      workspaceId,
    );
    return channels;
  }

  @Post()
  async createChannel(@Body() body: CreateChannelDto) {
    const jwtPayload = this.userContext.getJwtPayload();
    const workspaceId = this.userContext.getWorkspaceId();

    if (body.workspaceId !== workspaceId) {
      throw new ForbiddenException('Unauthorized workspace');
    }

    const channel = await this.channelsService.createChannel(
      jwtPayload.sub,
      body,
    );
    return channel;
  }
}
