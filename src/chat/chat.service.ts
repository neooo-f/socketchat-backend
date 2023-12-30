import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GroupService } from 'src/group/group.service';
import { UserConnectionService } from 'src/user-connection/user-connection.service';
import { ChatResponseDto } from './dto/chat-response.dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private userConnectionService: UserConnectionService,
    private groupService: GroupService,
  ) {}

  /* 
  
  --functions--

  - getChatsByUserId()
  - getChatsByUserIdContaining()
  
  */
  async getChatsByUserId(userId: string): Promise<ChatResponseDto[]> {
    const userGroups = await this.groupService.getUserGroups(userId);

    const userConnections =
      await this.userConnectionService.getAllUserConnections(userId);

    const chats: ChatResponseDto[] = [];

    for (const userGroup of userGroups) {
      chats.push({
        name: userGroup.group.name,
        profileImageUrl: userGroup.group.s3File,
        unreadMessages: userGroup.unreadMessages,
        archived: userGroup.archived,
        muted: userGroup.muted,
        included: userGroup.included || false,
      });
    }

    for (const userConnection of userConnections) {
      chats.push({
        name: `${userConnection.toUser.firstName} ${userConnection.toUser.lastName}`,
        profileImageUrl: '', // Hier musst du den S3-Dateipfad für das Profilbild einfügen
        unreadMessages: userConnection.unreadMessages,
        archived: userConnection.archived,
        muted: userConnection.muted,
        blocked: userConnection.blocked || false,
      });
    }

    return chats;
  }
}
