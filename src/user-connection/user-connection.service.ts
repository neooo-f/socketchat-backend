import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserConnectionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserConnections(userId: string): Promise<any[]> {
    const userConnections = await this.prisma.userUser.findMany({
      where: { fromUserId: String(userId) },
      select: {
        toUserId: true,
        archived: true,
        muted: true,
        blocked: true,
        toUser: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const userConnectionsWithUnreadMessageCount = [];

    for (const userConnection of userConnections) {
      const unreadMessages = await this.prisma.message.count({
        where: {
          userId: String(userConnection.toUserId),
          Reciever: {
            every: {
              userId: String(userId),
              read: false,
            },
          },
        },
      });

      userConnectionsWithUnreadMessageCount.push({
        ...userConnection,
        unreadMessages: unreadMessages,
      });
    }

    return userConnectionsWithUnreadMessageCount;
  }

  async getUserWithInteractionsByUserIds(
    fromUserId: string,
    toUserId: string,
  ): Promise<any | undefined> {
    return this.prisma.userUser.findFirst({
      where: { fromUserId: String(fromUserId), toUserId: String(toUserId) },
      include: {
        toUser: {
          select: {
            // TODO: CHECK: should return every property except the password of the user
            password: false,
            createdAt: false,
            updatedAt: false,
          },
        },
      },
    });
  }
}
