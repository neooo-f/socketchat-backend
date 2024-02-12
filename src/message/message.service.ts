import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

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

    // TODO: in case that message got sent to a group instead of user (save message for all group users)
    if (toGroupId) {
      return null;
    }
  }

  async getSingleMessages() {
    return null;
  }

  async getGroupMessages() {
    return null;
  }

  /* 
  
  --functions--

  - getMessages()
  - getGroupMessages()
  - getMoreMessages()
  
  */
}
