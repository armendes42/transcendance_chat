import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: { [key: string]: any } = {};

  afterInit() {
    console.log('Socket initialized');
  }

  handleConnection(socket: Socket) {
    console.log('Socket connected', socket.id);
    socket.on('user-connected', (user: any) => {
      this.users[socket.id] = { ...user, id: socket.id };
      socket.broadcast.emit('users-changed', Object.values(this.users));
      console.log('user-connected', this.users);
    });
    socket.on('new-chat-message', (message: any) => {
      console.log('new-chat-message', message);
      socket.to(message.recipientId).emit('new-chat-message', {
        text: message.text,
        senderId: socket.id,
      });
    });
  }

  handleDisconnect(socket: Socket) {
    console.log('Socket disconnected', socket.id);
    delete this.users[socket.id];
    socket.broadcast.emit('users-changed', Object.values(this.users));
    console.log('users-changed', this.users);
  }

  getUsers(): any[] {
    return Object.values(this.users);
  }
}