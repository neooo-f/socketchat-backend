import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  //   @SubscribeMessage('chat')
  //   handleMessage(client: any, payload: any): void {
  //     console.log(payload);
  //     this.server.emit('chat', payload);
  //   }

  @SubscribeMessage('chat')
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    this.server.emit('chat', payload);
  }
}
