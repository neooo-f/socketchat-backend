import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
