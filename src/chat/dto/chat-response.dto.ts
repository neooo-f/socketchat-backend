export class ChatResponseDto {
  name: string;
  profileImageUrl: string; // s3file signed url
  unreadMessages: number;
  archived: boolean;
  muted: boolean;
  blocked?: boolean;
  included?: boolean; // only group chats
}
