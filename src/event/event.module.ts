import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [EventGateway],
})
export class EventModule {}
