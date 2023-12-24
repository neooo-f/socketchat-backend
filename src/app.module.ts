import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './common/auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    EventModule,
    AuthModule,
    UserModule,
    PrismaModule,
    S3Module,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
