import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '@prisma/client';
// import { hash } from 'bcrypt';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

  //   async createUser(data: CreateUserDto): Promise<User> {
  //     const { postcode, location, ...userData } = data;

  //     userData.password = await hash(userData.password, 10);

  //     const postcodeEntry = await this.postcodeService.findOrCreatePostcode(
  //       postcode,
  //       location,
  //     );

  //     return this.prisma.user.create({
  //       data: {
  //         ...userData,
  //         postcode: {
  //           connect: { id: postcodeEntry.id },
  //         },
  //       },
  //     });
  //   }

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
