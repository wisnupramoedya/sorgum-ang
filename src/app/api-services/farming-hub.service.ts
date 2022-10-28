import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class FarmingHubService {

  public hubCon!: HubConnection;

  constructor() { }

  public buildHub(api: string): void {
    this.hubCon =
      new HubConnectionBuilder().withUrl(api, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      }).configureLogging(LogLevel.Debug).build();
  }
}
