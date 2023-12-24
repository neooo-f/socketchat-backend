import {
  IsString,
  IsEnum,
  Matches,
  IsStrongPassword,
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  IsDateString,
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
  /* @Type(() => Date) // cast to Date type
  @MaxDate(() => new Date('2006-01-01'), {
    message: 'Das Datum muss vor dem Jahr 2006 liegen.',
  })
  @MinDate(() => new Date('1969-01-01'), {
    message: 'Das Datum muss nach dem Jahr 1969 liegen.',
  })
  @IsDate() */
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  biography: string;
}
