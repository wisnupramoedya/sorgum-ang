import { Injectable } from '@angular/core';
import {SearchRequest} from "../common/app.model";
import {Observable} from "rxjs";
import {AddDiseaseMonitor, DiseaseSearchResponse} from "../common/disease.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";
import {DiseaseMonitorMockService} from "../mock-services/disease-monitor-mock.service";

export interface DiseaseMonitorServiceInterface {
  search(data: SearchRequest, land_id?: number): Observable<DiseaseSearchResponse>;
  add(data: AddDiseaseMonitor): Observable<number>;
}

@Injectable({
  providedIn: 'root',
  deps: ['mocking', HttpClient, UtilityService],
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0]) {
      return new DiseaseMonitorMockService();
    } else {
      return new DiseaseMonitorService(h, u);
    }
  }
})
export class DiseaseMonitorService implements DiseaseMonitorServiceInterface{
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  search(data: SearchRequest, land_id?: number): Observable<DiseaseSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<DiseaseSearchResponse>('/api/MonitorVirus/Search'+(land_id===undefined?'':'/'+land_id),{params: params});
  }

  add(data: AddDiseaseMonitor): Observable<number> {
    console.log(data);
    return this.http.post<number>('/api/MonitorVirus/AddMonitorVirus', data);
  }
}
