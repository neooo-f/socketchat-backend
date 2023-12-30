import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  // TODO: return type
  async getUserGroups(userId: string): Promise<any[]> {
    /* TODO: later on maybe set included in where clause to only render 
    groups where user is included */
    const userGroups = await this.prisma.groupUser.findMany({
      where: {
        userId: String(userId),
      },
      select: {
        groupId: true,
        archived: true,
        muted: true,
        included: true,
        group: {
          select: {
            name: true,
            s3File: true,
            Reciever: {
              where: {
                userId: String(userId),
                read: false,
              },
              select: {
                read: true,
              },
            },
          },
        },
      },
    });

    const userGroupsWithUnreadMessageCount = [];

    for (const userGroup of userGroups) {
      const unreadMessages = userGroup.group.Reciever.length;
      userGroupsWithUnreadMessageCount.push({
        ...userGroup,
        unreadMessages: unreadMessages,
      });
    }

    return userGroupsWithUnreadMessageCount;
  }
}
