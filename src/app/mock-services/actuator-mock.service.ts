import { Injectable } from '@angular/core';
import {ActuatorServiceInterface} from "../api-services/actuator.service";
import {SearchRequest} from "../common/app.model";
import {ActuatorItemDto, ActuatorSearchResponse} from "../common/actuator.model";
import {map, Observable, of} from "rxjs";

@Injectable()
export class ActuatorMockService implements ActuatorServiceInterface {

  constructor() { }

  search(data: SearchRequest, land_id?: number): Observable<ActuatorSearchResponse> {
    const items: ActuatorItemDto[] = [
      {
        "Id": 2,
        "Name": "pompa",
        "Description": "aa",
        "TypeId": 1,
        "TypeName": "pompa air",
        "MicroId": 1,
        "MicroName": "Rasberry PI 3 +",
        "RegionId": 1,
        "RegionName": "SmartFarm ITS 1",
        "LandId": 1,
        "LandName": "ITS Smart Farm",
        "StatusActuator": false
      }
    ];

    const result: ActuatorSearchResponse = {
      Data: items,
      NTotal: items.length
    };

    return of(result).pipe(map(x => {
      x.Data = x.Data.filter(y => y.Name.includes(data.Search) || y.RegionName.includes(data.Search) || y.LandName.includes(data.Search));
      x.NTotal = x.Data.length;
      return x;
    }))
  }
}
