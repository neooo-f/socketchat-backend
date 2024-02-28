export class MessageResponseDto {
  userId: string;
  firstName: string;
  content: string;
  isIncoming: boolean;
  // maybe read to display which message got read or not?
  createdAt: Date;
}
