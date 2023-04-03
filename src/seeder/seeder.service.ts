import { Injectable } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { WorkspaceSeeder } from './workspace.seeder';
import { WorkspaceMemberSeeder } from './workspace-member.seeder';
import { ChannelSeeder } from './channel.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly workspaceSeeder: WorkspaceSeeder,
    private readonly workspaceMemberSeeder: WorkspaceMemberSeeder,
    private readonly channelSeeder: ChannelSeeder,
  ) {}

  async seed() {
    await this.userSeeder.seed();
    await this.workspaceSeeder.seed();
    await this.workspaceMemberSeeder.seed();
    await this.channelSeeder.seed();
  }
}
