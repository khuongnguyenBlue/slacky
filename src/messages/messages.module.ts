import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { ChannelsModule } from 'src/channels/channels.module';

@Module({
  imports: [ChannelsModule],
  providers: [MessagesService, MessagesRepository],
  controllers: [MessagesController],
})
export class MessagesModule {}
