import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  channelId: number;

  @IsString()
  content: string;
}
