import { Injectable } from '@nestjs/common';
import { Reciever } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

type UserGroupSelect = {
  groupId: string;
  archived: boolean;
  muted: boolean;
  included: boolean;
  group: {
    name: string;
    s3FileId: string;
    Reciever: Partial<Reciever>[];
  };
};

type UserGroupWithUnreadMessages = UserGroupSelect & { unreadMessages: number };

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getUserGroups(userId: string): Promise<UserGroupWithUnreadMessages[]> {
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
            s3FileId: true,
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

    const userGroupsWithUnreadMessageCount: UserGroupWithUnreadMessages[] = [];

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
