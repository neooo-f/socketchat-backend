import {
  IsString,
  IsEnum,
  Matches,
  IsStrongPassword,
  IsAlpha,
  IsNotEmpty,
  IsDateString,
  MinDate,
  MaxDate,
  IsOptional,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message:
      'Username must contain only letters, numbers, underscores, hyphens, and dots',
  })
  username: string;

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

  @IsNotEmpty()
  @MinDate(
    (): Date => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 100);
      return currentDate;
    },
    {
      message: 'People over 100 are not allowed.',
    },
  )
  @MaxDate(
    (): Date => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 12);
      return currentDate;
    },
    { message: 'People under 12 are not allowed.' },
  )
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  biography: string;

  /* @IsOptional()
  @IsUUID()
  s3FileId: string; */ // S3 File logic here (validation etc.)
}
