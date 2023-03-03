import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: string) {
    //
    this.server.emit('getMessage', message);
  }

  afterInit(server: any) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    //
    console.log(`disconnected ${client.id}`);
  }
}
