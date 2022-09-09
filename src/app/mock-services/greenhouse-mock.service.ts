import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GreenHouseAPI } from '../apis/greenhouse.api';
import { SearchRequest } from '../common/app.model';
import { GreenHouseDetailDto, GreenHouseDto, GreenHouseSearchResponse, IotsDto, PlantsDto } from '../common/greenhouse.model';

@Injectable()
export class GreenhouseMockService {

  constructor() { }
  search(data: SearchRequest): Observable<GreenHouseSearchResponse> {
    const dataresponse: GreenHouseDto[]=[
      {
        address:"jalan suramasu",
        code:"faff",
        id:1,
        name:'gh sorgum',
        photo:[]
      },
      
    ];
    const resp:GreenHouseSearchResponse={
      data:dataresponse,
      nTotal:dataresponse.length
    };
    return of(resp);
  }

  getGreenHouseById(id: number): Observable<GreenHouseDetailDto> {
    const its:IotsDto[]=[

      {
code:"yy",
connected:true,
id:90,
name:"hussen",
secret:"jgjg",
      },
      {
        code:"mm",
        connected:false,
        id:98,
        name:"manal",
        secret:"ma",
      }
    ];
    const plt:PlantsDto[]=[
{
  condition:{
    rFanMode: 9,
    rFanTime: 15,
    rLampState: 26,
    rServoTime: 30,
  rWaterPumpTime: 35,

  },
 id:38,
 latinName: "emo",
n: 40,
name: "am",
plantId: 44,
}
    ];
    const t:GreenHouseDetailDto={
address:"uuuuuuu",
code:"jj",
id:88,
iots:its,
name: "ali",
photo:[],
plants:plt,
    };  
    return of(t);
  }
}
