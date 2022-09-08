import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { IHttpConnectionOptions } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  constructor() {}
  public buildHub(api: string): signalR.HubConnection {
    let hubConnection: signalR.HubConnection =
      new signalR.HubConnectionBuilder().withUrl(api).build();
    return hubConnection;
  }
}
