import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  // TODO: mark messages as read in reciever which got sent by fromUser
  async createMessage(
    fromUserId: string,
    content: string,
    toUserId?: string,
    toGroupId?: string,
  ): Promise<Message> {
    if (toUserId) {
      const message = await this.prisma.message.create({
        data: {
          userId: fromUserId,
          content: content,
        },
      });

      await this.prisma.reciever.create({
        data: {
          userId: toUserId,
          groupId: null,
          messageId: message.id,
        },
      });

      return message;
    }

    if (toGroupId) {
      const message = await this.prisma.message.create({
        data: {
          userId: fromUserId,
          content: content,
        },
      });

      const groupUsers = await this.prisma.groupUser.findMany({
        where: {
          groupId: toGroupId,
          included: true,
        },
      });

      await Promise.all(
        groupUsers.map(async (groupUser) => {
          await this.prisma.reciever.create({
            data: {
              userId: groupUser.userId,
              groupId: toGroupId,
              messageId: message.id,
            },
          });
        }),
      );

      return message;
    }
  }

  async getMessages(
    fromUserId: string,
    take: string,
    skip: string,
    toUserId?: string,
    toGroupId?: string,
  ): Promise<MessageResponseDto[]> {
    if (toGroupId) {
      return this.getGroupMessages(fromUserId, toGroupId, take, skip);
    }

    if (toUserId) {
      return this.getSingleMessages(fromUserId, toUserId, take, skip);
    }

    // TOOD: error handling!
    return null;
  }

  async getSingleMessages(
    fromUserId: string,
    toUserId: string,
    take: string,
    skip: string,
  ): Promise<MessageResponseDto[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            userId: String(fromUserId),
            Reciever: {
              some: {
                userId: String(toUserId),
                group: { is: null },
              },
            },
          },
          {
            userId: String(toUserId),
            Reciever: {
              some: {
                userId: String(fromUserId),
                group: { is: null },
              },
            },
          },
        ],
      },
      select: {
        userId: true,
        content: true,
        createdAt: true,
        User: {
          select: {
            firstName: true,
          },
        },
      },
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages.map((message) => ({
      userId: message.userId,
      firstName: message.User.firstName,
      content: message.content,
      isIncoming: message.userId === toUserId,
      createdAt: message.createdAt,
    }));
  }

  async getGroupMessages(
    fromUserId: string,
    groupId: string,
    take: string,
    skip: string,
  ): Promise<MessageResponseDto[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        Reciever: {
          some: { groupId: String(groupId) },
        },
      },
      select: {
        userId: true,
        content: true,
        createdAt: true,
        User: {
          select: {
            firstName: true,
          },
        },
      },
      take: Number(take),
      skip: Number(skip),
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages.map((message) => ({
      userId: message.userId,
      firstName: message.User.firstName,
      content: message.content,
      isIncoming: message.userId !== fromUserId,
      createdAt: message.createdAt,
    }));
  }
}
