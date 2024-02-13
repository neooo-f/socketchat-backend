import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
// import { AuthService } from 'src/common/auth/auth.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from './types/create-message.dto';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {} // private readonly authService: AuthService,

  handleConnection(client: Socket) {
    // TODO: WS auth
    // const token = client.handshake.auth.token;
    // const payload = this.authService.verifyToken(token);

    // if (!payload) {
    //   client.disconnect(true);
    // } else {
    //   console.log(`Client ${client.id} connected. Auth token: ${token}`);
    // }
    console.log(`Client ${client.id} connected.`);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId?: string, groupId?: string) {
    if (groupId) {
      console.log(`Client ${client.id} joined group live: ${groupId}`);
      client.join(groupId);
    }

    if (userId) {
      console.log(`Client ${client.id} joined user live: ${userId}`);
      client.join(userId);
    }
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, userId?: string, groupId?: string) {
    if (groupId) {
      console.log(`Client ${client.id} joined group live: ${groupId}`);
      client.leave(groupId);
    }

    if (userId) {
      console.log(`Client ${client.id} joined user live: ${userId}`);
      client.leave(userId);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, createMessageDto: CreateMessageDto) {
    if (createMessageDto.toGroupId) {
      console.log(
        `Client ${client.id} (User ${createMessageDto.fromUserId}) sended message: ${createMessageDto.content} to group: ${createMessageDto.toGroupId}`,
      );

      const message = await this.messageService.createMessage(
        createMessageDto.fromUserId,
        createMessageDto.content,
        undefined,
        createMessageDto.toGroupId,
      );
      console.log(message);
      client.emit('message', createMessageDto);
      client.to(createMessageDto.toGroupId).emit('message', message);
    }

    if (createMessageDto.toUserId) {
      console.log(
        `Client ${client.id} (User ${createMessageDto.fromUserId}) sended message: ${createMessageDto.content} to user: ${createMessageDto.toUserId}`,
      );

      const message = await this.messageService.createMessage(
        createMessageDto.fromUserId,
        createMessageDto.content,
        createMessageDto.toUserId,
        undefined,
      );
      console.log(message);
      client.emit('message', createMessageDto);
      client.to(createMessageDto.toUserId).emit('message', message);
    }
  }

  // @SubscribeMessage('isTyping')
  // async handleTypingNotification(
  //   client: Socket,
  //   userId?: string,
  //   groupId?: string,
  // ) {
  //   if (groupId) {
  //     console.log(`Client ${client.id} typing message to group: ${groupId}`);
  //     client
  //       .to(groupId.toString())
  //       .emit('isTyping', `${client.id} typing message...`);
  //   }

  //   if (userId) {
  //     console.log(`Client ${client.id} typing message to user: ${userId}`);
  //     client
  //       .to(userId.toString())
  //       .emit('isTyping', `${client.id} typing message...`);
  //   }
  // }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}
