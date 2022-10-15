import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SensorServiceInterface } from '../api-services/sensor.service';
import { SearchRequest } from '../common/app.model';
import {
  SensorSearchResponse,
  AddSensorDto,
  UpdateSensorDto,
  SensorItemDto,
  SensorType, SensorMinimalItemDto,
} from '../common/sensor.model';

@Injectable()
export class SensorMockService implements SensorServiceInterface {
  constructor() {}
  getSensorTypes(): Observable<SensorType[]> {
    const temp:SensorType[]=[
        {
          Id:1,
          Name:'ph'
        },
        {
          Id:2,
          Name:'Soilmoisture'
        },
        {
          Id:3,
          Name:'Airmoisture'
        },
        {
          Id:4,
          Name:'Soiltemperature'
        },
        {
          Id:5,
          Name:'AirTemperature'
        },
    ];
    return of(temp);
  }

  add(data: AddSensorDto): Observable<number> {
    return of(2);
  }
  update(id: number, data: UpdateSensorDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  search(
    data: SearchRequest,
    land_id?: number
  ): Observable<SensorSearchResponse> {
    const items:SensorItemDto[]=[
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:3,
        RegionName:'Reg 4',
        Name:'DHT22',
        MicroId:1,
        MicroName:'ESP 3',
        TypeId:1
      },
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:3,
        RegionName:'Reg 4',
        Name:'pH Tanah',
        MicroId:1,
        MicroName:'ESP 3',
        TypeId:1
      }
    ];
    const res: SensorSearchResponse={
      Data:items,
      NTotal:items.length
    }
    return of(res).pipe(map(x=>{
      x.Data = x.Data.filter(y=>y.Name.includes(data.Search) || y.RegionName.includes(data.Search) || y.LandName.includes(data.Search));
      x.NTotal = x.Data.length;
      return x;
    }));
  }
}
