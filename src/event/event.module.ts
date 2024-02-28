import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MessageModule, UserModule],
  providers: [EventGateway],
})
export class EventModule {}
