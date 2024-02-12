import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ChatResponseDto } from './dto/chat-response.dto';

@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('chats')
  async getChats(
    @CurrentUser() user: Partial<User>,
  ): Promise<ChatResponseDto[]> {
    return this.chatService.getChatsByUserId(user.id);
  }

  @Get('chat')
  async getChat(
    @CurrentUser() user: Partial<User>,
    @Query('userId') userId?: string, // toUserId
    @Query('groupId') groupId?: string, // toGroupId
  ): Promise<ChatResponseDto> {
    return this.chatService.getChat(user.id, userId, groupId);
  }
}
