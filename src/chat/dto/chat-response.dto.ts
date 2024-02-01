export class ChatResponseDto {
  name: string;
  userId?: string; // only userId or groupId
  groupId?: string;
  profileImageUrl: string | null; // s3file signed url
  unreadMessages: number;
  archived: boolean;
  muted: boolean;
  blocked?: boolean;
  included?: boolean; // only group chats
}
