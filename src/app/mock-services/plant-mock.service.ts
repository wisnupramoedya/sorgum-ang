import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PlantServiceInterface } from '../api-services/plant.service';
import { SearchRequest } from '../common/app.model';
import { ParameterReadPlantDto, PlantSearchResponse, ReadPlantDto } from '../common/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantMockService implements PlantServiceInterface{

  constructor() { }
  search(data: SearchRequest): Observable<PlantSearchResponse> {
    
    const temp: ReadPlantDto[]=[
      {
        Name:'Sorghum citayam',
        Code:'SCTY',
        Description:'Varietas dari AI',
        Id:1,
        Parameters:[
          {
            GroupName:'PH',
            Descriptions:[
              {
                Description:'Terlalu asam',
                Id:2,
                MaxValue:1,
                MinValue:4
              },
              {
                Description:'Optimal',
                Id:1,
                MaxValue:4,
                MinValue:9
              },
              {
                Description:'Terlalu basa',
                Id:3,
                MaxValue:14,
                MinValue:9
              }
            ]
          }
        ]
      }
    ];
    return of({
      data: temp,
      nTotal: temp.length
    }).pipe(map(x=>{
      x.data = x.data.filter(y=>y.Name.includes(data.Search) || y.Code.includes(data.Search));
      x.nTotal = x.data.length;
      return x;
    }));
  }
}
