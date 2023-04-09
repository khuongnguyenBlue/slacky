import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { ChannelsRepository } from './channels.repository';
import { ChannelType } from '@prisma/client';

describe('ChannelsService', () => {
  let service: ChannelsService;
  const repository = {
    findChannelsByMemberId: jest.fn(),
  };
  const userId = 1;

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

  describe('findChannelsByMemberId', () => {
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
        repository.findChannelsByMemberId.mockResolvedValue(mockChannels);
      });

      it('should find channels by member id and return the list', async () => {
        const result = await service.findChannelsByMemberId(userId);
        expect(repository.findChannelsByMemberId).toBeCalledWith(userId);
        expect(result).toEqual(mockChannels);
      });
    });
  });
});
