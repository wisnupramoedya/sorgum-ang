import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DashboardDataDto, DashboardSensorDto} from "../common/dashboard.model";
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";
import {DashboardMockService} from "../mock-services/dashboard-mock.service";

export interface DashboardServiceInterface {
  showDashboardOverview(land_id: number): Observable<DashboardDataDto[]>;
  showSensorOverview(land_id: number): Observable<DashboardSensorDto[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new DashboardMockService();
    } else {
      return new DashboardService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class DashboardService implements DashboardServiceInterface {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  showDashboardOverview(land_id: number): Observable<DashboardDataDto[]> {
    return this.http.get<DashboardDataDto[]>('/api/Dashboards/OverviewMikroMini/' + land_id);
  }

  showSensorOverview(land_id: number): Observable<DashboardSensorDto[]> {
    return this.http.get<DashboardSensorDto[]>('api/Dashboards/SensorParamView/' + land_id);
  }
}
