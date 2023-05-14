import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserContext } from './user-context';

@Global()
@Module({})
export class GlobalModule {
  static forRoot(): DynamicModule {
    return {
      module: GlobalModule,
      providers: [UserContext],
      exports: [UserContext],
    };
  }
}
