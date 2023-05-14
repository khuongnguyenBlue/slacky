import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { ChannelsRepository } from './channels.repository';
import { ChannelType } from '@prisma/client';
import { CreateChannelDto } from './channels.dtos';
import { BadRequestException } from '@nestjs/common';

describe('ChannelsService', () => {
  let service: ChannelsService;
  const repository = {
    findChannelsByUser: jest.fn(),
    findChannelByName: jest.fn(),
    createChannel: jest.fn(),
  };
  const userId = 1;
  const workspaceId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        { provide: ChannelsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findChannelsByUser', () => {
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
        repository.findChannelsByUser.mockResolvedValue(mockChannels);
      });

      it('should find channels by member id and return the list', async () => {
        const result = await service.findChannelsByUser(userId, workspaceId);
        expect(repository.findChannelsByUser).toBeCalledWith(
          userId,
          workspaceId,
        );
        expect(result).toEqual(mockChannels);
      });
    });
  });

  describe('createChannel', () => {
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

    const body: CreateChannelDto = {
      workspaceId: 1,
      name: 'learning',
      type: 'PUBLIC',
    };

    describe('happy case', () => {
      beforeEach(() => {
        repository.findChannelByName.mockResolvedValue(null);
        repository.createChannel.mockResolvedValue(mockChannel);
      });

      it('should create new channel correctly', async () => {
        const result = await service.createChannel(userId, body);
        expect(repository.findChannelByName).toBeCalledWith(body.name);
        expect(repository.createChannel).toBeCalledWith(userId, body);
        expect(result).toEqual(mockChannel);
      });
    });

    describe('validation', () => {
      // TODO
    });

    describe('when channel name has been taken', () => {
      beforeEach(() => {
        repository.findChannelByName.mockResolvedValue(mockChannel);
      });

      it('should throw bad request', async () => {
        expect(service.createChannel(userId, body)).rejects.toThrowError(
          BadRequestException,
        );
      });
    });
  });
});
