import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module, forwardRef } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [PrismaModule, S3Module, forwardRef(() => AuthModule)],
  // maybe needed in future: importing S3Service directly (not best practice)
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
