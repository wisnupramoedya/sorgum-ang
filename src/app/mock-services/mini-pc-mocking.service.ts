import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MiniPcServiceInterface } from '../api-services/mini-pc.service';
import { MiniPcItem2DTO } from '../common/minipc.model';

@Injectable()
export class MiniPcMockingService implements MiniPcServiceInterface{

  constructor() { }
  showMiniPcInALand(land_id: number): Observable<MiniPcItem2DTO[]> {
    const temp: MiniPcItem2DTO[]=[
      {
        Id:1,
        Description:'',
        LandId:1,
        LandName:'landname',
        Name:'minipcname',
        PlantId:1,
        PlantName:'Sorghum Beras',
        RegionId:1,
        RegionName:'Regionname',
        Status:true
      }
    ];
    return of(temp)
  }
}
