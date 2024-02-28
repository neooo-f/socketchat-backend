import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageResponseDto } from 'src/message/dto/message-response.dto';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  @WebSocketServer() server: Server;

  private clientMapping = new Map<string, string>();

  async handleConnection(client: Socket) {
    const { userId } = client.handshake.query;
    // FIXME: maybe replace by mapping in future
    client.data.userId = userId;

    this.clientMapping.set(
      Array.isArray(userId) ? userId[0] : userId,
      client.id,
    );

    console.log(this.clientMapping, 'CLIENT MAPPING AFTER CONNECT');

    console.log(
      `Client mit der UserID ${client.data.userId} ist nun verbunden.`,
    );
  }

  handleDisconnect(client: Socket) {
    this.clientMapping.delete(client.data.userId);

    console.log(this.clientMapping, 'CLIENT MAPPING AFTER DISCONNECT');

    console.log(
      `Client mit der UserID ${client.data.userId} hat die Verbindung getrennt.`,
    );
  }

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    client: Socket,
    payload: { toUserId: string; content: string },
  ) {
    console.log(payload);
    const senderUserId = client.data.userId; //FIXME: maybe replace by mapping in future
    const receiverUserId = payload.toUserId;

    const message = await this.messageService.createMessage(
      senderUserId,
      payload.content,
      receiverUserId,
      undefined,
    );

    console.log(message);

    // this.server
    //   .to(this.clientMapping.get(receiverUserId))
    //   .emit('privateMessage', {
    //     fromUserId: senderUserId,
    //     message: payload.content,
    //   });
    const res: MessageResponseDto = {
      userId: senderUserId,
      firstName: 'DUMMY FIRST NAME',
      content: message.content,
      isIncoming: false,
      createdAt: message.createdAt,
    };

    this.server
      .to(this.clientMapping.get(receiverUserId))
      .emit('privateMessage', res);
  }
}
