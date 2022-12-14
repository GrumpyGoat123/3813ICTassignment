import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:any;

  constructor() { }

  //Setup connetion to socket server
  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  //Emit a message to the socket server
  send(message: string, room: any){
    this.socket.emit('message', {message, room});
  }

  //Listen for "message" events from the socket server
  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data:any)=> {observer.next(data)
      });
    });
  }

  //Doesnt work join notification
  joinNoti(){
    return new Observable(observer=>{
      this.socket.on('joinNoti', (data:any)=> {observer.next(data)
      });
    });
  }


  //Join room/channel
  joinRoom(room: any, username: any){
    this.socket.emit('joinRoom', room, username);
  }


}
