import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3File } from '@prisma/client';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class S3Service {
  constructor(
    private readonly s3: S3,
    private prisma: PrismaService,
  ) {
    this.s3 = new S3({
      endpoint: process.env.S3_ENDPOINT,
      s3ForcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
      region: process.env.S3_REGION,
    });
  }

  async getFileUrl(bucket: string, key: string): Promise<string> {
    const params: S3.GetObjectRequest = {
      Bucket: bucket,
      Key: key,
    };

    const url: string = await this.s3.getSignedUrlPromise('getObject', params);
    return url;
  }

  public async getFileUrlByLocalId(id: string) {
    const s3Entry = await this.prisma.s3File.findUnique({
      where: { id: String(id) },
    });

    const { s3Bucket, s3FileKey } = s3Entry;

    return this.getFileUrl(s3Bucket, s3FileKey);
  }

  async uploadFile(
    file: Express.Multer.File,
    location: string,
  ): Promise<{ location: string; id: string }> {
    const fileBuffer = file.buffer;
    const key = `${location}/${Date.now()}_${file.originalname}`;

    const params: S3.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read',
    };

    const upload: ManagedUpload = this.s3.upload(params);
    const result: S3.ManagedUpload.SendData = await upload.promise();

    const s3File = await this.saveFileInfo(
      key,
      process.env.S3_BUCKET_NAME,
      file.originalname,
      file.mimetype,
    );

    return { location: result.Location, id: s3File.id };
    //return result.Location;
  }

  async deleteFile(id: string): Promise<S3File> {
    const deleteEntry = await this.prisma.s3File.delete({
      where: { id: String(id) },
    });

    const { s3FileKey, s3Bucket } = deleteEntry;

    const params: S3.DeleteObjectRequest = {
      Bucket: s3Bucket,
      Key: s3FileKey,
    };

    await this.s3.deleteObject(params).promise();

    return deleteEntry;
  }

  async updateFile(file: Express.Multer.File, id: string) {
    const s3Entry = await this.prisma.s3File.findUnique({
      where: { id: String(id) },
    });

    const fileBuffer = file.buffer;
    const { s3FileKey, s3Bucket } = s3Entry;

    const params: S3.PutObjectRequest = {
      Bucket: s3Bucket,
      Key: s3FileKey,
      Body: fileBuffer,
    };

    const upadte = this.s3.putObject(params);
    await upadte.promise();

    // TOOD: check if return is needed
    return this.prisma.s3File.update({
      where: { id: String(id) },
      data: {
        originalName: file.originalname,
        mimeType: file.mimetype,
      },
    });
  }

  private saveFileInfo(
    fileKey: string,
    bucket: string,
    originalName: string,
    mimeType: string,
  ): Promise<S3File> {
    return this.prisma.s3File.create({
      data: {
        s3FileKey: fileKey,
        s3Bucket: bucket,
        originalName: originalName,
        mimeType: mimeType,
      },
    });
  }
}
