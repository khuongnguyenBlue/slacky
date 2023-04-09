import { Global, Module } from '@nestjs/common';
import { UserContext } from './contexts/user.context';

@Global()
@Module({
  exports: [UserContext],
  providers: [UserContext],
})
export class GlobalModule {}
