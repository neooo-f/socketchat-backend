import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { S3Controller } from './s3.controller';
import { S3 } from 'aws-sdk';
import { S3Service } from './s3.service';

@Module({
  imports: [PrismaModule],
  providers: [S3Service, S3],
  exports: [S3Service],
  controllers: [S3Controller],
})
export class S3Module {}
