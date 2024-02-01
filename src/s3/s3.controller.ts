import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3File } from '@prisma/client';

// TODO: check if needed in future
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get(':id')
  async getFileUrl(@Param('id') id: string): Promise<string> {
    return this.s3Service.getFileUrlByLocalId(id);
  }

  @Post('/upload/:location')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('location') location: string,
  ): Promise<{ url: string }> {
    const res = await this.s3Service.uploadFile(file, location);
    return { url: res.location };
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @UploadedFile() newFile: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.s3Service.updateFile(newFile, id);
  }

  @Delete(':fileKey')
  async deleteFile(@Param('fileKey') fileKey: string): Promise<S3File> {
    return this.s3Service.deleteFile(fileKey);
  }
}
