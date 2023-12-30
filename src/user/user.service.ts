import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { S3Service } from 'src/s3/s3.service';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { username: String(username) },
    });
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id: String(id) },
    });
  }

  async createUser(
    profileImage: Express.Multer.File,
    user: CreateUserDto,
  ): Promise<User> {
    const s3File = await this.s3Service.uploadFile(profileImage, 'profile');
    user.password = await hash(user.password, 10);
    user.dateOfBirth = new Date(user.dateOfBirth).toISOString();

    return this.prisma.user.create({
      data: {
        ...user,
        s3File: {
          connect: { id: s3File.id },
        },
      },
    });
  }

  async updateUser(
    updatedProfileImage: Express.Multer.File,
    updatedUser: UpdateUserDto,
  ): Promise<Partial<User>> {
    // TODO: check if user already has a profile image if he wants to change it
    // TODO: destructure at the top

    if (updatedUser.s3FileId && updatedProfileImage) {
      // await this.s3Service.updateFile(
      //   updatedProfileImage,
      //   updatedUser.s3FileId,
      // );
    }

    if (!updatedUser.s3FileId && updatedProfileImage) {
      // const res = await this.s3Service.uploadFile(
      //   updatedProfileImage,
      //   'profile',
      // );
      // const { id } = res;
      // this.prisma.user.update({
      //   data: {
      //     ...updatedUser,
      //     s3File: {
      //       connect: { id: id },
      //     },
      //   },
      //   where: {  }
      // });
      return null;
    }

    // return this.prisma.user.update({
    //   where: {  }
    // })
  }
}
