import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async getChats(@CurrentUser() user: Partial<User>): Promise<any> {
    return this.chatService.getChatsByUserId(user.id);
  }
}
