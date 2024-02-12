import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  readonly fromUserId: string;

  @IsUUID()
  readonly toUserId?: string;

  @IsUUID()
  readonly toGroupId?: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  readonly content: string;
}
