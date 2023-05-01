import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { UserContext } from 'src/global/contexts/user.context';
import { ChannelType } from '@prisma/client';
import { CreateChannelDto } from './channels.dtos';

describe('ChannelsController', () => {
  let controller: ChannelsController;
  const service = {
    findChannelsByMemberId: jest.fn(),
    createChannel: jest.fn(),
  };
  const userId = 1;
  const context = {
    getUserId: () => userId,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsController],
      providers: [
        { provide: ChannelsService, useValue: service },
        { provide: UserContext, useValue: context },
      ],
    }).compile();

    controller = module.get<ChannelsController>(ChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserChannels', () => {
    describe('happy case', () => {
      const mockChannels = [
        {
          id: 1,
          workspaceId: 1,
          creatorId: 1,
          name: 'general',
          type: ChannelType.PUBLIC,
          archived: false,
          description: 'Non quia ut quas.',
          createdAt: new Date(),
        },
        {
          id: 2,
          workspaceId: 1,
          creatorId: 1,
          name: 'random',
          type: ChannelType.PUBLIC,
          archived: false,
          description: 'Non quia ut quas.',
          createdAt: new Date(),
        },
      ];

      beforeEach(() => {
        service.findChannelsByMemberId.mockResolvedValue(mockChannels);
      });

      it('should find channels by user id and return the list', async () => {
        const result = await controller.getUserChannels();
        expect(service.findChannelsByMemberId).toBeCalledWith(userId);
        expect(result).toEqual(mockChannels);
      });
    });
  });

  describe('createChannel', () => {
    describe('happy case', () => {
      const body: CreateChannelDto = {
        workspaceId: 1,
        name: 'learning',
        type: 'PUBLIC',
      };

      const mockChannel = {
        id: 1,
        workspaceId: 1,
        creatorId: 1,
        name: 'general',
        type: ChannelType.PUBLIC,
        archived: false,
        description: 'Non quia ut quas.',
        createdAt: new Date(),
      };

      beforeEach(() => {
        service.createChannel.mockResolvedValue(mockChannel);
      });

      it('should call service to create channel', async () => {
        const result = await controller.createChannel(body);
        expect(service.createChannel).toBeCalledWith(userId, body);
        expect(result).toEqual(mockChannel);
      });
    });
  });
});
