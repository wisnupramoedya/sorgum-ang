import { Injectable } from '@angular/core';
import {MiniPcServiceInterface} from "../api-services/mini-pc.service";
import {
  AddMiniPcDto, MiniPcItem2DTO, MiniPcItemDto,
  MiniPcItemMinimalDto,
  MiniPcSearchResponse,
  MiniPcsIdentity,
  UpdateMiniPcDto
} from "../common/minipc.model";
import {map, Observable, of} from "rxjs";
import {SearchRequest} from "../common/app.model";

@Injectable()
export class MiniPcMockService implements MiniPcServiceInterface{

  constructor() { }

  add(data: AddMiniPcDto): Observable<number> {
    return of(2);
  }

  delete(id: number): Observable<void> {
    return of(void 0);
  }

  search(data: SearchRequest, land_id?: number): Observable<MiniPcSearchResponse> {
    const items: MiniPcItemDto[] = [
      {
        Id:1,
        Name:'Raspi 1',
        Description: 'faafaw 1',
        MiniPcCode: 'CODE-R1',
        MiniPcSecret: 'abcde123',
        LandId:1,
        LandName:'Land sorgum 1',
        RegionId:1,
        RegionName:'Reg 1',
        PlantId:3,
        PlantName:'Sorghum',
        Status:true,
      },
      {
        Id:2,
        Name:'Raspi 2',
        Description:'faafaw 2',
        MiniPcCode: 'CODE-R2',
        MiniPcSecret: 'abcde123',
        LandId:1,
        LandName:'Land sorgum 1',
        RegionId:2,
        RegionName:'Reg 2',
        PlantId:3,
        PlantName:'Sorghum',
        Status:true,
      },
      {
        Id:3,
        Name:'Raspi 3',
        Description:'faafaw 3',
        MiniPcCode: 'CODE-R3',
        MiniPcSecret: 'abcde123',
        LandId:1,
        LandName:'Land sorgum 1',
        RegionId:3,
        RegionName:'Reg 3',
        PlantId:3,
        PlantName:'Sorghum',
        Status:false,
      }
    ];

    const result: MiniPcSearchResponse = {
      Data: items,
      NTotal: items.length
    }

    return of(result).pipe(map(x => {
      x.Data = x.Data.filter(y => y.Name.includes(data.Search) || y.RegionName.includes(data.Search) || y.LandName.includes(data.Search));
      x.NTotal = x.Data.length;
      return x;
    }));
  }

  showMinimal(land_id: number): Observable<MiniPcItemMinimalDto[]> {
    const mt: MiniPcItemMinimalDto[] = [

      {
        Id:1,
        Name:'Raspi 1',
        Description:'faafaw 1',
        RegionId:1,
        RegionName:'Reg 1',
      },
      {
        Id:2,
        Name:'Raspi 2',
        Description:'faafaw 2',
        RegionId:2,
        RegionName:'Reg 2',
      },
      {
        Id:3,
        Name:'Raspi 3',
        Description:'faafaw 3',
        RegionId:3,
        RegionName:'Reg 3',
      }
    ]
    return of(mt);
  }

  showOverviewMiniPc(land_id: number, data: MiniPcsIdentity): Observable<MiniPcItemDto[]> {
    throw new Error("not implemented");
  }

  update(id: number, data: UpdateMiniPcDto): Observable<void> {
    throw new Error("not implemented");
  }

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
