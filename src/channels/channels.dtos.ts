import { ChannelType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsNumber()
  workspaceId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum([ChannelType.PRIVATE, ChannelType.PUBLIC], {
    message: 'Invalid channel type',
  })
  type: ChannelType;
}
