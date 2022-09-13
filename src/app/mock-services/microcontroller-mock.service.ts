import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MicrocontrollerServiceInterface } from '../api-services/microcontroller.service';
import { SearchRequest } from '../common/app.model';
import { MicrocontrollerRowDto, MicrocontrollerSearchResponse } from '../common/microcontroller.model';

@Injectable()
export class MicrocontrollerMockService implements MicrocontrollerServiceInterface {

  constructor() { }
  search(data: SearchRequest): Observable<MicrocontrollerSearchResponse> {
    const items: MicrocontrollerRowDto[]=[
      {
        id:1,
        land_id:1,
        land_name:'Land sorgum 1',
        region_id:1,
        region_name:'Reg 1',
        name:'Rpi 1',
        status:true
      },
      {
        id:1,
        land_id:1,
        land_name:'Land sorgum 1',
        region_id:2,
        region_name:'Reg 2',
        name:'ESP 1',
        status:true
      },
      {
        id:1,
        land_id:1,
        land_name:'Land sorgum 1',
        region_id:3,
        region_name:'Reg 3',
        name:'ESP 2',
        status:false
      },
      {
        id:1,
        land_id:1,
        land_name:'Land sorgum 1',
        region_id:3,
        region_name:'Reg 4',
        name:'ESP 3',
        status:true
      }
    ];
    const res: MicrocontrollerSearchResponse={
      data:items,
      nTotal:items.length
    }
    return of(res).pipe(map(x=>{
      x.data = x.data.filter(y=>y.name.includes(data.Search) || y.region_name.includes(data.Search) || y.land_name.includes(data.Search));
      x.nTotal = x.data.length;
      return x;
    }));
  }
}
