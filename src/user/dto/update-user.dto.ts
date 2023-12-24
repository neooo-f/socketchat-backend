import {
  IsString,
  IsEnum,
  IsStrongPassword,
  IsAlpha,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Gender must be either Male, Female or Other' })
  gender: Gender;

  @IsOptional()
  @IsString()
  biography: string;

  @IsOptional()
  @IsString()
  s3FileId: string;
}
