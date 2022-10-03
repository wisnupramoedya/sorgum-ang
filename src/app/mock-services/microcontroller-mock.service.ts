import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MicrocontrollerServiceInterface } from '../api-services/microcontroller.service';
import { SearchRequest } from '../common/app.model';
import { MicroItemDto, MicrocontrollerSearchResponse, AddMicroDto, MicroItemMinimalDto, UpdateMicroDto, MicrosIdenity } from '../common/microcontroller.model';

@Injectable()
export class MicrocontrollerMockService implements MicrocontrollerServiceInterface {

  constructor() { }
  showOverviewMicro(land_id: number, data: MicrosIdenity): Observable<MicroItemDto[]> {
    const items: MicroItemDto[]=[
      {
        Id:1,
        Name:'Rpi 1',
        Description:'faafaw',
        Status:true,
        LandId:1,
        LandName:'Land sorgum 1',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
        RegionId:1,
        RegionName:'Reg 1',
        PlantId:3,
        PlantName:'Sorghum'
      },
      {
        Id:1,
        Name:'ESP 1',
        Description:'faafaw',
        Status:true,
        LandId:1,
        LandName:'Land sorgum 1',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
        RegionId:2,
        RegionName:'Reg 2',
        PlantId:3,
        PlantName:'Sorghum',
      },
      {
        Id:1,
        Name:'ESP 2',
        Description:'faafaw',
        Status:false,
        MiniPcId:1,
        MiniPcName:'Raspi 1',
        RegionId:3,
        RegionName:'Reg 3',
        LandId:1,
        LandName:'Land sorgum 1',
        PlantId:3,
        PlantName:'Sorghum',
      }
    ];
    return of(items);
  }
  add(data: AddMicroDto): Observable<number> {
    return of(2);
  }
  update(id: number, data: UpdateMicroDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  showMinimal(land_id: number): Observable<MicroItemMinimalDto[]> {
    const dt:MicroItemMinimalDto[]=[
      {
        Id:1,
        Name:'Rpi 1',
        Description:'faafaw',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
      },
      {
        Id:2,
        Name:'ESP 1',
        Description:'faafaw',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
      },
      {
        Id:3,
        Name:'ESP 2',
        Description:'faafaw',
        MiniPcId:1,
        MiniPcName:'Raspi 1',
      },
    ];
    return of(dt);
  }
  search(data: SearchRequest, land_id?:number): Observable<MicrocontrollerSearchResponse> {
    const items: MicroItemDto[]=[
      {
        Id:1,
        Name:'Rpi 1',
        Description:'faafaw',
        Status:true,
        LandId:1,
        LandName:'Land sorgum 1',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
        RegionId:1,
        RegionName:'Reg 1',
        PlantId:3,
        PlantName:'Sorghum'
      },
      {
        Id:2,
        Name:'ESP 1',
        Description:'faafaw',
        Status:true,
        LandId:1,
        LandName:'Land sorgum 1',
        MiniPcId:2,
        MiniPcName:'Raspi 2',
        RegionId:2,
        RegionName:'Reg 2',
        PlantId:3,
        PlantName:'Sorghum',
      },
      {
        Id:3,
        Name:'ESP 2',
        Description:'faafaw',
        Status:false,
        MiniPcId:1,
        MiniPcName:'Raspi 1',
        RegionId:3,
        RegionName:'Reg 3',
        LandId:1,
        LandName:'Land sorgum 1',
        PlantId:3,
        PlantName:'Sorghum',
      }
    ];
    const res: MicrocontrollerSearchResponse={
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
