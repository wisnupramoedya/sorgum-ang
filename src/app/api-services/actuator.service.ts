import { Injectable } from '@angular/core';
import {SearchRequest} from "../common/app.model";
import {Observable} from "rxjs";
import {ActuatorSearchResponse} from "../common/actuator.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MicrocontrollerSearchResponse} from "../common/microcontroller.model";
import {UtilityService} from "../services/utility.service";
import {ActuatorMockService} from "../mock-services/actuator-mock.service";


export interface ActuatorServiceInterface {
  search(data: SearchRequest, land_id?:number): Observable<ActuatorSearchResponse>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new ActuatorMockService();
    } else {
      return new ActuatorService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class ActuatorService implements ActuatorServiceInterface {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  search(data: SearchRequest, land_id?: number): Observable<ActuatorSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<ActuatorSearchResponse>('/api/ActuatorCrud/Search'+(land_id===undefined?'':'/'+land_id),{params: params});
  }
}
