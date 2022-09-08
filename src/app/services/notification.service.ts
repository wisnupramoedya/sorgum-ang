import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GreenHouseAPI } from '../apis/greenhouse.api';
import { UserDeviceForm } from '../common/greenhouse.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  AddSubscription(data:UserDeviceForm): Observable<any> {
    return this.http.post(GreenHouseAPI.AddUserDevice, data);
  }
}
