import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { S3Service } from 'src/s3/s3.service';
import { hash } from 'bcrypt';

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

  //   async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
  //     const { postcode, location, ...userData } = updateData;

  //     if (
  //       updateData.postcode !== undefined ||
  //       updateData.location !== undefined
  //     ) {
  //       const postcodeRecord = await this.postcodeService.findOrCreatePostcode(
  //         postcode,
  //         location,
  //       );

  //       return this.prisma.user.update({
  //         where: { id: id },
  //         data: {
  //           ...userData,
  //           postcode: {
  //             connect: { id: postcodeRecord.id },
  //           },
  //         },
  //       });
  //     } else {
  //       return this.prisma.user.update({
  //         where: { id: id },
  //         data: userData,
  //       });
  //     }
  //   }
}
