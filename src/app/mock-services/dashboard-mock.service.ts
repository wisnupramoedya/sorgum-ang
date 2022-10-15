import { Injectable } from '@angular/core';
import {DashboardServiceInterface} from "../api-services/dashboard.service";
import {DashboardDataDto, DashboardSensorDto} from "../common/dashboard.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardMockService implements DashboardServiceInterface {
  constructor() { }

  showDashboardOverview(land_id: number): Observable<DashboardDataDto[]> {
    const data: DashboardDataDto[] = [
      {
        "LandName": "ITS Smart Farm",
        "RegionName": "GreenHouse keputih 2",
        "MiniPcName": "Rasberry PI 4 +",
        "MikroCount": 1,
        "SensorCount": 1,
        "Status": false
      },
      {
        "LandName": "ITS Smart Farm",
        "RegionName": "GreenHouse keputih 1",
        "MiniPcName": "Rasberry PI 3 +",
        "MikroCount": 1,
        "SensorCount": 4,
        "Status": true
      }
    ];
    return of(data);
  }

  showSensorOverview(land_id: number): Observable<DashboardSensorDto[]> {
    const data: DashboardSensorDto[] = [
      {
        "SensorId": 1,
        "ParentTypeId": 5,
        "ParentTypeName": "Air Temperature",
        "Values": [
          {
            "Value": 0.5
          }
        ]
      },
      {
        "SensorId": 2,
        "ParentTypeId": 3,
        "ParentTypeName": "Air Moisture",
        "Values": [
          {
            "Value": 0.5
          }
        ]
      },
    ];
    return of(data);
  }
}
