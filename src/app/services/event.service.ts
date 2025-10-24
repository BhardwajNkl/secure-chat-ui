import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3001';

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  // login event
  sendUserLoginEvent(userId: string) {
    this.socket.emit('LOGIN', { userId });
  }

  // logout publish: use not clear as of now. but lets send.
  sendUserLogoutEvent(userId: string) {
    this.socket.emit('LOGOUT', { userId });
  }

  // send message to server
  sendMessage(message: { senderId: string; receiverId: string; messageContent: string }) {
    this.socket.emit('SEND_MESSAGE', message);
  }

  // listen for incoming messages
  getMessages(): Observable<{ senderId: string; receiverId: string; messageContent: string }> {
    return new Observable((observer) => {
      this.socket.on('RECEIVE_MESSAGE', (data) => {
        observer.next(data);
      });
    });
  }
}
