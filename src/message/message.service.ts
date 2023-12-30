import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  /* 
  
  --functions--

  - getMessages()
  - getGroupMessages()
  - getMoreMessages()
  
  */
}
