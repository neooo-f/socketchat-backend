import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResponseDto } from './dto/message-response.dto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(
    @CurrentUser() user: Partial<User>,
    @Query('take') take: string,
    @Query('skip') skip: string,
    @Query('userId') userId?: string, // toUserId
    @Query('groupId') groupId?: string, // toGroupId
  ): Promise<MessageResponseDto[]> {
    return this.messageService.getMessages(
      user.id,
      take,
      skip,
      userId,
      groupId,
    );
  }
}
