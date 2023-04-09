import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeederModule } from './seeder/seeder.module';
import { ChannelsModule } from './channels/channels.module';
import { ClientTokenMiddleware } from './middlewares/client-token.middleware';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [PrismaModule, SeederModule, ChannelsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientTokenMiddleware).forRoutes(':clientToken/*');
  }
}
