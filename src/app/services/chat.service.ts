import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private httpClient = inject(HttpClient);
  connection: signalR.HubConnection= new signalR.HubConnectionBuilder().withUrl("http://localhost:5299/chatHub").build();

  constructor() {
    this.connect();
  }

  async connect()  {
    try {
      await this.connection.start();
      console.log("Connected");
      await this.connection.on("ReceiveMessage", (message, arg) => {
        console.log(`message ${message} arg ${arg}`);});    
    }
    catch (err: any) {
      return console.error(err.toString());
    }
  }

  sendMessage(message: string, arg: string) {
    this.connection.invoke("SendMessage", message, arg).catch((err) => {
      return console.error(err.toString());
    });
  }

}
