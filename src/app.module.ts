import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChannelsModule } from './channels/channels.module';
import { ClientTokenMiddleware } from './middlewares/client-token.middleware';
import { GlobalModule } from './global/global.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PrismaModule,
    ChannelsModule,
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientTokenMiddleware)
      .exclude('/auth/(.*)') // exclude auth routes
      .forRoutes(':clientToken/*'); // apply middleware to all other routes
  }
}
