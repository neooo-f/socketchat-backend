import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  /* 
  
  --functions--

  - getChatsByUserId()
  - getChatsByUserIdContaining()
  
  */
}
