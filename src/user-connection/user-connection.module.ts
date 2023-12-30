import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserConnectionService } from './user-connection.service';

@Module({
  imports: [PrismaModule],
  providers: [UserConnectionService],
  exports: [UserConnectionService],
})
export class UserConnectionModule {}
