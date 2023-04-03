import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserSeeder } from './user.seeder';
import { WorkspaceSeeder } from './workspace.seeder';
import { WorkspaceMemberSeeder } from './workspace-member.seeder';
import { ChannelSeeder } from './channel.seeder';

@Module({
  imports: [PrismaModule],
  providers: [
    SeederService,
    UserSeeder,
    WorkspaceSeeder,
    WorkspaceMemberSeeder,
    ChannelSeeder,
  ],
  exports: [SeederService],
})
export class SeederModule {}
