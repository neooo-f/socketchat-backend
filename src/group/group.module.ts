import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { GroupService } from './group.service';

@Module({
  imports: [PrismaModule],
  exports: [GroupService],
  providers: [GroupService],
})
export class GroupModule {}
