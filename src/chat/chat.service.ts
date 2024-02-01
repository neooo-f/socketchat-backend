import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GroupService } from 'src/group/group.service';
import { UserConnectionService } from 'src/user-connection/user-connection.service';
import { ChatResponseDto } from './dto/chat-response.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private userConnectionService: UserConnectionService,
    private groupService: GroupService,
    private s3Service: S3Service,
  ) {}

  async getChatsByUserId(userId: string): Promise<ChatResponseDto[]> {
    const userGroups = await this.groupService.getUserGroups(userId);

    const userConnections =
      await this.userConnectionService.getAllUserConnections(userId);

    const chats: ChatResponseDto[] = [];

    for (const userGroup of userGroups) {
      chats.push({
        groupId: userGroup.groupId,
        name: userGroup.group.name,
        profileImageUrl: userGroup.group.s3FileId
          ? await this.s3Service.getFileUrlByLocalId(userGroup.group.s3FileId)
          : null,
        unreadMessages: userGroup.unreadMessages,
        archived: userGroup.archived,
        muted: userGroup.muted,
        included: userGroup.included || false,
      });
    }

    for (const userConnection of userConnections) {
      chats.push({
        userId: userConnection.toUserId,
        name: `${userConnection.toUser.firstName} ${userConnection.toUser.lastName}`,
        profileImageUrl: userConnection.toUser.s3FileId
          ? await this.s3Service.getFileUrlByLocalId(
              userConnection.toUser.s3FileId,
            )
          : null,
        unreadMessages: userConnection.unreadMessages,
        archived: userConnection.archived,
        muted: userConnection.muted,
        blocked: userConnection.blocked || false,
      });
    }

    return chats;
  }

  // TODO: implement
  async getChatsByUserIdContaining(): Promise<ChatResponseDto[]> {
    return null;
  }
}
