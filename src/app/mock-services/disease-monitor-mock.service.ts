import { Injectable } from '@angular/core';
import {DiseaseMonitorServiceInterface} from "../api-services/disease-monitor.service";
import {SearchRequest} from "../common/app.model";
import {map, Observable, of} from "rxjs";
import {AddDiseaseMonitor, DiseaseItemMinimalDto, DiseaseSearchResponse} from "../common/disease.model";

@Injectable({
  providedIn: 'root'
})
export class DiseaseMonitorMockService implements DiseaseMonitorServiceInterface {
  constructor() { }

  search(data: SearchRequest, land_id?: number): Observable<DiseaseSearchResponse> {
    const items: DiseaseItemMinimalDto[] = [
      {
        Id: 1,
        Name: "Antraknose",
        RegionName: "GreenHouse keputih 2",
        Condition: "Perawatan",
        MonitorDate: "2022-11-02T11:42:54.706075"
      },
      {
        Id: 2,
        Name: "Antraknose",
        RegionName: "GreenHouse keputih 1",
        Condition: "Terpantau",
        MonitorDate: "2022-11-02T12:30:23.128092"
      },
      {
        Id: 3,
        Name: "Antraknose",
        RegionName: "GreenHouse keputih 1",
        Condition: "Terpantau",
        MonitorDate: "2022-11-02T12:31:45.057487"
      },
    ];

    const result: DiseaseSearchResponse = {
      Data: items,
      NTotal: items.length
    }

    return of(result).pipe(map(x => {
      x.Data = x.Data.filter(y => y.Name.toLowerCase().includes(data.Search.toLowerCase())
        || y.RegionName.toLowerCase().includes(data.Search.toLowerCase())
        || y.Condition.toLowerCase().includes(data.Search.toLowerCase()));
      x.NTotal = x.Data.length;
      return x;
    }));
  }

  add(data: AddDiseaseMonitor): Observable<number> {
    return of(1)
  }
}
