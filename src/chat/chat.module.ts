import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GroupService } from 'src/group/group.service';
import { UserConnectionModule } from 'src/user-connection/user-connection.module';

@Module({
  imports: [PrismaModule, UserConnectionModule],
  controllers: [ChatController],
  providers: [ChatService, GroupService],
})
export class ChatModule {}
