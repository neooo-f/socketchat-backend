import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

type UserConnectionSelect = {
  toUserId: string;
  archived: boolean;
  muted: boolean;
  blocked: boolean;
  toUser: {
    username: string;
    firstName: string;
    lastName: string;
    s3FileId: string;
  };
};

type UserConnectionWithUnreadMessages = UserConnectionSelect & {
  unreadMessages: number;
};

@Injectable()
export class UserConnectionService {
  constructor(private prisma: PrismaService) {}

  async getAllUserConnections(
    userId: string,
  ): Promise<UserConnectionWithUnreadMessages[]> {
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
            s3FileId: true,
          },
        },
      },
    });

    const userConnectionsWithUnreadMessageCount: UserConnectionWithUnreadMessages[] =
      [];

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

  async getUserConnection(
    fromUserId: string,
    toUserId: string,
  ): Promise<UserConnectionWithUnreadMessages> {
    const userConnection = await this.prisma.userUser.findFirst({
      where: { fromUserId: String(fromUserId), toUserId: String(toUserId) },
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
            s3FileId: true,
          },
        },
      },
    });

    return {
      ...userConnection,
      unreadMessages: await this.prisma.message.count({
        where: {
          userId: String(userConnection.toUserId),
          Reciever: {
            every: {
              userId: String(fromUserId),
              read: false,
            },
          },
        },
      }),
    };
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
            username: true,
            lastName: true,
            gender: true,
            dateOfBirth: true,
            biography: true,
            s3FileId: true,
          },
        },
      },
    });
  }
}
