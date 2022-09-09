import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';

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
